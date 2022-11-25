import { FC, useEffect, useRef } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { Box, BoxProps } from '@mui/material';
import useMap from 'hooks/useMap';

export type MapProps = BoxProps & {
  options?: google.maps.MapOptions;
  onIdle?: (map: google.maps.Map) => void;
};

const Map: FC<MapProps> = ({ options, onIdle, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useMap();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          center: {
            lng: 0,
            lat: 0,
          },
          zoom: 0,
          clickableIcons: false,
        }),
      );
    }
  }, [ref, map, setMap]);

  useDeepCompareEffect(() => {
    if (map && options) {
      map.setOptions(options);
    }
  }, [map, options]);

  return <Box {...props} ref={ref} />;
};

export default Map;
