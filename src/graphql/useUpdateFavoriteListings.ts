import { gql, ClientError } from 'graphql-request';
import { useMutation, UseMutationOptions } from 'react-query';
import client from './client';

export const updateFavoriteListings = gql`
  mutation updateFavoriteListings($listingId: String, $toLike: Boolean) {
    updateFavoriteListings(listingId: $listingId, toLike: $toLike) {
      userId
    }
  }
`;

export const useUpdateFavoriteListings = (
  options?: UseMutationOptions<
    {
      data: User;
    },
    ClientError,
    MutationUpdateFavoriteListingsArgs
  >,
) => {
  return useMutation(
    [useUpdateFavoriteListings.name],
    (variables) => {
      return client.request(updateFavoriteListings, variables);
    },
    options,
  );
};

export default useUpdateFavoriteListings;
