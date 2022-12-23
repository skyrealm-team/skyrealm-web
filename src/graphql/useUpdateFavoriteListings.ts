import { useMutation, UseMutationOptions } from "react-query";

import { ClientError, gql } from "graphql-request";

import client from "./client";

export const updateFavoriteListingsMutation = gql`
  mutation updateFavoriteListings($listingId: String, $toLike: Boolean) {
    updateFavoriteListings(listingId: $listingId, toLike: $toLike) {
      userId
    }
  }
`;

export const updateFavoriteListingsRequest = async (
  variables: MutationUpdateFavoriteListingsArgs,
  requestHeaders?: HeadersInit
) => {
  return client
    .request<Mutation>(
      updateFavoriteListingsMutation,
      variables,
      requestHeaders
    )
    .then((data) => data.updateFavoriteListings);
};

export const useUpdateFavoriteListings = (
  options?: UseMutationOptions<
    Mutation["updateFavoriteListings"],
    ClientError,
    MutationUpdateFavoriteListingsArgs
  >
) => {
  return useMutation(
    [useUpdateFavoriteListings.name],
    updateFavoriteListingsRequest,
    options
  );
};

export default useUpdateFavoriteListings;
