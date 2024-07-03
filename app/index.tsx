import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChannelList from "../components/ChannelList";
import { NavigationContainer } from "@react-navigation/native";
import ChannelPage from "./(screens)/channels/[slug]";

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
      <Stack.Screen name="Channels" component={ChannelList} />
      <Stack.Screen
        name="Channel"
        component={ChannelPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Index;
