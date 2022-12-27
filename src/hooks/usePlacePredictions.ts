import { useMemo } from "react";
import { useQuery, UseQueryOptions } from "react-query";

export const usePlacePredictions = (
  variables: google.maps.places.AutocompletionRequest,
  options?: UseQueryOptions<
    google.maps.places.AutocompleteResponse["predictions"]
  >
) => {
  const AutocompleteService = useMemo(
    () => new google.maps.places.AutocompleteService(),
    []
  );

  return useQuery<google.maps.places.AutocompleteResponse["predictions"]>(
    ["usePlacePredictions", variables],
    async () => {
      const res = await AutocompleteService.getPlacePredictions({
        language: "en",
        ...variables,
      });

      return res.predictions;
    },
    {
      enabled: !!variables.input,
      ...options,
    }
  );
};

export default usePlacePredictions;
