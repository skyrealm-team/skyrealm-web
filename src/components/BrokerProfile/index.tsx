import { FC } from "react";

import { List } from "@mui/material";

import ListingsItem from "components/ListingsItem";
import useGetUserInfo from "graphql/useGetUserInfo";
import useQueryListingsByIDs from "graphql/useQueryListingsByIDs";

const BrokerProfile: FC = () => {
  const { data: userInfo, isLoading: userInfoIsLoading } = useGetUserInfo();
  const { data: listings, isLoading: listingsIsLoading } =
    useQueryListingsByIDs({
      listingIDs: userInfo?.favorite,
    });

  return (
    <List disablePadding>
      {(userInfoIsLoading || listingsIsLoading
        ? Array.from<SingleListing>(new Array(5))
        : listings?.listings
      )?.map((listing, index, array) => (
        <ListingsItem
          key={listing?.listingId ?? index}
          ListItemProps={{
            divider: index < array.length - 1,
          }}
          ListItemButtonProps={{
            sx: {
              px: 2,
              py: 1.5,
            },
          }}
          listing={listing}
        />
      ))}
    </List>
  );
};

export default BrokerProfile;
