import { useMutation, UseMutationOptions } from "react-query";

import { ClientError, gql } from "graphql-request";
import { useSnackbar } from "notistack";

import client from "./client";

export const contactBrokerMutation = gql`
  mutation contactBroker(
    $listingId: String!
    $message: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String!
    $company: String!
  ) {
    contactBroker(
      listingId: $listingId
      message: $message
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      email: $email
      company: $company
    ) {
      status
      message
    }
  }
`;

export const contactBrokerRequest = (
  variables: MutationContactBrokerArgs,
  requestHeaders?: HeadersInit
) => {
  return client
    .request<Mutation>(contactBrokerMutation, variables, requestHeaders)
    .then((data) => data.contactBroker);
};

export const useContactBroker = (
  options?: UseMutationOptions<
    Mutation["contactBroker"],
    ClientError,
    MutationContactBrokerArgs
  >
) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<
    Mutation["contactBroker"],
    ClientError,
    MutationContactBrokerArgs
  >([useContactBroker.name], contactBrokerRequest, {
    ...options,
    onSuccess: async (data, variables, context) => {
      enqueueSnackbar("Your submission has been sent.", {
        variant: "success",
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export default useContactBroker;
