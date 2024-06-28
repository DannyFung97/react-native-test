import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useGqlClient } from '../client';
import { gql } from 'graphql-request';

type DeviceNotifications = {
  token: string;
  notificationsLive?: boolean;
  notificationsNFCs?: boolean;
  address?: string;
};

type PostDeviceTokenInput = {
  data: DeviceNotifications;
};

type CreateNotificationSettingsResponse = {
  postDeviceToken: {
    token: string;
    notificationsLive: boolean;
    notificationsNFCs: boolean;
    address: string;
  };
};

export const CREATE_NOTIFICATION_SETTINGS = gql`
  mutation createNotificationSettings($data: PostDeviceTokenInput!) {
    postDeviceToken(data: $data) {
      token
      notificationsLive
      notificationsNFCs
      address
    }
  }
`;

export const useCreateNotificationSettings = (): UseMutationResult<CreateNotificationSettingsResponse, Error, DeviceNotifications> => {
  const gqlClient = useGqlClient();

  const mutate = useMutation<CreateNotificationSettingsResponse, Error, DeviceNotifications>({
    mutationFn: async (params: DeviceNotifications) => {
      if (!gqlClient) {
        throw new Error('GraphQL client is not initialized');
      }
      console.log('🥕 ----- creating notifications -----');
      return gqlClient.request<CreateNotificationSettingsResponse>(CREATE_NOTIFICATION_SETTINGS, {
        data: params,
      });
    },
    onError: (error: Error) => {
      console.error('Error creating notification settings:', error);
    },
  });

  return mutate;
};