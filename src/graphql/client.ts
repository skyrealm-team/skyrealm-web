import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_API ?? "", {
  requestMiddleware: (request) => {
    const authToken =
      typeof window !== "undefined" &&
      window.localStorage.getItem("auth-token");

    return {
      ...request,
      headers: {
        ...request.headers,
        ...(authToken && {
          authorization: JSON.parse(authToken),
        }),
      },
    };
  },
  responseMiddleware: (response) => {
    if (response instanceof Error) {
      if (response.message.includes("Invalid Token")) {
        typeof window !== "undefined" &&
          window.localStorage.removeItem("auth-token");
      }
    }
  },
});

export default client;
