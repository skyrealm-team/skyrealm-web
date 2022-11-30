import { gql, useMutation } from '@apollo/client';

export const UPDATE_FAVORITE_LISTINGS = gql(`
  mutation UPDATE_FAVORITE_LISTINGS($listingId: String, $toLike: Boolean) {
    updateFavoriteListings(listingId: $listingId, toLike: $toLike) {
      userId
    }
  }
`);

const useUpdateFavoriteListings = () => {
  return useMutation<User, MutationUpdateFavoriteListingsArgs>(UPDATE_FAVORITE_LISTINGS);
};

export default useUpdateFavoriteListings;
