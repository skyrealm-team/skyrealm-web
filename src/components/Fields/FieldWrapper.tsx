import React, { ReactNode } from 'react';
import { FormHelperText, InputLabel } from '@mui/material';
import Create from '../Create';

interface Props {
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
  children: ReactNode;
}

const FieldWrapper = ({ className, children, label, required, error }: Props) => {
  return (
    <div className={className}>
      <InputLabel
        sx={{
          color: '#666',
          fontWeight: '700',
          fontSize: '18px',
        }}
        className="mb10"
      >
        <Create visible={!!required}>
          <span style={{ color: '#FF0000' }}>*</span>
        </Create>
        {label}
      </InputLabel>
      {children}
      <FormHelperText className="absolute" error>
        {error}
      </FormHelperText>
    </div>
  );
};

export default FieldWrapper;
