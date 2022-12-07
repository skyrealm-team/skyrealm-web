import { gql, ClientError } from 'graphql-request';
import { useMutation, UseMutationOptions } from 'react-query';
import client from './client';

export const updateFavoriteListingsMutation = gql`
  mutation updateFavoriteListings($listingId: String, $toLike: Boolean) {
    updateFavoriteListings(listingId: $listingId, toLike: $toLike) {
      userId
    }
  }
`;

export const updateFavoriteListingsRequest = (
  variables: MutationUpdateFavoriteListingsArgs,
  requestHeaders?: HeadersInit,
) => {
  return client.request(updateFavoriteListingsMutation, variables, requestHeaders);
};

export const useUpdateFavoriteListings = (
  options?: UseMutationOptions<
    {
      data: User;
    },
    ClientError,
    MutationUpdateFavoriteListingsArgs
  >,
) => {
  return useMutation([useUpdateFavoriteListings.name], updateFavoriteListingsRequest, options);
};

export default useUpdateFavoriteListings;
