import { useMutation, UseMutationOptions } from "react-query";

import { ClientError, gql } from "graphql-request";

import client from "./client";

export const getImgUploadUrlQuery = gql`
  query getImgUploadURL($imgType: String) {
    getImgUploadURL(imgType: $imgType) {
      expiration
      imgUrl
      uploadUrl
    }
  }
`;

export const getImgUploadUrlRequest = async (
  variables: QueriesGetImgUploadUrlArgs,
  requestHeaders?: HeadersInit
) => {
  return client
    .request<Queries>(getImgUploadUrlQuery, variables, requestHeaders)
    .then((data) => data.getImgUploadURL);
};

export const useGetImgUploadUrl = (
  options?: UseMutationOptions<
    Queries["getImgUploadURL"],
    ClientError,
    QueriesGetImgUploadUrlArgs
  >
) => {
  return useMutation<
    Queries["getImgUploadURL"],
    ClientError,
    QueriesGetImgUploadUrlArgs
  >([getImgUploadUrlQuery], getImgUploadUrlRequest, {
    ...options,
  });
};

export default useGetImgUploadUrl;
