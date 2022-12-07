import { FC, PropsWithChildren } from "react";

import { LoadScriptNext } from "@react-google-maps/api";

import Loading from "components/Loading";

export type GoogleMapsProviderProps = {};

const GoogleMapsProvider: FC<PropsWithChildren<GoogleMapsProviderProps>> = ({
  children,
}) => {
  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
      libraries={["places"]}
      loadingElement={<Loading />}
    >
      <>{children}</>
    </LoadScriptNext>
  );
};

export default GoogleMapsProvider;
