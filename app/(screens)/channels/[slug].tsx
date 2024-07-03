import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "@/types";
import { StatusBar } from "expo-status-bar";
import { useChannel } from "@/api/queries/useChannel";
import { useLivepeerStreamData } from "@/hooks/useLivepeerStreamData";
import { Player } from "@/components/player/Player";

type ItemDetailRouteProp = RouteProp<RootStackParamList, "Channel">;

const ChannelPage = () => {
  const route = useRoute<ItemDetailRouteProp>();
  const { slug } = route.params;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    data,
    error,
    isLoading: isDataLoading,
  } = useChannel({
    slug,
  });

  const channelData = data?.getChannelBySlug;

  const { playbackInfo, checkedForLivepeerPlaybackInfo } =
    useLivepeerStreamData({ channelData });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>
        {isDataLoading ? "loading" : data?.getChannelBySlug.owner.address}
      </Text>
      {checkedForLivepeerPlaybackInfo && (
        <Player
          playbackData={
            playbackInfo
              ? {
                  infra: "livepeer",
                  livepeerPlaybackInfo: playbackInfo,
                }
              : { infra: "aws", awsPlaybackUrl: channelData?.playbackUrl }
          }
        />
      )}
      <Button
        title="Back to First Screen"
        onPress={() => navigation.goBack()}
      />
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

export default ChannelPage;
