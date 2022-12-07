import { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

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

export type ReactQueryProviderProps = {};

const ReactQueryProvider: FC<PropsWithChildren<ReactQueryProviderProps>> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
