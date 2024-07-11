import { UseQueryResult, useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { USER_QUERY } from "../graphql/user";

type GetUserInput = {
    data: {
      address: string
    };
  };

type GetUserResponse = {
    getUser: {
      address: string;
      username: string;
      signature: string;
      powerUserLvl: number;
      videoSavantLvl: number;
      nfcRank: number;
      FCImageUrl: string;
      isFCUser: boolean;
      isLensUser: boolean;
      lensHandle: string;
      lensImageUrl: string;
      channel: {
        slug: string;
      };
    };
  };

  const fetchUser = async (params: GetUserInput): Promise<GetUserResponse> => {
    return request(String(process.env.EXPO_PUBLIC_API_ENDPOINT), USER_QUERY, params);
  }

    export function useUser(params: GetUserInput): UseQueryResult<GetUserResponse, Error> {
        return useQuery<GetUserResponse, Error>({
        queryKey: ['getUser', params],
        queryFn: () => fetchUser(params),
        });
    }