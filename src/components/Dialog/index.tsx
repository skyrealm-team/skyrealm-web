import React from 'react';
import { Dialog as MuiDialog, DialogProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props extends DialogProps {
  onClose(): void;
}

const Dialog = ({ onClose, children, ...restProps }: Props) => {
  return (
    <MuiDialog onClose={onClose} {...restProps}>
      {children}
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MuiDialog>
  );
};

export default Dialog;
