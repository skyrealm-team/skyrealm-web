import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { Variant, Color, Size } from 'shared/enums';
import { useRootStores } from 'stores';

const LoginButtons = () => {
  const { profileStore } = useRootStores();
  return (
    <div>
      <Button color={Color.primary} onClick={profileStore.openSignIn} variant={Variant.outlined} size={Size.md}>
        Sign in
      </Button>
      <Button
        className="ml30"
        color={Color.primary}
        onClick={profileStore.openSignUp}
        variant={Variant.contained}
        size={Size.md}
      >
        Sign up
      </Button>
    </div>
  );
};

export default observer(LoginButtons);
