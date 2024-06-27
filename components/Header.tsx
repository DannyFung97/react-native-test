import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types";

const Header = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("ItemListScreen")}>
        <Text style={styles.headerTitle}>ItemListScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Tab1")}>
        <Text style={styles.headerTitle}>Tab 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("TabStack")}>
        <Text style={styles.headerTitle}>Stack Example</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://www.example.com")}
      >
        <Text style={styles.headerTitle}>External Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#6200EE",
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Header;
