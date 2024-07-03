import { View, StyleSheet } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";

export type RouteName = "index" | "(screens)/Tab1" | "(screens)/Profile";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  // Define routes where the tab bar should be hidden
  const hideTabBarRoutes = ["Channel"];
  // Get the current route and nested route if it exists
  const currentRoute = state.routes[state.index];
  const nestedState = currentRoute.state;
  const nestedRoute =
    nestedState && nestedState.routes && nestedState.index !== undefined
      ? nestedState.routes[nestedState.index]
      : null;

  // Check if the nested route name should hide the tab bar
  const shouldHideTabBar = nestedRoute
    ? hideTabBarRoutes.includes(nestedRoute.name)
    : hideTabBarRoutes.includes(currentRoute.name);
  return (
    <View
      style={[styles.tabbar, shouldHideTabBar ? { display: "none" } : null]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (
          [
            "_sitemap",
            "+not-found",
            "(screens)/channels/index",
            "(screens)/channels/[slug]",
          ].includes(route.name)
        )
          return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            route={route}
            focused={isFocused}
            label={label}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
