import { useMemo } from "react";
import { createGlobalState } from "react-use";

import { useRouter } from "next/router";

import { defaultsDeep, isEmpty, merge } from "lodash";

import useQueryListingFilters from "graphql/useQueryListingFilters";

type RouterState = {
  queryListingsArgs?: Partial<QueriesQueryListingsArgs> & {
    address?: string;
    placeId?: string;
  };
};

const useGlobalRouterState = createGlobalState<RouterState>({});

const useRouterState = () => {
  const router = useRouter();
  const [state, setState] = useGlobalRouterState();

  const { data: listingFilters } = useQueryListingFilters();

  const routerState = useMemo<RouterState>(() => {
    return defaultsDeep(state, {
      queryListingsArgs: listingFilters?.reduce((acc, cur) => {
        if (isEmpty(cur?.defaultValue?.value)) {
          return acc;
        }

        return {
          ...acc,
          [cur?.key as never]: cur?.defaultValue?.value,
        };
      }, {}),
    });
  }, [state, listingFilters]);

  return {
    routerState,
    setRouterState: (values: RouterState, silence?: boolean) => {
      return setState((state) => {
        const result = merge(state, values);

        if (!silence) {
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              ...Object.entries(result).reduce(
                (acc, [key, val]) => ({
                  ...acc,
                  [key]: JSON.stringify(val),
                }),
                {}
              ),
            },
          });
        }

        return result;
      });
    },
  };
};

export default useRouterState;
