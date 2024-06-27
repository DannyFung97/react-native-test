// app/tabs/ItemListScreen.tsx
import React, { useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types";
import { StatusBar } from "expo-status-bar";

const DATA = Array.from({ length: 100 }, (v, i) => ({
  id: `${i}`,
  title: `Item ${i}`,
}));

const ItemListScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleItemClick = (item: any) => {
    navigation.navigate("ItemDetail", { slug: item.id as string });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemClick(item)}>
      <Text style={styles.title}>{item.title}</Text>
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
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
        initialNumToRender={20} // Adjust based on the expected screen size
        maxToRenderPerBatch={10} // Adjust based on performance
        windowSize={5} // Adjust based on performance
      />
    </SafeAreaView>
  );
};

const ITEM_HEIGHT = 100; // Example fixed height for items

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
  title: {
    fontSize: 18,
  },
});

export default ItemListScreen;
