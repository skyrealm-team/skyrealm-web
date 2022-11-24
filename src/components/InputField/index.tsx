import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface HTMLValidateInputElement extends HTMLInputElement {
  validate: () => boolean;
}

interface InputFieldProps {
  validate: (value: string) => string;
}

type Props = TextFieldProps & InputFieldProps;

const InputField = ({ validate, ...restProps }: Props) => {
  const inputRef = useRef<HTMLValidateInputElement | null>(null);
  const [errorText, setErrorText] = useState('');
  const [value, setValue] = useState('');

  const checkValidate = useCallback(() => {
    const nextErrorText = validate(value);
    setErrorText(nextErrorText);
    return !!nextErrorText;
  }, [validate, value]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.validate = checkValidate;
    }
  }, [checkValidate]);

  const onBlur = useCallback(() => {
    checkValidate();
  }, [checkValidate]);
  return (
    <TextField
      ref={inputRef}
      error={!!errorText}
      helperText={errorText}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.currentTarget.value);
      }}
      value={value}
      {...restProps}
    />
  );
};

export default InputField;
