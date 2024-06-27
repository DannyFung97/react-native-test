import { Pressable, StyleSheet, Text } from "react-native";
import { RouteName } from "./TabBar";
import { icons } from "@/constants/icons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";

const TabBarButton = ({ route, focused, label, onPress, onLongPress }: any) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(focused ? 1 : 0, { duration: 200 });
  }, [scale, focused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [0.8, 1.2]);

    const topValue = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      transform: [{ scale: scaleValue }],
      top: topValue,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  return (
    <Pressable
      key={route.name}
      style={styles.tabbarItem}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Animated.View style={[animatedIconStyle]}>
        {icons[route.name as RouteName]({
          color: focused ? "#673ab7" : "#222",
        })}
      </Animated.View>
      <Animated.Text
        style={[{ color: focused ? "#673ab7" : "#222" }, animatedTextStyle]}
      >
        {label as string}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabBarButton;
