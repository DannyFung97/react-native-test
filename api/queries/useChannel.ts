import request from "graphql-request"
import { CHANNEL_QUERY } from "../graphql/channels"
import { UseQueryResult, useQuery } from "@tanstack/react-query"

type ChannelInput = {
  slug: string
}

type ChannelResponse = {
    getChannelBySlug: ChannelData
}

export type ChannelData = {
  description: string
  livepeerPlaybackId?: string
  livepeerStreamId?: string
  streamKey?: string
  isLive: boolean
  id: number
  name: string
  allowNFCs: boolean
  vibesTokenPriceRange: string[]
  pinnedChatMessages: string[]
  owner: {
    FCImageUrl?: string
    lensImageUrl?: string
    username?: string
    address: string
  }
  playbackUrl: string
  chatCommands: {
    command: string
    response: string
  }
  roles: {
    id: number
    userAddress: string
    role: number
  }
  thumbnailUrl: string
  awsId: string
}

export const fetchChannel = async (params: ChannelInput): Promise<ChannelResponse> => {
    return request(String(process.env.EXPO_PUBLIC_API_ENDPOINT), CHANNEL_QUERY, {slug: params.slug});
}

export function useChannel(params: ChannelInput): UseQueryResult<ChannelResponse, Error> {
    return useQuery<ChannelResponse, Error>({
        queryKey: ['getChannelBySlug', params],
        queryFn: () => fetchChannel(params),
    });
}