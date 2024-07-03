import { gql } from 'graphql-request';

export const CHANNEL_FEED_QUERY = gql`
  query GetChannelFeed($data: ChannelFeedInput!) {
    getChannelFeed(data: $data) {
      id
      isLive
      name
      description
      slug
      owner {
        username
        address
        FCImageUrl
        lensImageUrl
      }
      thumbnailUrl
    }
  }
`;

export const CHANNEL_QUERY = gql`
  query Channel($slug: String!) {
    getChannelBySlug(slug: $slug) {
      description
      livepeerPlaybackId
      livepeerStreamId
      streamKey
      isLive
      id
      name
      allowNFCs
      vibesTokenPriceRange
      pinnedChatMessages
      owner {
        FCImageUrl
        lensImageUrl
        username
        address
      }
      playbackUrl
      chatCommands {
        command
        response
      }
      roles {
        id
        userAddress
        role
      }
    }
  }
`