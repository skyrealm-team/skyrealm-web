import { useQuery, UseQueryOptions } from "react-query";

import { ClientError, gql, RequestOptions } from "graphql-request";

import client from "./client";

export const queryListingFiltersQuery = gql`
  query queryListingFilters {
    queryListingFilters {
      key
      options {
        name
        value
        match {
          key
          value
        }
      }
      defaultValue {
        name
        value
        match {
          key
          value
        }
      }
    }
  }
`;

export const queryListingFiltersRequest = async (
  options?: Partial<RequestOptions<undefined, Queries["queryListingFilters"]>>
) => {
  return client
    .request<Queries>({
      ...options,
      document: queryListingFiltersQuery,
    })
    .then((data) => data.queryListingFilters);
};

export const useQueryListingFilters = (
  options?: UseQueryOptions<Queries["queryListingFilters"], ClientError>
) => {
  return useQuery<Queries["queryListingFilters"], ClientError>(
    [useQueryListingFilters.name],
    () => {
      return queryListingFiltersRequest();
    },
    options
  );
};

export default useQueryListingFilters;
