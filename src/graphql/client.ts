import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.REACT_APP_BACKEND_API ?? '', {
  requestMiddleware: (request) => {
    const authToken = window.localStorage.getItem('auth-token');

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
      if (response.message.includes('Invalid Token')) {
        window.localStorage.removeItem('auth-token');
      }
    }
  },
});

export default client;
