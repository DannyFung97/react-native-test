import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItemDetailScreen from "../components/ItemDetailScreen";
import ItemListScreen from "../components/ItemListScreen";

const Stack = createStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6200EE",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "LoRes15",
        },
      }}
    >
      <Stack.Screen name="ItemList" component={ItemListScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
    </Stack.Navigator>
  );
};

export default Index;
