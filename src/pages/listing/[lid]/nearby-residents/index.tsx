import { dehydrate, QueryClient } from "react-query";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { Container, Stack } from "@mui/material";

import PropertyCharts from "components/PropertyCharts";
import PropertyHeader from "components/PropertyHeader";
import PropertyMap from "components/PropertyMap";
import useQueryListing, {
  queryListingRequest,
  queryListingQuery,
} from "graphql/useQueryListing";
import PropertyLayout from "layouts/PropertyLayout";
import { NextPageWithLayout } from "pages/_app";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lid } = context.query;

  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(
      [
        queryListingQuery,
        {
          listingId: String(lid),
        },
      ],
      () => {
        return queryListingRequest({
          variables: {
            listingId: String(lid),
          },
        });
      }
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const NearbyResidents: NextPageWithLayout = () => {
  const router = useRouter();
  const { lid } = router.query;

  const { data: listing, isLoading: listingIsLoading } = useQueryListing({
    listingId: lid && String(lid),
  });

  return (
    <Stack>
      <PropertyHeader listing={listing} />
      <PropertyMap listing={listing} polyGeom />
      <Container
        sx={{
          maxWidth: 1360,
          py: 3,
        }}
      >
        <PropertyCharts listing={listing} isLoading={listingIsLoading} />
      </Container>
    </Stack>
  );
};

NearbyResidents.getLayout = (page) => {
  return <PropertyLayout>{page}</PropertyLayout>;
};

export default NearbyResidents;