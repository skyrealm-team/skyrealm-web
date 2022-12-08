import { FC, PropsWithChildren } from "react";

import {
  LoadScriptNext,
  LoadScriptNextProps,
  LoadScriptProps,
} from "@react-google-maps/api";

import Loading from "components/Loading";

const libraries: LoadScriptProps["libraries"] = ["places"];

export type GoogleMapsProviderProps = Partial<LoadScriptNextProps>;

const GoogleMapsProvider: FC<PropsWithChildren<GoogleMapsProviderProps>> = ({
  children,
  ...props
}) => {
  return (
    <LoadScriptNext
      libraries={libraries}
      loadingElement={<Loading />}
      {...props}
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
    >
      <>{children}</>
    </LoadScriptNext>
  );
};

export default GoogleMapsProvider;
