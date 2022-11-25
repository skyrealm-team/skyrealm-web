import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStores } from 'stores/index';
import { useFormElements, useOnSubmit, useValidateForm } from 'shared/hooks';
import { LOGIN, LOGIN_INPUT, LOGIN_RESULT } from 'graphql/login';
import { InputField } from 'components/Fields';
import { Size, Variant } from 'shared/enums';
import AsyncButton from 'components/AsyncButton';
import { validateEmail, validatePassword } from 'shared/utils/validate';
import { IconButton, InputAdornment } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useToggle } from 'react-use';
import { queryWithMessage } from 'shared/utils/graphql';
import Message from 'components/Message';

const useAction = () => {
  const { profileStore } = useRootStores();
  return useCallback(
    async (formFields: LOGIN_INPUT) => {
      const { data } = await queryWithMessage<LOGIN_RESULT, LOGIN_INPUT>({
        query: LOGIN,
        variables: formFields,
      });
      profileStore.setProfile(data.login);
      profileStore.closeLoginDialog();
      Message.success('Sign in successful');
    },
    [profileStore],
  );
};

const SignInForm = () => {
  const { profileStore } = useRootStores();
  const [isViewPassword, toggleViewPassword] = useToggle(false);
  const action = useAction();
  const { formRef, onSubmit } = useOnSubmit<LOGIN_INPUT>(action);
  const elements = useFormElements(formRef);
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
        disabled={!isValid}
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
