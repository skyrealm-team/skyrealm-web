import { useMutation, UseMutationOptions } from "react-query";

import { ClientError, gql } from "graphql-request";

import client from "./client";

export const brokerUpdateProfileMutation = gql`
  mutation brokerUpdateProfile(
    $firstName: String
    $lastName: String
    $organization: String
    $phoneNumber: String
    $avatar: String
    $organizationAvatar: String
    $bio: String
  ) {
    brokerUpdateProfile(
      firstName: $firstName
      lastName: $lastName
      organization: $organization
      phoneNumber: $phoneNumber
      avatar: $avatar
      organizationAvatar: $organizationAvatar
      bio: $bio
    ) {
      userId
    }
  }
`;

export const brokerUpdateProfileRequest = async (
  variables: Partial<MutationBrokerUpdateProfileArgs>,
  requestHeaders?: HeadersInit
) => {
  return client
    .request<Mutation>(brokerUpdateProfileMutation, variables, requestHeaders)
    .then((data) => data.updateFavoriteListings);
};

export const useBrokerUpdateProfile = (
  options?: UseMutationOptions<
    Mutation["brokerUpdateProfile"],
    ClientError,
    Partial<MutationBrokerUpdateProfileArgs>
  >
) => {
  return useMutation(
    [brokerUpdateProfileMutation],
    brokerUpdateProfileRequest,
    options
  );
};

export default useBrokerUpdateProfile;
