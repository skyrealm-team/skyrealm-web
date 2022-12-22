import { useMemo } from "react";
import { createGlobalState } from "react-use";

import { useRouter } from "next/router";

import { defaultsDeep, merge } from "lodash";

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
  const initialState: RouterState = {
    queryListingsArgs: {
      listingType: "For Lease",
    },
  };
  const routerState = useMemo(() => {
    return defaultsDeep(state, initialState);
  }, [state]);

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
