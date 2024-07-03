import { PlaybackInfo } from "livepeer/models/components";
import { StyleSheet, Text, View } from "react-native";
import { getSrc } from "@livepeer/react/external";
import LivepeerPlayer from "./LivepeerPlayer";
import { IVSPlayerComponent } from "./IVSPlayer";

export const Player = ({
  playbackData,
}: {
  playbackData:
    | {
        infra: "aws";
        awsPlaybackUrl?: string;
      }
    | {
        infra: "livepeer";
        livepeerPlaybackInfo: PlaybackInfo;
      };
}) => {
  return (
    <View style={style.container}>
      {playbackData.infra === "livepeer" ? (
        <LivepeerPlayer src={getSrc(playbackData.livepeerPlaybackInfo)} />
      ) : playbackData.awsPlaybackUrl ? (
        <IVSPlayerComponent awsPlaybackUrl={playbackData.awsPlaybackUrl} />
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: "25%",
  },
});
