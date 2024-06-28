import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/types";
import { StatusBar } from "expo-status-bar";

type ItemDetailRouteProp = RouteProp<RootStackParamList, "Channel">;

const ChannelPage = () => {
  const route = useRoute<ItemDetailRouteProp>();
  const { slug } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>channel slug: {slug}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});

export default ChannelPage;
