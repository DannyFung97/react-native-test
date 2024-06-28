import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '../../store/userStore';
import { useGqlClient } from '../client';
import { DISLIKE_NFC_MUTATION, LIKE_NFC_MUTATION } from '../graphql/nfc';

type LikeNfcTypes = {
  likableId: string;
};

export function useLikeNfc({ likableId }: LikeNfcTypes) {
  const gqlClient = useGqlClient();
  const { userData } = useUserStore(z => ({
    userData: z.userData,
  }));

  const powerValues: {[key: number]: number} = {
    0: 1,
    1: 2,
    2: 4,
    3: 6,
  };

  const powerLvl = userData?.powerUserLvl || 0;
  const likeAmount = powerValues[powerLvl];
  const likeValue = Number(likeAmount) / 2;

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!gqlClient) {
        throw new Error('GraphQL client is not initialized');
      }
      return gqlClient.request(LIKE_NFC_MUTATION, {
        // value is half because some weird stuff is happening with double mutations
        data: { likedObj: 'NFC', likableId: likableId, value: likeValue < 1 ? 1 : likeValue },
      });
    },
    onError: (error: Error) => {
      console.error('Error liking NFC:', error);
    },
  });

  return likeMutation;
}

export function useDislikeNfc({ likableId }: LikeNfcTypes) {
  const gqlClient = useGqlClient();
  const { userData } = useUserStore(z => ({
    userData: z.userData,
  }));

  const powerValues: {[key: number]: number} = {
    0: 1,
    1: 2,
    2: 4,
    3: 6,
  };

  const powerLvl = userData?.powerUserLvl || 0;
  const likeAmount = powerValues[powerLvl];
  const dislikeValue = Number(-likeAmount) / 2;

  const dislikeMutation = useMutation({
    mutationFn: async () => {
      if (!gqlClient) {
        throw new Error('GraphQL client is not initialized');
      }
      return gqlClient.request(DISLIKE_NFC_MUTATION, {
        // value is half because some weird stuff is happening with double mutations
        data: { likedObj: 'NFC', likableId: likableId, value: dislikeValue < 1 ? 1 : dislikeValue },
      });
    },
    onError: (error: Error) => {
      console.error('Error disliking NFC:', error);
    },
  });

  return dislikeMutation;
}
