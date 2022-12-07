import { QueryObserverOptions, useQuery } from "react-query";

export type GeoJSON = {
  geojson: {
    type: string;
    coordinates: [number, number][][][];
  };
  lat: string;
  lon: string;
  boundingbox: [string, string, string, string];
  osm_type: string;
};

export const useGeoJSON = (
  variables: {
    q?: string;
  },
  options?: QueryObserverOptions<GeoJSON[]>
) => {
  return useQuery<GeoJSON[]>(
    [useGeoJSON.name, variables],
    async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${variables.q}&polygon_geojson=1&format=json`
      );
      return res.json();
    },
    {
      enabled: !!variables.q,
      ...options,
    }
  );
};

export default useGeoJSON;
