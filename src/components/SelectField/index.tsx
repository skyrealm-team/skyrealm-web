import { FC, PropsWithChildren } from 'react';
import { useToggle } from 'react-use';

import {
  FormControl,
  FormHelperText,
  FormHelperTextProps,
  InputLabel,
  InputLabelProps,
  OutlinedInput,
  OutlinedInputProps,
  Select,
  SelectProps,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

export type SelectFieldProps = OutlinedInputProps & {
  InputLabelProps?: InputLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
  SelectProps?: SelectProps;
};

const SelectField: FC<PropsWithChildren<SelectFieldProps>> = ({
  InputLabelProps,
  FormHelperTextProps,
  SelectProps,
  label,
  fullWidth,
  children,
  ...props
}) => {
  const [open, setOpen] = useToggle(false);

  return (
    <FormControl fullWidth={fullWidth}>
      <Stack gap={1}>
        {label && (
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
            {props.required && (
              <Typography variant="inherit" component="span" color="error">
                *
              </Typography>
            )}
            {label}
          </InputLabel>
        )}
        <Select
          variant="outlined"
          error={!!FormHelperTextProps?.children}
          input={
            <OutlinedInput
              {...props}
              sx={(theme) => ({
                ...(props.size !== 'small' && {
                  '.MuiSelect-select': {
                    minHeight: 'auto !important',
                    p: 2,
                    fontSize: 18,
                    fontWeight: 700,
                  },
                }),
                ':hover': {
                  fieldset: {
                    borderColor: `${theme.palette.border?.main} !important`,
                  },
                },
                '&.Mui-focused': {
                  fieldset: {
                    borderColor: `${theme.palette.border?.main} !important`,
                  },
                },
                ...props?.sx,
                ...(open && {
                  fieldset: {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                }),
              })}
            />
          }
          MenuProps={{
            ...SelectProps?.MenuProps,
            PaperProps: {
              ...SelectProps?.MenuProps?.PaperProps,
              sx: (theme) => ({
                borderRadius: `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-2px) !important',
              }),
            },
            MenuListProps: {
              ...SelectProps?.MenuProps?.MenuListProps,
              sx: (theme) => ({
                border: `2px solid ${theme.palette.border?.main}`,
                borderRadius: `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
              }),
            },
          }}
          onOpen={(event) => {
            setOpen(true);
            return SelectProps?.onOpen?.(event);
          }}
          onClose={(event) => {
            setOpen(false);
            return SelectProps?.onClose?.(event);
          }}
        >
          {children}
        </Select>
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

export default SelectField;
