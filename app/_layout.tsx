import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import TabBar from "../components/TabBar";
import Header from "@/components/Header";
import { queryClient } from "../api/client";
import { QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    LoRes15: require("../assets/fonts/LoRes15OT-Bold.ttf"),
    NeuePixelSans: require("../assets/fonts/NeuePixelSans.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <Tabs tabBar={(props) => <TabBar {...props} />}>
          <Tabs.Screen
            name="index"
            options={{
              tabBarLabel: "Channels",
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="(tabs)/Tab1"
            options={{
              tabBarLabel: "NFCs",
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="(tabs)/Profile"
            options={{
              tabBarLabel: "Profile",
              headerShown: false,
            }}
          />
        </Tabs>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
