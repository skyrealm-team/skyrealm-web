import { useQuery } from 'react-query';
import { faker } from '@faker-js/faker';

const useProperties = () => {
  return useQuery<Property[]>({
    queryKey: [useProperties.name],
    queryFn: () => {
      return Array.from(new Array(20)).map(() => {
        const [lat, lng] = faker.address.nearbyGPSCoordinate([-33.91722, 151.23064], 2);

        return {
          id: faker.datatype.uuid(),
          image: `https://picsum.photos/seed/${faker.random.word()}/110`,
          address: faker.address.streetAddress(true),
          position: {
            lat: Number(lat),
            lng: Number(lng),
          },
          visitors: faker.datatype.number(),
          frequency: faker.datatype.number(),
          medium_income: faker.datatype.number(),
        };
      });
    },
  });
};

export default useProperties;
