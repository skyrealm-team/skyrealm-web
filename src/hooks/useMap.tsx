import { createGlobalState } from 'react-use';

const useMap = createGlobalState<google.maps.Map | null>();

export default useMap;
