import { FC } from "react";

import { Button } from "@mui/material";

import useOpen from "hooks/useOpen";

const SignInButton: FC = () => {
  const [open, setOpen] = useOpen();

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setOpen({
          ...open,
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
