import { FC } from "react";

import { Stack } from "@mui/material";

import useGetUserInfo from "graphql/useGetUserInfo";

import AvatarButton from "./AvatarButton";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";

const AuthButtons: FC = () => {
  const { data: userInfo, isLoading } = useGetUserInfo();

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={{
        xs: 1,
        sm: 3,
      }}
    >
      {!isLoading && (
        <>
          {!userInfo ? (
            <>
              <SignInButton />
              <SignUpButton />
            </>
          ) : (
            <AvatarButton />
          )}
        </>
      )}
    </Stack>
  );
};

export default AuthButtons;
