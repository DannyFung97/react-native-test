import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Linking,
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

type ItemDetailRouteProp = RouteProp<RootStackParamList, "Channel">;

const CHAT_WEBVIEW_URL = "https://www.unlonely.app/mobile/chat";

const { height: screenHeight } = Dimensions.get("window");

const ChannelPage = () => {
  const route = useRoute<ItemDetailRouteProp>();
  const { slug } = route.params;

  const webViewRef = useRef<WebView>(null);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(false);
  const [chatKey, setChatKey] = useState(0);

  const openExternalLink = (url: string): void => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
    });
  };

  const catchWebViewNavigationStateChange = (newNavState: any) => {
    const { url } = newNavState;

    if (!url.includes(CHAT_WEBVIEW_URL)) {
      webViewRef?.current?.stopLoading();
      openExternalLink(url);
      setChatEnabled(true);
      setFinishedLoading(true);
      webViewRef?.current?.reload();
    }
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    data,
    error,
    isLoading: isDataLoading,
  } = useChannel({
    slug,
  });

  const channelData = data?.getChannelBySlug;

  const { playbackInfo, checkedForLivepeerPlaybackInfo } =
    useLivepeerStreamData({ channelData });

  const htmlContent = `
    <iframe
      width="100%"
      height="50%"
      src=${`https://lvpr.tv?v=${channelData?.livepeerPlaybackId}`}
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    />
  `;

  return (
    <View style={styles.container}>
      {/* <StatusBar style="light" /> */}
      {/* <Text style={styles.title}>
        {isDataLoading ? "loading" : data?.getChannelBySlug.owner.address}
      </Text>
      {checkedForLivepeerPlaybackInfo && channelData && (
        <Player playbackData={channelData} />
      )} */}
      {/* {channelData && (
        <View style={styles.webviewContainer}>
          <WebView
            source={{ html: htmlContent }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            style={styles.webview}
            useWebKit={true}
          />
        </View>
      )} */}
      <View style={styles.videoContainer}>
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          source={{
            uri: `https://lvpr.tv?v=${channelData?.livepeerPlaybackId}`,
          }}
        />
      </View>

      <View style={styles.chatContainer}>
        <Button
          title="Back to First Screen"
          onPress={() => navigation.goBack()}
        />
        <WebView
          // key={chatKey}
          source={{
            uri: `https://unlonely.app/mobile/chat/${slug}`,
            // html: "<h1>hi</h1>",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
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
