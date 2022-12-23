import { FC } from "react";

import { IconButton } from "@mui/material";

import FavoriteButtonSelectedIcon from "assets/icons/favorite-button-selected.svg";
import FavoriteButtonIcon from "assets/icons/favorite-button.svg";
import useGetUserInfo, { useSetUserInfoData } from "graphql/useGetUserInfo";
import useUpdateFavoriteListings from "graphql/useUpdateFavoriteListings";
import useOpens from "hooks/useOpens";

export type FavoriteButtonProps = {
  listing?: Maybe<SingleListing>;
};

const FavoriteButton: FC<FavoriteButtonProps> = ({ listing }) => {
  const [opens, setOpens] = useOpens();

  const { data: userInfo, refetch: refetchUserInfo } = useGetUserInfo();

  const setUserInfoData = useSetUserInfoData();
  const {
    mutateAsync: updateFavoriteListings,
    isLoading: updateFavoriteListingsIsLoading,
  } = useUpdateFavoriteListings();

  const isFavorite = userInfo?.favorite?.includes(listing?.listingId ?? "");

  return (
    <IconButton
      onClick={async (event) => {
        event.preventDefault();

        if (!userInfo) {
          setOpens({
            ...opens,
            signinDialog: true,
          });
          return;
        }

        try {
          if (userInfo) {
            setUserInfoData({
              ...userInfo,
              favorite: !isFavorite
                ? [...(userInfo?.favorite ?? []), listing?.listingId ?? ""]
                : userInfo?.favorite?.filter(
                    (item) => item !== listing?.listingId
                  ),
            });
          }
          await updateFavoriteListings({
            listingId: listing?.listingId ?? "",
            toLike: !isFavorite,
          });
        } finally {
          refetchUserInfo();
        }
      }}
      disabled={updateFavoriteListingsIsLoading}
    >
      {isFavorite ? <FavoriteButtonSelectedIcon /> : <FavoriteButtonIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
