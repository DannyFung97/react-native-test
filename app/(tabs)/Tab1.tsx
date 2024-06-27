// app/tabs/Tab1.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Tab1 = () => {
  return (
    <View style={styles.container}>
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
