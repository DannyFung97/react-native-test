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
