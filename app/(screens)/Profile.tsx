import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useLoginWithSiwe, usePrivy } from "@privy-io/expo";
import { useLoginWithEmail } from "@privy-io/expo";
import { AnimatedPressable } from "@/components/buttons/animatedPressable";

const Profile = () => {
  // return <ProfileConnect />;
  const { user: privyUser } = usePrivy();

  const { generateSiweMessage, loginWithSiwe } = useLoginWithSiwe();
  const { state, sendCode, loginWithCode } = useLoginWithEmail({
    onSendCodeSuccess({ email }) {
      console.log("sent code to", email);
    },
    onLoginSuccess(user, isNewUser) {
      console.log("logged in", user, isNewUser);
    },
    onError(err) {
      console.log("error", err);
    },
  });

  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState<boolean | undefined>(undefined);
  const [code, setCode] = useState("");
  const [user, setUser] = useState<any | null>(null);

  console.log(privyUser, user, state.status);

  const handleLoginWithSiwe = async () => {
    await loginWithCode({ code, email })
      .then((res) => {
        console.log("loginWithCode", res);
        setUser(res);
      })
      .catch((err) => console.log(err));
  };

  const linkedAccountsLastVerifiedSortedDescendingOrder =
    privyUser?.linked_accounts.sort(
      (a, b) => (b.latest_verified_at ?? 0) - (a.latest_verified_at ?? 0)
    );

  const currentWallet = linkedAccountsLastVerifiedSortedDescendingOrder?.find(
    (a) => a.type === "wallet"
  );

  console.log(
    "linkedAccountsLastVerifiedSortedDescendingOrder",
    linkedAccountsLastVerifiedSortedDescendingOrder
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Login</Text>
      <Image
        source={{
          uri: "https://assets.airstack.xyz/image/social/IWFUA7zJAN+GBdMrFTBuZczKa6TduYxeHvr3Y3ZASApy6TYvDQLUfYsMpFbLfkXN/small.jpg",
        }}
        onError={(error) => console.log("Error loading image:", error)}
        onLoad={() => console.log("Image loaded successfully")}
      />
      {privyUser || user ? (
        <Text>
          logged in! {currentWallet?.type === "wallet" && currentWallet.address}
        </Text>
      ) : !codeSent ? (
        <>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            inputMode="email"
          />
          <AnimatedPressable
            onPress={() =>
              sendCode({ email }).then((res) => setCodeSent(res.success))
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>send code</Text>
          </AnimatedPressable>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="Code"
            inputMode="numeric"
          />
          <AnimatedPressable
            onPress={handleLoginWithSiwe}
            style={styles.button}
          >
            <Text style={styles.buttonText}>login</Text>
          </AnimatedPressable>
          <Button title="send again" onPress={() => setCodeSent(undefined)} />
        </>
      )}
      {user && <Text>logged in! {user.address}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 20,
  },
  title: {
    fontSize: 24,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "#fff",
    // Add shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Add elevation for Android
    elevation: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    // Add shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // Add elevation for Android
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Profile;
