import { PlaybackInfo } from "livepeer/models/components";
import { Dimensions, StyleSheet, Text, View } from "react-native";
// import { getSrc } from "@livepeer/react/external";
import LivepeerPlayer from "./LivepeerPlayer";
import { StreamPlayer as IVSPlayer } from "./IVSPlayer";
import { ChannelData } from "@/api/queries/useChannel";
import WebView from "react-native-webview";
// import * as external from "@livepeer/react/external";

const { height: screenHeight } = Dimensions.get("window");

export const Player = ({ playbackData }: { playbackData: ChannelData }) => {
  return (
    <View style={styles.container}>
      {/* {playbackData.infra === "livepeer" ? (
        <LivepeerPlayer
          src={external.getSrc(playbackData.livepeerPlaybackInfo)}
        />
      ) : (
        <IVSPlayer
          awsId={playbackData.channelData.playbackUrl}
          name={playbackData.channelData.name}
          thumbnailUrl={playbackData.channelData.thumbnailUrl}
        />
      )} */}
      <WebView
        source={{
          uri: `https://lvpr.tv?v=${playbackData.livepeerPlaybackId}`,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "25%",
  },
  webview: {
    width: "100%", // Take full width of the container
    height: screenHeight / 2, // Set height to half of the screen height
  },
});
