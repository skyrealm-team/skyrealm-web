import { FC } from "react";

import { Button } from "@mui/material";

import useOpens from "hooks/useOpens";

const SignInButton: FC = () => {
  const [opens, setOpens] = useOpens();

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setOpens({
          ...opens,
          signinDialog: true,
        });
      }}
      sx={{
        width: 100,
        height: 40,
      }}
    >
      Sign in
    </Button>
  );
};

export default SignInButton;
