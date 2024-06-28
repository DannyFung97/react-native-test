import { useNfcFeed } from "@/api/queries/useNfcFeed";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Tab1 = () => {
  const { data, isLoading, isError } = useNfcFeed({
    data: {
      limit: 35,
      orderBy: "createdAt",
    },
  });

  console.log("nfc feed data", data);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Tab 1 Content</Text>
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

export default Tab1;
