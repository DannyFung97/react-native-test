import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Linking,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "@/types";
import { StatusBar } from "expo-status-bar";
import { useChannel } from "@/api/queries/useChannel";
import { useLivepeerStreamData } from "@/hooks/useLivepeerStreamData";
import { Player } from "@/components/player/Player";
import WebView from "react-native-webview";
import { InboundMessage, Realtime } from "ably";
import { Message, SenderStatus } from "@/constants/types";
import { CHAT_MESSAGE_EVENT } from "@/constants";
import { getColorFromString } from "@/utils/colors";
import { ThemedText } from "@/components/ThemedText";
import centerEllipses from "@/utils/centerEllipses";

const ITEM_HEIGHT = 100; // Example fixed height for items

export type Role = {
  address: string;
  role: number;
};

const userAddress = "0x855CeD56EFc089Ba560c5E833A6f4A9E3ed4DA1F";

type ItemDetailRouteProp = RouteProp<RootStackParamList, "Channel">;

const ably = new Realtime(String(process.env.EXPO_PUBLIC_ABLY_API_KEY));

const CHAT_WEBVIEW_URL = "https://www.unlonely.app/mobile/chat";

const { height: screenHeight } = Dimensions.get("window");

const ChannelPage = () => {
  const route = useRoute<ItemDetailRouteProp>();
  const { slug } = route.params;

  const channel = ably.channels.get(`persistMessages:${slug}-chat-channel`);

  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [hasMessagesLoaded, setHasMessagesLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [localBanList, setLocalBanList] = useState<string[] | undefined>(
    undefined
  );
  const [isAtBottom, setIsAtBottom] = useState(false);

  const [message, setMessage] = useState("");

  const callbackOnMessage = (message: InboundMessage) => {
    console.log("message", message);
    setHasMessagesLoaded(false);

    if (localBanList === undefined) {
      setHasMessagesLoaded(true);
      return;
    }

    const adjustedMessage = message as Message;
    setAllMessages((prevAllMessages) => [...prevAllMessages, adjustedMessage]);

    if (message.name === CHAT_MESSAGE_EVENT) {
      setReceivedMessages((prevReceivedMessages) => {
        const messageHistory = prevReceivedMessages.filter(
          (m) => m.name === CHAT_MESSAGE_EVENT
        );
        console.log(
          "current",
          messageHistory.map((m) => m.data.messageText),
          adjustedMessage.data.messageText,
          adjustedMessage.name
        );

        if (localBanList.length === 0) {
          console.log("no bans");
          return [...prevReceivedMessages, adjustedMessage];
        } else {
          if (userAddress && localBanList.includes(userAddress)) {
            console.log("banned");
            // Current user is banned, they see all messages
            return [...prevReceivedMessages, adjustedMessage];
          } else {
            // Current user is not banned, they only see messages from non-banned users
            if (!localBanList.includes(message.data.address)) {
              console.log("not banned");
              return [...prevReceivedMessages, adjustedMessage];
            }
          }
        }
        return prevReceivedMessages;
      });
    }

    setHasMessagesLoaded(true);
  };

  useEffect(() => {
    channel.subscribe((message) => callbackOnMessage(message));

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const sendMessage = () => {
    channel.publish({
      name: CHAT_MESSAGE_EVENT,
      data: {
        messageText: message,
        username: "2333",
        chatColor: getColorFromString("2333"),
        isFC: false,
        isLens: false,
        lensHandle: "",
        address: "00",
        channelUserRank: 0,
        isGif: false,
        senderStatus: SenderStatus.USER,
        body: undefined,
      },
    });
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    data,
    error,
    isLoading: isDataLoading,
  } = useChannel({
    slug,
  });
  const [channelRoles, setChannelRoles] = useState<Role[]>([]);

  const channelData = data?.getChannelBySlug;

  useEffect(() => {
    if (channelData?.roles) {
      const filteredArray = channelData?.roles.filter(
        (
          role
        ): role is {
          id: number;
          userAddress: string;
          role: number;
        } => role !== null
      );
      setChannelRoles(
        filteredArray.map((r) => {
          return {
            address: r.userAddress,
            role: r.role,
          };
        })
      );
    }
  }, [channelData?.roles]);

  useEffect(() => {
    if (!channelRoles) {
      setLocalBanList(undefined);
      return;
    }
    const filteredUsersToBan = (channelRoles ?? [])
      .filter((user) => user?.role === 1)
      .map((user) => user?.address) as string[];
    setLocalBanList(filteredUsersToBan);
  }, [channelRoles]);

  useEffect(() => {
    async function getMessages() {
      if (!channel || localBanList === undefined) return;
      const hist = await channel.history();
      const messageHistory = hist.items.filter((message: any) => {
        if (message.name !== CHAT_MESSAGE_EVENT) return false;
        const senderIsBanned = localBanList.includes(message.data.address);
        // For non-banned users or users without a userAddress
        if (!userAddress || !localBanList.includes(userAddress)) {
          return !senderIsBanned;
        }
        // For banned users
        return true; // See all messages
      });
      const reverse = [...messageHistory].reverse();
      setReceivedMessages(reverse as Message[]);
      setMounted(true);
    }
    getMessages();
  }, [channel, localBanList, userAddress]);

  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity style={styles.item}>
      <View>
        <ThemedText>{item.data.messageText}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  const flatListRef = useRef<FlatList<Message>>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // Adding some tolerance

    setIsAtBottom(isScrolledToBottom);
  };

  useEffect(() => {
    if (receivedMessages.length > 0 && isAtBottom && mounted) {
      flatListRef.current?.scrollToIndex({
        index: receivedMessages.length - 1,
        animated: true,
      });
    }
  }, [isAtBottom, receivedMessages]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Back to First Screen"
          onPress={() => navigation.goBack()}
        />
      </View>
      <FlatList
        ref={flatListRef}
        style={styles.chatContainer}
        data={receivedMessages}
        keyExtractor={(item) => item.id}
        getItemLayout={(data: any, index: number) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={20} // Adjust based on the expected screen size
        maxToRenderPerBatch={10} // Adjust based on performance
        windowSize={5} // Adjust based on performance
        renderItem={renderItem}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Adjust the frequency of scroll events
        contentContainerStyle={{ paddingBottom: 20 }} // Add some padding to the bottom
      />
      {/* <View style={{ flexDirection: "row", display: "flex" }}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "80%",
          }}
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <Button onPress={sendMessage} title="Send" />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  videoContainer: {
    height: screenHeight / 3, // Set container height to half the screen height
  },
  chatContainer: {
    height: (screenHeight * 2) / 3, // Set container height to half the screen height
  },
  webview: {},
});

export default ChannelPage;
