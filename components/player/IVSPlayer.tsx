import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import IVSPlayer, {
  IVSPlayerRef,
  PlayerState,
} from "amazon-ivs-react-native-player";
import { useEffect, useRef, useState } from "react";
import { useVideoPlayerStore } from "../../store/videoPlayerStore";
import { useLiveSettingsStore } from "../../store/liveSettingsStore";

export function IVSPlayerComponent({
  awsPlaybackUrl,
}: {
  awsPlaybackUrl: string;
}) {
  const { width } = useWindowDimensions();
  const {
    isLiveStreamPlaying,
    stopNFCPlaying,
    startLiveStreamPlaying,
    stopLiveStreamPlaying,
  } = useVideoPlayerStore((z) => ({
    isLiveStreamPlaying: z.isLiveStreamPlaying,
    stopNFCPlaying: z.stopNFCPlaying,
    startLiveStreamPlaying: z.startLiveStreamPlaying,
    stopLiveStreamPlaying: z.stopLiveStreamPlaying,
  }));
  const { streamPlayerKey, updateStreamPlayerKey, isAudioOnly } =
    useLiveSettingsStore((z) => ({
      streamPlayerKey: z.streamPlayerKey,
      updateStreamPlayerKey: z.updateStreamPlayerKey,
      isAudioOnly: z.isAudioOnly,
    }));
  const mediaPlayerRef = useRef<IVSPlayerRef>(null);
  const [latency, setLatency] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [overlay, setOverlay] = useState<
    "loading" | "playback" | "buffering" | "error"
  >("loading");
  const [overlayTapped, setOverlayTapped] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const forceOverlayDisplay =
    overlayTapped ||
    !isPlaying ||
    overlay === "buffering" ||
    overlay === "error";

  const togglePip = () => {
    console.log("toggling pip");
    mediaPlayerRef.current?.togglePip();
  };

  const pressPlay = () => {
    mediaPlayerRef.current?.play();
    setIsPlaying(true);

    // startLiveStreamPlaying();
    stopNFCPlaying();
  };

  const pressPause = () => {
    // stopLiveStreamPlaying();
    mediaPlayerRef.current?.pause();
    setIsPlaying(false);
  };

  const pressRetry = () => {
    setOverlay("loading");
    pressPlay();
    updateStreamPlayerKey(); // force repaint of player
  };

  useEffect(() => {
    // hide overlay after 1.5 seconds
    const timeout = setTimeout(() => {
      setOverlayTapped(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [overlayTapped]);

  useEffect(() => {
    if (isAudioOnly) {
      pressPause();
    }
  }, [isAudioOnly]);

  return (
    <>
      <View
        style={[
          styles.videoContainer,
          {
            width: "100%",
            height: Math.round(width * (9 / 16)),
          },
        ]}
      >
        <IVSPlayer
          key={streamPlayerKey}
          style={styles.videoPlayer}
          resizeMode="aspectFit"
          streamUrl={awsPlaybackUrl}
          initialBufferDuration={0.2}
          onLiveLatencyChange={(latency) => {
            // console.log('live latency: ', latency);

            setOverlay("playback");
            setLatency(latency);
          }}
          onData={(data) => {
            // loaded m3u8 and ready to play
            // console.log('onData', data);
            setOverlay("playback");
            setIsPlaying(false);
            setOverlayTapped(true);
          }}
          onError={(error) => {
            // playback error, probably stream is offline
            setErrorMessage(error);
            setOverlay("error");
            setIsPlaying(false);
          }}
          onLoad={() => {
            // started playing live stream
            setOverlay("playback");
            setIsPlaying(true);
            setOverlayTapped(false);
          }}
          onRebuffering={() => {
            // show buffering overlay
            setOverlay("buffering");
            setOverlayTapped(true);
          }}
          onPlayerStateChange={(state) => {
            if (state === PlayerState.Ended) {
              setOverlayTapped(true);
              setOverlay("error");
            }
          }}
          autoplay={false}
          volume={1}
          liveLowLatency={true}
          ref={mediaPlayerRef}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    backgroundColor: "hsl(0, 0%, 2%)",
  },
  videoPlayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  videoOverlay: {
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFillObject,
  },
  videoOverlayText: {
    color: "white",
    fontSize: 18,
    fontFamily: "NeuePixelSans",
    paddingTop: 12,
  },
});
