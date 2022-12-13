import { useMemo } from "react";
import { createGlobalState } from "react-use";

import { useRouter } from "next/router";

import { merge, defaultsDeep } from "lodash";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export const useGlobalRouterState = createGlobalState<Record<string, object>>(
  {}
);
const useRouterState = <TData extends Record<string, object>>(
  initialState?: DeepPartial<TData>
) => {
  const router = useRouter();
  const [state, setState] = useGlobalRouterState();
  const routerState = useMemo(
    () => defaultsDeep(state, initialState),
    [initialState, state]
  ) as DeepPartial<TData>;

  return {
    routerState,
    setRouterState: (values: DeepPartial<TData>) => {
      return setState((state) => {
        const result = merge(state, values);

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

        return result;
      });
    },
  };
};

export default useRouterState;
