import { useMemo } from "react";
import { useQuery, UseQueryOptions } from "react-query";

export const usePlaceDetails = (
  variables: google.maps.places.PlaceDetailsRequest,
  options?: UseQueryOptions<google.maps.places.PlaceResult>
) => {
  const PlacesService = useMemo(
    () => new google.maps.places.PlacesService(document.createElement("div")),
    []
  );

  return useQuery<google.maps.places.PlaceResult>(
    [usePlaceDetails.name, variables],
    async () => {
      return new Promise((resolve, reject) => {
        if (!variables.placeId) {
          return reject("place_id is required");
        }
        PlacesService.getDetails(variables, async (result) => {
          if (!result) {
            return reject("result is empty");
          }

          resolve(result);
        });
      });
    },
    {
      enabled: !!variables.placeId,
      ...options,
    }
  );
};

export default usePlaceDetails;
