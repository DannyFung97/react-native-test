import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { CHANNEL_FEED_QUERY } from '../graphql/channels';
import { useIsFocused } from '@react-navigation/native';

type ChannelFeedInput = {
  data: {
    [key: string]: any; // Adjust this according to your actual input structure
  };
};

type ChannelFeedResponse = {
  getChannelFeed: {
    id: string;
    isLive: boolean;
    name: string;
    description: string;
    slug: string;
    owner: {
      username: string;
      address: string;
      FCImageUrl: string;
      lensImageUrl: string;
    };
    thumbnailUrl: string;
  }[];
};

export const fetchChannelFeed = async (params: ChannelFeedInput): Promise<ChannelFeedResponse> => {
  return request(String(process.env.EXPO_PUBLIC_API_ENDPOINT), CHANNEL_FEED_QUERY, params);
};

export function useChannels(params: ChannelFeedInput): UseQueryResult<ChannelFeedResponse, Error> {
  const isFocused = useIsFocused();
  const refetchInterval = isFocused ? 2000 : false;

  return useQuery<ChannelFeedResponse, Error>({
    queryKey: ['getChannelFeed', params],
    queryFn: () => fetchChannelFeed(params),
    refetchInterval: refetchInterval,
  });
}