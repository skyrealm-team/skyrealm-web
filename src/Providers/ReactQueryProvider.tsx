import { FC, PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from "react-query";

import { ClientError } from "graphql-request";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const clientError = error as ClientError;
        return !clientError.response?.errors?.find((error) =>
          error.message.includes("Invalid Token")
        );
      },
    },
  },
});

export type ReactQueryProviderProps = Partial<QueryClientProviderProps>;

const ReactQueryProvider: FC<PropsWithChildren<ReactQueryProviderProps>> = ({
  children,
  ...props
}) => {
  return (
    <QueryClientProvider {...props} client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
