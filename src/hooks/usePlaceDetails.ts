import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';

export const usePlaceDetails = (
  variables: {
    map?: google.maps.Map;
  } & google.maps.places.PlaceDetailsRequest,
  options?: UseQueryOptions<google.maps.places.PlaceResult>,
) => {
  const { map, ...request } = variables;
  const PlacesService = useMemo(
    () => new google.maps.places.PlacesService(map ?? document.createElement('div')),
    [map],
  );

  return useQuery<google.maps.places.PlaceResult>(
    [usePlaceDetails.name, request],
    async () => {
      return new Promise((resolve, reject) => {
        if (!request.placeId) {
          return reject('place_id is required');
        }
        PlacesService.getDetails(request, async (result) => {
          if (!result) {
            return reject('result is empty');
          }

          resolve(result);
        });
      });
    },
    {
      enabled: !!request.placeId,
      ...options,
    },
  );
};

export default usePlaceDetails;
