import { FC } from "react";

import {
  FormControl,
  FormHelperText,
  FormHelperTextProps,
  OutlinedInput,
  OutlinedInputProps,
  Stack,
} from "@mui/material";

import FieldLabel, { FieldLabelProps } from "components/FieldLabel";

export type InputFieldProps = OutlinedInputProps & {
  InputLabelProps?: FieldLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
};
const InputField: FC<InputFieldProps> = ({
  InputLabelProps,
  FormHelperTextProps,
  label,
  fullWidth,
  ...props
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <Stack gap={1}>
        <FieldLabel required={props.required} {...InputLabelProps}>
          {label}
        </FieldLabel>
        <OutlinedInput
          error={!!FormHelperTextProps?.children}
          {...props}
          inputProps={{
            ...props.inputProps,
            style: {
              height: "auto",
              fontSize: 18,
              fontWeight: 700,
              ...props.inputProps?.style,
            },
          }}
        />
      </Stack>
      {FormHelperTextProps?.children && (
        <FormHelperText
          error
          {...FormHelperTextProps}
          sx={{
            mx: 0,
            mt: 0.5,
            ...FormHelperTextProps?.sx,
          }}
        />
      )}
    </FormControl>
  );
};

export default InputField;
