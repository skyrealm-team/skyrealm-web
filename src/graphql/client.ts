import { ApolloClient, InMemoryCache, ApolloLink, split } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { customFetch } from './customFetch';
import { v4 as uuid } from 'uuid';
import {
  LOCAL_STORE_KEY,
  getFromLocalStorage,
  removeUserDataFromLocalStorage,
  saveToLocalStorage,
} from 'shared/utils/localStorage';

const getViewerSessionID = () => {
  let viewerSessionID = getFromLocalStorage(LOCAL_STORE_KEY.viewerSessionID);

  if (!viewerSessionID) {
    viewerSessionID = uuid();
    saveToLocalStorage(LOCAL_STORE_KEY.viewerSessionID, viewerSessionID);
  }

  return viewerSessionID;
};

const timeStartLink = new ApolloLink((operation, forward) => {
  const context = operation.getContext();
  const accessToken = getFromLocalStorage(LOCAL_STORE_KEY.accessToken);

  // auth page need accesstoken, if token is null, redirect to login
  operation.setContext({
    headers: {
      Authorization: accessToken,
      'viewer-session-id': getViewerSessionID(),
      ...context.headers,
    },
  });
  return forward(operation);
});

const wsLink = new WebSocketLink({
  uri: `wss:${process.env.REACT_APP_BACKEND_API}`,
  options: {
    reconnect: true,
    lazy: true,
    /** Use function to get latest access token after logged in */
    connectionParams: () => ({
      'access-token': getFromLocalStorage(LOCAL_STORE_KEY.accessToken),
      'viewer-session-id': getViewerSessionID(),
    }),
  },
});

const httpLink = ApolloLink.from([
  // onError
  timeStartLink
    .concat(
      onError(({ graphQLErrors, networkError, operation }) => {
        if (graphQLErrors) {
          const errorCode = graphQLErrors[0].extensions?.code;
          // 16: not logged in or session expired, 7: abort access, 10: terminate request
          if (errorCode === 16) {
            // If session is invalid or expired, we should clear user data to avoid login page redirect because of local user data
            removeUserDataFromLocalStorage();
          } else if (errorCode !== 7 && errorCode !== 10) {
            // const errorMessages = graphQLErrors
            //     .map(
            //         // eslint-disable-next-line max-len
            //         ({ message, locations, path }) =>
            //             `Message: ${message}, Location: ${locations}, Path: ${path}`,
            //     )
            //     .join('; ');
            //
            // log('error', {
            //     value: JSON.stringify({
            //         operationName: operation.operationName,
            //         variables: operation.variables,
            //         errorMessages,
            //     }),
            // });
          }
        }
      }),
    )
    .concat(
      createUploadLink({
        uri: process.env.REACT_APP_BACKEND_API,
        credentials: 'same-origin',
        fetch: customFetch as any,
      }),
    ),
]);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
});

export default client;
