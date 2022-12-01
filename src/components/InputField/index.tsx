import React, { FC } from 'react';
import {
  FormControl,
  FormHelperText,
  FormHelperTextProps,
  InputLabel,
  InputLabelProps,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material';

export type InputFieldProps = OutlinedInputProps & {
  InputLabelProps?: InputLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
};
const InputField: FC<InputFieldProps> = ({ InputLabelProps, FormHelperTextProps, label, fullWidth, ...props }) => {
  return (
    <FormControl
      fullWidth={fullWidth}
      sx={(theme) => ({
        gap: theme.spacing(1),
      })}
    >
      <InputLabel
        {...InputLabelProps}
        sx={{
          position: 'initial',
          transform: 'initial',
          fontSize: 16,
          fontWeight: 700,
          color: '#666',
          ...InputLabelProps?.sx,
        }}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        {...props}
        inputProps={{
          ...props.inputProps,
          style: {
            padding: 20,
            fontSize: 18,
            fontWeight: 700,
            ...props.inputProps?.style,
          },
        }}
      />
      <FormHelperText {...FormHelperTextProps} />
    </FormControl>
  );
};

export default InputField;
