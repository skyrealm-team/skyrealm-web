import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStores } from 'stores/index';
import { useFormElements, useListenElements, useOnSubmit, useValidateForm } from 'shared/hooks';
import { REGISTER_INPUT, REGISTER } from 'graphql/login';
import { InputField } from 'components/Fields';
import { User } from 'graphql/commonTypes';
import { LOCAL_STORE_KEY, saveToLocalStorage } from 'shared/utils/localStorage';
import { Size, Variant } from 'shared/enums';
import AsyncButton from 'components/AsyncButton';
import graphqlClient from 'graphql/client';
import { validateEmail, validatePassword } from 'shared/utils/validate';
import { IconButton, InputAdornment } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useToggle } from 'react-use';

const useAction = (setErrorText: (errorText: string) => void) => {
  const { profileStore } = useRootStores();
  return useCallback(
    async (formFields: REGISTER_INPUT) => {
      try {
        const { data } = await graphqlClient.mutate<User, REGISTER_INPUT>({
          mutation: REGISTER,
          variables: formFields,
        });
        profileStore.setProfile(data || null);
        saveToLocalStorage(LOCAL_STORE_KEY.accessToken, data?.authToken);
      } catch (e: any) {
        setErrorText(String(e.message));
      }
    },
    [profileStore, setErrorText],
  );
};

const SignInForm = () => {
  const { profileStore } = useRootStores();
  const [isViewPassword, toggleViewPassword] = useToggle(false);
  const [errorText, setErrorText] = useState<string>('');
  const action = useAction(setErrorText);
  const { formRef, onSubmit } = useOnSubmit<REGISTER_INPUT>(action);
  const elements = useFormElements(formRef);
  const clearErrorText = useCallback(() => {
    setErrorText('');
  }, []);
  useListenElements(elements, clearErrorText);
  const isValid = useValidateForm(elements);
  if (!profileStore.isSignIn) {
    return null;
  }
  return (
    <form
      ref={formRef}
      onSubmit={() => {
        return false;
      }}
    >
      <InputField
        className="mt40"
        label="Email"
        autoComplete="username"
        name="email"
        type="email"
        placeholder="Corporate email only"
        validate={validateEmail}
      />
      <InputField
        className="mt30"
        label="Password"
        autoComplete="current-password"
        name="password"
        type={isViewPassword ? 'text' : 'password'}
        placeholder="Minimum 6 characters"
        validate={validatePassword}
        errorText={errorText}
        endAdornment={
          <InputAdornment position="start">
            <IconButton
              size={Size.sm}
              aria-label="toggle password visibility"
              onClick={toggleViewPassword}
              edge="end"
              sx={{ right: '20px' }}
            >
              {isViewPassword ? (
                <VisibilityOffOutlined className="gray-main f20" />
              ) : (
                <VisibilityOutlined className="gray-main f20" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      <AsyncButton
        disabled={!!errorText || !isValid}
        className="mt50"
        fullWidth
        variant={Variant.contained}
        size={Size.lg}
        onClick={onSubmit}
      >
        Sign in
      </AsyncButton>
    </form>
  );
};

export default observer(SignInForm);
