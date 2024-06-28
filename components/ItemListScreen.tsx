// app/tabs/ItemListScreen.tsx
import React, { useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "./ThemedText";
import { useChannels } from "@/api/queries/useChannels";
import centerEllipses from "@/utils/centerEllipses";

const unlonelyAvatar = "../assets/images/unlonely-icon-192x192.png";

const ItemListScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { data, isLoading, isError } = useChannels({
    data: {},
  });

  const handleItemClick = (item: any) => {
    navigation.navigate("Channel", { slug: item.id as string });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemClick(item)}>
      <View style={styles.row}>
        <Image
          style={styles.avatar}
          source={
            item.owner.FCImageUrl
              ? { uri: item.owner.FCImageUrl }
              : require(unlonelyAvatar)
          }
        />
        <View style={styles.col}>
          <ThemedText style={{ ...styles.title, fontFamily: "LoRes15" }}>
            {item.name}
          </ThemedText>
          <Text>
            {item.owner.username ?? centerEllipses(item.owner.address, 15)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {data?.getChannelFeed && data?.getChannelFeed?.length > 0 && (
        <FlatList
          data={data.getChannelFeed}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          getItemLayout={getItemLayout}
          initialNumToRender={20} // Adjust based on the expected screen size
          maxToRenderPerBatch={10} // Adjust based on performance
          windowSize={5} // Adjust based on performance
        />
      )}
    </SafeAreaView>
  );
};

const ITEM_HEIGHT = 100; // Example fixed height for items

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  col: {
    flexDirection: "column",
    gap: 10,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
  },
});

export default ItemListScreen;
