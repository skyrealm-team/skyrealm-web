import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  List,
  Typography,
} from "@mui/material";

import ListingsItem from "components/ListingsItem";
import useQueryListingsByIDs from "graphql/useQueryListingsByIDs";
import useUserInfo from "graphql/useUserInfo";
import UserLayout from "layouts/UserLayout";
import { NextPageWithLayout } from "pages/_app";

const SavedList: NextPageWithLayout = () => {
  const { data: userInfo, isLoading: userInfoIsLoading } = useUserInfo();
  const { data: listings, isLoading: listingsIsLoading } =
    useQueryListingsByIDs({
      listingIDs: userInfo?.getUserUserInfo?.favorite,
    });

  return (
    <Container
      sx={{
        maxWidth: 1300,
        py: 8,
      }}
    >
      <Card elevation={0} square={false}>
        <CardHeader
          title={
            <Typography
              sx={{
                fontsize: 20,
                fontWeight: 700,
              }}
            >
              Saved List
            </Typography>
          }
          sx={{
            px: 4,
            pt: 3,
            pb: 2,
          }}
        />
        <CardContent
          sx={{
            px: 4,
            pt: 2,
            pb: 4,
          }}
        >
          <List disablePadding>
            {(userInfoIsLoading || listingsIsLoading
              ? Array.from<SingleListing>(new Array(5))
              : listings?.queryListingsByIDs?.listings
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
        </CardContent>
        <Box />
      </Card>
    </Container>
  );
};

SavedList.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default SavedList;
