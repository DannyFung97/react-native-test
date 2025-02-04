import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { StyleSheet, Text, View } from "react-native";
import { fadeInScale } from "../../../utils/animations";
import { AnimatedPressable } from "../../buttons/animatedPressable";
import { MaterialIcons } from "@expo/vector-icons";

export function StreamPlaybackOverlay({
  play,
  pause,
  playing,
  latency,
  togglePip,
}: {
  play: () => void;
  pause: () => void;
  playing: boolean;
  latency: number;
  togglePip: () => void;
}) {
  const latencySeconds = latency / 1000;
  const formattedLatency = latencySeconds.toFixed(1);
  return (
    <>
      <MotiView style={styles.center} {...fadeInScale}>
        {!playing && (
          <AnimatedPressable onPress={play}>
            <Ionicons name="play" size={64} color="white" />
          </AnimatedPressable>
        )}
        {playing && (
          <AnimatedPressable onPress={pause}>
            <Ionicons name="pause" size={64} color="white" />
          </AnimatedPressable>
        )}
      </MotiView>
      {playing && (
        <View style={styles.latencyView} pointerEvents="none">
          <Text style={styles.videoOverlayText}>
            stream delay: {formattedLatency}s
          </Text>
        </View>
      )}
      {!playing && (
        <View style={styles.latencyView} pointerEvents="none">
          <Text style={styles.videoOverlayLiveText}>LIVE NOW</Text>
        </View>
      )}
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <AnimatedPressable
          onPress={togglePip}
          style={{
            top: -1,
            padding: 24,
          }}
        >
          <MaterialIcons
            name="picture-in-picture-alt"
            size={24}
            color="white"
          />
        </AnimatedPressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  videoOverlayText: {
    color: "#999",
    fontSize: 14,
    letterSpacing: 0.5,
    fontFamily: "NeuePixelSans",
    paddingTop: 12,
    position: "absolute",
    bottom: 40,
  },
  videoOverlayLiveText: {
    color: "#e6f88a",
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: "NeuePixelSans",
    paddingTop: 12,
    position: "absolute",
    bottom: 40,
  },
  latencyView: {
    position: "absolute",
    backgroundColor: "red",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
});
