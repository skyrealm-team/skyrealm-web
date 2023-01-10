import getConfig from "next/config";

import { GraphQLClient } from "graphql-request";
import Cookies from "universal-cookie";

const { publicRuntimeConfig } = getConfig();
const cookies = new Cookies();

const client = new GraphQLClient(
  publicRuntimeConfig.env.NEXT_PUBLIC_BACKEND_API ?? "",
  {
    requestMiddleware: (request) => {
      const requestCookies = new Cookies(
        (request.headers as never)?.["cookie"]
      );
      const authorization =
        requestCookies.get("auth-token") ?? cookies.get("auth-token");

      return {
        ...request,
        headers: {
          ...(authorization && {
            authorization,
          }),
          ...request.headers,
        },
      };
    },
    responseMiddleware: (response) => {
      if (response instanceof Error) {
        if (response.message.includes("Invalid Token")) {
          cookies.remove("auth-token");
        }
      }
    },
  }
);

export default client;
