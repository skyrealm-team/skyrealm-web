import { useMemo } from "react";
import { createGlobalState } from "react-use";

import { useRouter } from "next/router";

import { defaultsDeep, isEmpty, merge } from "lodash";

import useQueryListingFilters from "graphql/useQueryListingFilters";

type QueryListingsArgs = Partial<QueriesQueryListingsArgs> & {
  address?: string;
  placeId?: string;
};

const useGlobalState = createGlobalState<QueryListingsArgs>({});

const useQueryListingsArgs = () => {
  const router = useRouter();
  const [state, setState] = useGlobalState();

  const { data: listingFilters } = useQueryListingFilters();

  const queryListingsArgs = useMemo<QueryListingsArgs>(() => {
    return defaultsDeep(
      state,
      listingFilters?.reduce((acc, cur) => {
        if (isEmpty(cur?.defaultValue?.value)) {
          return acc;
        }

        return {
          ...acc,
          [cur?.key as never]: cur?.defaultValue?.value,
        };
      }, {})
    );
  }, [state, listingFilters]);

  return {
    queryListingsArgs,
    setQueryListingsArgs: (values: QueryListingsArgs, silence?: boolean) => {
      return setState((state) => {
        const result = merge(state, values);

        if (!silence) {
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              queryListingsArgs: JSON.stringify(result),
            },
          });
        }

        return result;
      });
    },
  };
};

export default useQueryListingsArgs;
