import { createGlobalState } from "react-use";

const useDefaultBounds = createGlobalState<google.maps.LatLngBoundsLiteral>({
  east: -73.8933254265425,
  north: 40.82950309443075,
  south: 40.68860118615344,
  west: -74.04513657345743,
});

export default useDefaultBounds;
