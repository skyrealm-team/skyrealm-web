import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';

export const usePlaceDetails = (
  variables: {
    map?: google.maps.Map;
    place_id?: string;
  },
  options?: UseQueryOptions<google.maps.places.PlaceResult>,
) => {
  const { map, place_id } = variables;
  const PlacesService = useMemo(
    () => new google.maps.places.PlacesService(map ?? document.createElement('div')),
    [map],
  );

  return useQuery<google.maps.places.PlaceResult>(
    [usePlaceDetails.name, place_id],
    async () => {
      return new Promise((resolve, reject) => {
        if (!place_id) {
          return reject('place_id is required');
        }
        PlacesService.getDetails(
          {
            placeId: place_id,
          },
          async (result) => {
            if (!result) {
              return reject('result is empty');
            }

            resolve(result);
          },
        );
      });
    },
    {
      enabled: !!place_id,
      ...options,
    },
  );
};

export default usePlaceDetails;
