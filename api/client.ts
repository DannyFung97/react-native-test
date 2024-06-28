import { QueryClient } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';
import { useUserStore } from '../store/userStore';
// import { getAccessToken } from "@privy-io/react-auth";
import { useEffect, useState } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2 },
  },
});

export const useGqlClient = (): GraphQLClient | null => {
  const { userData, _hasHydrated } = useUserStore(z => ({
    userData: z.userData,
    _hasHydrated: z._hasHydrated,
  }));

  const [gqlClient, setGqlClient] = useState<GraphQLClient | null>(null);
  
  useEffect(() => {
    const createClient = async () => {
      let headers: { 'latest-verified-address'?: string; 'Authorization'?: string } = {};

      if (_hasHydrated && userData) {
        if (userData.address) {
          headers['latest-verified-address'] = userData.address;
        }

        // Fetch the access token asynchronously
        // const accessToken = await getAccessToken();
        // if (accessToken) {
        //   headers['Authorization'] = `Bearer ${accessToken}`;
        // }
      }

      // Create the GraphQL client with the headers
      const client = new GraphQLClient(String(process.env.EXPO_PUBLIC_API_ENDPOINT), {
        headers,
      });

      setGqlClient(client);
    };

    createClient();
  }, [_hasHydrated, userData]);

  return gqlClient;
};
