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
import useUserInfo from "graphql/useUserInfo";
import UserLayout from "layouts/UserLayout";
import { NextPageWithLayout } from "pages/_app";

const SavedList: NextPageWithLayout = () => {
  const { data: userInfo, isLoading: userInfoIsLoading } = useUserInfo();

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
            {(userInfoIsLoading
              ? Array.from(new Array(5))
              : userInfo?.getUserUserInfo.favorite
            )?.map((listingId, index, array) => (
              <ListingsItem
                key={listingId ?? index}
                ListItemProps={{
                  divider: index < array.length - 1,
                }}
                ListItemButtonProps={{
                  sx: {
                    px: 2,
                    py: 1.5,
                  },
                }}
                listing={
                  listingId
                    ? {
                        listingId,
                        address: "test",
                        availableSpaces: [],
                        brokersInfo: [],
                        frequency: 0,
                        isFavorite: true,
                        latitude: "",
                        longitude: "",
                        mediumIncome: 0,
                        visitors: 0,
                      }
                    : undefined
                }
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
