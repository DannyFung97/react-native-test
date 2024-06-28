import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useGqlClient } from '../client';
import { UPDATE_NOTIFICATION_SETTINGS } from '../graphql/notifications';

type DeviceNotifications = {
  token: string;
  notificationsLive?: boolean;
  notificationsNFCs?: boolean;
  address?: string;
};

export const useUpdateNotificationSettings = (): UseMutationResult<any, Error, DeviceNotifications> => {
  const gqlClient = useGqlClient();

  const mutation = useMutation({
    mutationFn: async (params: DeviceNotifications) => {
      if (!gqlClient) {
        throw new Error('GraphQL client is not initialized');
      }
      console.log('🥕 ----- updating notifications -----');
      return gqlClient.request(UPDATE_NOTIFICATION_SETTINGS, {
        data: params,
      });
    },
    onError: (error: Error) => {
      console.error('Error updating notification settings:', error);
    },
    onSuccess: (data) => {
      console.log('Notification settings updated successfully:', data);
    },
  });

  return mutation;
};