import React, { FC } from 'react';
import {
  FormControl,
  FormHelperText,
  FormHelperTextProps,
  InputLabel,
  InputLabelProps,
  OutlinedInput,
  OutlinedInputProps,
  Stack,
} from '@mui/material';

export type InputFieldProps = OutlinedInputProps & {
  InputLabelProps?: InputLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
};
const InputField: FC<InputFieldProps> = ({ InputLabelProps, FormHelperTextProps, label, fullWidth, ...props }) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <Stack gap={1}>
        <InputLabel
          focused={false}
          shrink={true}
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
              padding: 17,
              fontSize: 18,
              fontWeight: 700,
              ...props.inputProps?.style,
            },
          }}
        />
      </Stack>
      <FormHelperText
        error
        {...FormHelperTextProps}
        sx={{
          mx: 0,
          mt: 0.5,
          ...FormHelperTextProps?.sx,
        }}
      />
    </FormControl>
  );
};

export default InputField;
