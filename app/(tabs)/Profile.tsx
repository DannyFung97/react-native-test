import ProfileConnect from "@/components/ProfileConnect";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  // return <ProfileConnect />;
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>User</Text>
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

export default Profile;
