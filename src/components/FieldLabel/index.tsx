import { FC, PropsWithChildren } from "react";

import { InputLabel, InputLabelProps, Typography } from "@mui/material";

export type FieldLabelProps = InputLabelProps;
const FieldLabel: FC<PropsWithChildren<FieldLabelProps>> = ({
  children,
  ...props
}) => {
  if (!children) {
    return null;
  }

  return (
    <InputLabel
      focused={false}
      shrink={true}
      {...props}
      sx={{
        position: "initial",
        transform: "initial",
        fontSize: 16,
        fontWeight: 700,
        color: "#666",
        ...props?.sx,
      }}
    >
      {props.required && (
        <Typography variant="inherit" component="span" color="error">
          *
        </Typography>
      )}
      {children}
    </InputLabel>
  );
};

export default FieldLabel;
