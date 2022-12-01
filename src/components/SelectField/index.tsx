import React, { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useToggle } from 'react-use';

export type SelectFieldProps = TextFieldProps;

const SelectField: FC<SelectFieldProps> = ({ ...props }) => {
  const [open, setOpen] = useToggle(false);

  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        sx: (theme) => ({
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
          ...props.InputProps?.sx,
          ...(open && {
            fieldset: {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          }),
        }),
      }}
      select
      SelectProps={{
        ...props.SelectProps,
        onOpen: (event) => {
          setOpen(true);
          return props.SelectProps?.onOpen?.(event);
        },
        onClose: (event) => {
          setOpen(false);
          return props.SelectProps?.onClose?.(event);
        },
        MenuProps: {
          ...props.SelectProps?.MenuProps,
          PaperProps: {
            ...props.SelectProps?.MenuProps?.PaperProps,
            sx: (theme) => ({
              borderRadius: `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-2px) !important',
            }),
          },
          MenuListProps: {
            ...props.SelectProps?.MenuProps?.MenuListProps,
            sx: (theme) => ({
              border: `2px solid ${theme.palette.border?.main}`,
              borderRadius: `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
            }),
          },
        },
      }}
    />
  );
};

export default SelectField;
