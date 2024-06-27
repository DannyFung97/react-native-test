import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Tab2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab 2 Content</Text>
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

export default Tab2;
