import { GraphQLClient } from "graphql-request";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const client = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_API ?? "", {
  requestMiddleware: (request) => {
    const authToken = cookies.get("auth-token");

    return {
      ...request,
      headers: {
        authorization: authToken,
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
});

export default client;
