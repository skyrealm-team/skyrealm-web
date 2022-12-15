import { FC } from "react";

import { Button } from "@mui/material";

import useOpen from "hooks/useOpen";

const SignUpButton: FC = () => {
  const [open, setOpen] = useOpen();

  return (
    <Button
      variant="contained"
      onClick={() => {
        setOpen({
          ...open,
          signupDialog: true,
        });
      }}
      sx={{
        width: 100,
        height: 40,
      }}
    >
      Sign up
    </Button>
  );
};

export default SignUpButton;
