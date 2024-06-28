// import { useLoginWithSiwe } from "@privy-io/expo";
// import { usePrivy } from "@privy-io/react-auth";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileConnect = () => {
  // const { user } = usePrivy();
  // const { state, generateSiweMessage, loginWithSiwe } = useLoginWithSiwe();

  // return (
  //   <View style={styles.container}>
  //     <StatusBar style="dark" />
  //     <Text style={styles.title}>
  //       User: {`${user}`}, {`${state}`}
  //     </Text>
  //   </View>
  // );
  return <></>;
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

export default ProfileConnect;
