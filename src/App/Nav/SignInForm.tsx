import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStores } from 'stores/index';
import { useOnSubmit } from 'shared/hooks';
import InputField from 'components/InputField';

const SignInForm = () => {
  const { user } = useRootStores();
  const { formRef, onSubmit } = useOnSubmit(user.signIn);
  if (!user.isSignIn) {
    return null;
  }
  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <InputField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        variant="outlined"
        validate={() => {
          return '';
        }}
      />
    </form>
  );
};

export default observer(SignInForm);
