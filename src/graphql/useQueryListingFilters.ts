import { useQuery, UseQueryOptions } from "react-query";

import { ClientError, gql, RequestOptions } from "graphql-request";

import client from "./client";

export const queryListingFiltersQuery = gql`
  query queryListingFilters {
    queryListingFilters {
      filterName
      filterValues
    }
  }
`;

export const queryListingFiltersRequest = (
  options?: Partial<RequestOptions>
) => {
  return client.request({
    ...options,
    document: queryListingFiltersQuery,
  });
};

export const useQueryListingFilters = (
  options?: UseQueryOptions<Queries, ClientError>
) => {
  return useQuery<Queries, ClientError>(
    [useQueryListingFilters.name],
    () => {
      return queryListingFiltersRequest();
    },
    options
  );
};

export default useQueryListingFilters;
