import "fast-text-encoding";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import "@ethersproject/shims";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigationState,
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

import { PrivyProvider } from "@privy-io/expo";

// Add global polyfills
// if (typeof global.crypto !== "object") {
//   global.crypto = require("crypto-browserify");
// }

// if (typeof global.process === "undefined") {
//   global.process = require("process");
// }

// if (typeof global.Buffer === "undefined") {
//   global.Buffer = require("buffer").Buffer;
// }

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
    <PrivyProvider appId={"clkkatl6r004zmc08p6qmtpol"}>
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
              name="(screens)/Tab1"
              options={{
                tabBarLabel: "NFCs",
                headerShown: false,
              }}
            />
            <Tabs.Screen
              name="(screens)/Profile"
              options={{
                tabBarLabel: "Profile",
                headerShown: false,
              }}
            />
          </Tabs>
        </QueryClientProvider>
      </ThemeProvider>
    </PrivyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
