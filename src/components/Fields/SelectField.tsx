import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SelectProps, Select, SelectChangeEvent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import cx from 'classnames';
import FieldWrapper from './FieldWrapper';
import styles from './SelectedField.module.scss';

interface HTMLValidateInputElement extends HTMLInputElement {
  validate: () => boolean;
}

interface SelectFieldProps {
  validate: (value: string, label: string) => string;
  label: string;
}

type Props = SelectProps<string> & SelectFieldProps;

const SelectField = ({
  onChange,
  value: outerValue,
  validate,
  className,
  label,
  required,
  ...restInputProps
}: Props) => {
  const selectWrapperRef = useRef<HTMLElement | null>(null);
  const [innerValue, setValue] = useState('');
  const [innerError, setError] = useState('');
  const value = outerValue || innerValue;

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
    if (selectWrapperRef.current) {
      const selected = selectWrapperRef.current?.getElementsByTagName('input')[0] as HTMLValidateInputElement;
      selected.validate = checkValidate;
    }
  }, [checkValidate]);

  return (
    <FieldWrapper
      error={innerError}
      label={label}
      required={required}
      className={cx(styles.wrapper, className, !!innerError && styles.wrapperError)}
    >
      <Select
        ref={selectWrapperRef}
        fullWidth
        value={value}
        onChange={(e: SelectChangeEvent<string>, child: React.ReactNode) => {
          setError('');
          onChange?.(e, child);
          setValue(String(e.target.value));
        }}
        sx={{
          height: '60px',
          borderRadius: '10px',
        }}
        {...restInputProps}
        IconComponent={(props) => {
          return (
            <ExpandMoreIcon
              className={props.className}
              sx={{
                color: '#7065F0',
                background: '#F0EFFB',
                borderRadius: '50%',
                fontSize: '20px',
                right: '15px !important',
              }}
            />
          );
        }}
      />
    </FieldWrapper>
  );
};

export default SelectField;
