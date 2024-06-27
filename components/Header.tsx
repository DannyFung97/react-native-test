import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Button,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity
        style={styles.headerItem}
        onPress={() => navigation.navigate("ItemListScreen")}
      >
        <FontAwesome name="user" size={26} color={"black"} />
        <Button
          title="Sign in"
          onPress={() => navigation.navigate("ItemListScreen")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6200EE",
    paddingHorizontal: 20,
  },
  headerItem: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 6,
    borderRadius: 50,
    margin: "auto",
    marginLeft: 0,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Header;
