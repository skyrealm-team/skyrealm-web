import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { Variant, Color, Size } from 'shared/enums';
import { useRootStores } from 'stores';

const LoginButtons = () => {
  const { user } = useRootStores();
  return (
    <div>
      <Button color={Color.primary} onClick={user.openSignIn} variant={Variant.outlined} size={Size.lg}>
        Sign in
      </Button>
      <Button
        className="ml30"
        color={Color.primary}
        onClick={user.openSignUp}
        variant={Variant.contained}
        size={Size.lg}
      >
        Sign up
      </Button>
    </div>
  );
};

export default observer(LoginButtons);
