import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input, InputProps } from '@mui/material';
import cx from 'classnames';
import FieldWrapper from './FieldWrapper';
import styles from './InputField.module.scss';

interface HTMLValidateInputElement extends HTMLInputElement {
  validate: () => boolean;
}

interface InputFieldProps {
  validate: (value: string, label: string) => string;
  label?: string;
  errorText?: string;
}

type Props = InputProps & InputFieldProps;

const InputField = ({ errorText, className, validate, label, required, ...restInputProps }: Props) => {
  const inputWrapperRef = useRef<HTMLElement | null>(null);
  const [innerError, setError] = useState('');
  const [value, setValue] = useState('');
  const error = errorText || innerError;

  const checkValidate = useCallback(
    (needSetError = true) => {
      const nextErrorText = validate(value, String(label));
      if (needSetError) {
        setError(nextErrorText);
      }
      return !nextErrorText;
    },
    [validate, value, label],
  );

  useEffect(() => {
    if (inputWrapperRef.current) {
      const input = inputWrapperRef.current?.getElementsByTagName('input')[0] as HTMLValidateInputElement;
      input.validate = checkValidate;
    }
  }, [checkValidate]);

  const onBlur = useCallback(() => {
    checkValidate();
  }, [checkValidate]);
  return (
    <FieldWrapper error={error} label={label} required={required} className={className}>
      <Input
        classes={{ root: cx(styles.root, error && styles.rootError), input: styles.input }}
        fullWidth
        ref={inputWrapperRef}
        value={value}
        onBlur={onBlur}
        onChange={(e) => {
          setError('');
          setValue(e.currentTarget.value);
        }}
        {...restInputProps}
      />
    </FieldWrapper>
  );
};

export default InputField;
