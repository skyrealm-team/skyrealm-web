import { FC } from "react";

import { Button } from "@mui/material";

import useOpens from "hooks/useOpens";

const SignUpButton: FC = () => {
  const [opens, setOpens] = useOpens();

  return (
    <Button
      variant="contained"
      onClick={() => {
        setOpens({
          ...opens,
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
