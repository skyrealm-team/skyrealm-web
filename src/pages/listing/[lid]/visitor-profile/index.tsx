import { dehydrate, QueryClient } from "react-query";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { Container, Stack } from "@mui/material";

import PropertyCharts from "components/PropertyCharts";
import PropertyHeader from "components/PropertyHeader";
import PropertyMap from "components/PropertyMap";
import useQueryListingById, {
  queryListingByIdRequest,
  queryListingByIdQuery,
} from "graphql/useQueryListingById";
import PropertyLayout from "layouts/PropertyLayout";
import { NextPageWithLayout } from "pages/_app";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { lid } = context.query;

  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(
      [
        queryListingByIdQuery,
        {
          listingId: String(lid),
        },
      ],
      () => {
        return queryListingByIdRequest({
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

const VisitorProfile: NextPageWithLayout = () => {
  const router = useRouter();
  const { lid } = router.query;

  const { data: listing, isLoading: listingIsLoading } = useQueryListingById({
    listingId: lid && String(lid),
  });

  return (
    <Stack>
      <PropertyHeader listing={listing} />
      <PropertyMap
        center={{
          lat: Number(listing?.latitude),
          lng: Number(listing?.longitude),
        }}
        zoom={Math.log2((40000000 * 194) / 152.4 / 256 / 2)}
        MarkerProps={{
          position: {
            lat: Number(listing?.latitude),
            lng: Number(listing?.longitude),
          },
        }}
      />
      <Container
        sx={{
          maxWidth: 1360,
          py: 3,
        }}
      >
        <Stack gap={4}>
          <PropertyCharts listing={listing} isLoading={listingIsLoading} />
        </Stack>
      </Container>
    </Stack>
  );
};

VisitorProfile.getLayout = (page) => {
  return <PropertyLayout>{page}</PropertyLayout>;
};

export default VisitorProfile;
