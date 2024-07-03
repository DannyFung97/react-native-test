import { memo, useRef, useState } from "react";

import { Src } from "@livepeer/react";
import * as Player from "@livepeer/react/player";
import {
  EnterFullscreenIcon,
  ExitFullscreenIcon,
  MuteIcon,
  PauseIcon,
  PictureInPictureIcon,
  PlayIcon,
  UnmuteIcon,
} from "@livepeer/react/assets";
import { Text, View } from "react-native";

const unacceptedErrors = ["Failed to connect to peer."];

const LivepeerPlayer = memo(
  ({
    src,
    isPreview,
    customSizePercentages,
  }: {
    src: Src[] | null;
    isPreview?: boolean;
    customSizePercentages?: { width: `${number}%`; height: `${number}%` };
  }) => {
    const [opacity, setOpacity] = useState(0);

    const timeoutRef = useRef<number | NodeJS.Timeout | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleOpacity = () => {
      setOpacity(1); // Set opacity to 1 on touch
      // Clear any existing timeout to prevent it from resetting opacity prematurely
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout and store its ID in the ref
      timeoutRef.current = setTimeout(() => {
        setOpacity(0); // Change back to 0 after 3 seconds
        timeoutRef.current = null; // Reset the ref after the timeout completes
      }, 2000);
    };

    if (!src) {
      return (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            position: "relative",
          }}
        >
          <View
            style={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
            }}
          >
            <Text>loading</Text>
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          position: "relative",
        }}
      >
        <Player.Root
          aspectRatio={null}
          src={src}
          autoPlay
          onError={(e) => {
            if (
              e?.message &&
              e?.message?.length > 0 &&
              e?.type === "unknown" &&
              !unacceptedErrors.includes(e?.message)
            ) {
              console.log("Error playing video", JSON.stringify(e));
              setError(JSON.stringify(e));
            }
          }}
        >
          <Player.Container
            style={{
              backgroundColor: "black",
              width: "100%",
              height: "100%",
            }}
          >
            <Player.Video
              muted
              style={{
                height: "100%",
                margin: "auto",
                objectFit: "contain",
              }}
            />
            <Player.LoadingIndicator
              asChild
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Text>loading</Text>
              </View>
            </Player.LoadingIndicator>

            <View
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
              }}
            >
              <Player.PlayingIndicator asChild matcher={false}>
                <PlayIcon
                  style={{
                    width: isPreview ? 25 : 100,
                    height: isPreview ? 25 : 100,
                  }}
                />
              </Player.PlayingIndicator>
              <Player.VolumeIndicator asChild matcher={false}>
                <MuteIcon
                  style={{
                    width: isPreview ? 25 : 100,
                    height: isPreview ? 25 : 100,
                  }}
                />
              </Player.VolumeIndicator>
            </View>
            <Player.ErrorIndicator
              matcher="all"
              asChild
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {error ? (
                    <>
                      <Text>Error detected while playing video</Text>
                      <Text>{JSON.parse(error).message}</Text>
                    </>
                  ) : (
                    <>
                      <Text>Stream is offline</Text>
                      {!isPreview && (
                        <Text>Refresh for the latest streaming updates</Text>
                      )}
                      {/* <IconButton
                        color="white"
                        aria-label="refresh"
                        icon={<BiRefresh size="30px" />}
                        bg="rgb(0, 0, 0, 0.5)"
                        onClick={() => window?.location?.reload()}
                        _hover={{
                          bg: "rgb(255,255,255, 0.1)",
                        }}
                        _focus={{}}
                        _active={{}}
                        borderWidth="1px"
                        zIndex="1"
                      /> */}
                    </>
                  )}
                </View>
              </View>
            </Player.ErrorIndicator>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                display: "View",
                alignItems: "center",
                gap: 10,
                width: "100%",
                opacity,
                transition: "opacity 0.5s",
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))",
              }}
            >
              <Player.PlayPauseTrigger
                style={{
                  width: 25,
                  height: 25,
                }}
              >
                <Player.PlayingIndicator asChild matcher={false}>
                  <PlayIcon />
                </Player.PlayingIndicator>
                <Player.PlayingIndicator asChild>
                  <PauseIcon />
                </Player.PlayingIndicator>
              </Player.PlayPauseTrigger>
              <Player.MuteTrigger
                style={{
                  width: 25,
                  height: 25,
                }}
              >
                <Player.VolumeIndicator asChild matcher={false}>
                  <MuteIcon />
                </Player.VolumeIndicator>
                <Player.VolumeIndicator asChild matcher={true}>
                  <UnmuteIcon />
                </Player.VolumeIndicator>
              </Player.MuteTrigger>
              <Player.Volume
                style={{
                  position: "relative",
                  display: "View",
                  flexGrow: 1,
                  height: 25,
                  alignItems: "center",
                  maxWidth: 120,
                  touchAction: "none",
                  userSelect: "none",
                }}
              >
                <Player.Track
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    position: "relative",
                    flexGrow: 1,
                    borderRadius: 9999,
                    height: "2px",
                  }}
                >
                  <Player.Range
                    style={{
                      position: "absolute",
                      backgroundColor: "white",
                      borderRadius: 9999,
                      height: "100%",
                    }}
                  />
                </Player.Track>
                <Player.Thumb
                  style={{
                    display: "block",
                    width: 12,
                    height: 12,
                    backgroundColor: "white",
                    borderRadius: 9999,
                  }}
                />
              </Player.Volume>
              {!isPreview && (
                <>
                  <Player.PictureInPictureTrigger
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  >
                    <PictureInPictureIcon />
                  </Player.PictureInPictureTrigger>
                  <Player.FullscreenTrigger
                    style={{
                      position: "absolute",
                      right: 20,
                      width: 25,
                      height: 25,
                    }}
                  >
                    <Player.FullscreenIndicator asChild matcher={false}>
                      <EnterFullscreenIcon />
                    </Player.FullscreenIndicator>
                    <Player.FullscreenIndicator asChild>
                      <ExitFullscreenIcon />
                    </Player.FullscreenIndicator>
                  </Player.FullscreenTrigger>
                </>
              )}
            </div>
          </Player.Container>
        </Player.Root>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.src === nextProps.src;
  }
);

export default LivepeerPlayer;
