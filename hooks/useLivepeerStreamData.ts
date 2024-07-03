import { ChannelData } from "@/api/queries/useChannel";
import { useState, useEffect } from "react";
import { Livepeer } from "livepeer";
import { PlaybackInfo } from "livepeer/models/components/playbackinfo";

export const useLivepeerStreamData = ({
    channelData
}: {
    channelData?: ChannelData
}) => {
    const livepeer = new Livepeer({
      apiKey: String(process.env.EXPO_PUBLIC_STUDIO_API_KEY),
    });
  
    const [playbackInfo, setPlaybackInfo] = useState<PlaybackInfo | undefined>(
      undefined
    );
    const [checkedForLivepeerPlaybackInfo, setCheckedForLivepeerPlaybackInfo] =
      useState<boolean>(false);
  
    useEffect(() => {
      const init = async () => {
        if (!channelData) return;
        if (channelData?.livepeerPlaybackId) {
          const res = await livepeer.playback.get(
            channelData?.livepeerPlaybackId
          );
          const playbackInfo = res.playbackInfo;
          setPlaybackInfo(playbackInfo);
        }
        setCheckedForLivepeerPlaybackInfo(true);
      };
      init();
    }, [channelData]);
  
    return {
      playbackInfo,
      checkedForLivepeerPlaybackInfo,
    };
  };
  