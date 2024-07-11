import { Pressable, StyleSheet, Text, Image } from "react-native";
import { RouteName } from "./TabBar";
import { icons } from "@/constants/icons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/expo";
import { useUser } from "@/api/queries/useUser";

import { Avatar } from "@rneui/themed";
import { getColorFromString } from "@/utils/colors";

const TabBarButton = ({ route, focused, label, onPress, onLongPress }: any) => {
  const { user: privyUser } = usePrivy();

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

  const {
    data: user,
    error,
    isLoading: isDataLoading,
  } = useUser({
    data: {
      address:
        privyUser?.linked_accounts.find((a) => a.type === "wallet")?.address ??
        "",
    },
  });

  const imageUrl = user?.getUser?.FCImageUrl
    ? user?.getUser?.FCImageUrl
    : user?.getUser?.lensImageUrl
    ? user?.getUser?.lensImageUrl
    : "";
  // if imageUrl begins with  ipfs://, convert to https://ipfs.io/ipfs/
  const ipfsUrl = imageUrl.startsWith("ipfs://")
    ? `https://ipfs.io/ipfs/${imageUrl.slice(7)}`
    : imageUrl;

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
        {route.name === "(screens)/Profile" && user ? (
          <>
            {ipfsUrl ? (
              <Image
                source={{
                  uri: ipfsUrl,
                }}
                style={styles.avatar}
                onError={(error) => console.log("Error loading image:", error)}
                onLoad={() => console.log("Image loaded successfully")}
              />
            ) : (
              <Avatar
                size={30}
                rounded
                icon={{ name: "user", type: "font-awesome" }}
                containerStyle={{
                  backgroundColor: getColorFromString(
                    user.getUser?.address ?? ""
                  ),
                }}
              />
            )}
          </>
        ) : (
          icons[route.name as RouteName]({
            color: focused ? "#673ab7" : "#222",
          })
        )}
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
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default TabBarButton;
