import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useLoginWithSiwe } from "@privy-io/expo";
import { useLoginWithEmail } from "@privy-io/expo";

const Profile = () => {
  // return <ProfileConnect />;

  const { generateSiweMessage, loginWithSiwe } = useLoginWithSiwe();
  const { sendCode, loginWithCode } = useLoginWithEmail();

  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState<boolean | undefined>(undefined);
  const [code, setCode] = useState("");
  const [user, setUser] = useState<any | null>(null);

  console.log(user);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text>Login</Text>

      {!codeSent ? (
        <>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            inputMode="email"
          />

          <Button
            title="send code"
            onPress={() =>
              sendCode({ email }).then((res) => setCodeSent(res.success))
            }
          />
        </>
      ) : (
        <>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Code"
            inputMode="numeric"
          />
          <Button
            title="login"
            onPress={() =>
              loginWithCode({ code: code, email }).then(
                (res) => res && setUser(res)
              )
            }
          />
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
  },
  title: {
    fontSize: 24,
  },
});

export default Profile;
