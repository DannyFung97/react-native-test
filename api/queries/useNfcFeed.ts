import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { NFC_FEED_QUERY } from '../graphql/nfc';
import { request } from 'graphql-request';

type NfcFeedParams = {
  data: {
    // Define the shape of NFCFeedInput here
    [key: string]: any;
  };
};

type NfcFeedResponse = {
  getNFCFeed: {
    createdAt: string;
    id: string;
    videoLink: string;
    videoThumbnail: string;
    openseaLink: string;
    score: number;
    liked: boolean;
    owner: {
      username: string;
      address: string;
      FCImageUrl: string;
      powerUserLvl: number;
      videoSavantLvl: number;
    };
    title: string;
  }[];
};

const fetchNfcFeed = async (params: NfcFeedParams): Promise<NfcFeedResponse> => {
  return request(String(process.env.EXPO_PUBLIC_API_ENDPOINT), NFC_FEED_QUERY, params);
};

export function useNfcFeed(params: NfcFeedParams): UseQueryResult<NfcFeedResponse, Error> {
  return useQuery<NfcFeedResponse, Error>({
    queryKey: ['getNfcFeed', params],
    queryFn: () => fetchNfcFeed(params),
  });
}