import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { fadeInScale } from "../../../utils/animations";
import { AnimatedPressable } from "../../buttons/animatedPressable";

const bottomSheetOptions = {
  index: -1,
  enablePanDownToClose: true,
  backgroundStyle: {
    backgroundColor: "#111",
  },
  handleStyle: {
    backgroundColor: "transparent",
  },
  handleIndicatorStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  style: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
};

export function StreamErrorOverlay() {
  return (
    <>
      <MotiView style={styles.center} {...fadeInScale}>
        <MaterialCommunityIcons name="sleep" size={48} color="#999" />
        <Text style={styles.videoOverlayText}>stream is offline</Text>
      </MotiView>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  videoOverlayText: {
    color: "white",
    fontSize: 18,
    fontFamily: "NeuePixelSans",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingTop: 12,
  },
  bottomSheetBackground: {
    backgroundColor: "#111",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  errorText: {
    color: "white",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "NeuePixelSans",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  buttonPrimary: {
    backgroundColor: "#be47d1",
  },
});
