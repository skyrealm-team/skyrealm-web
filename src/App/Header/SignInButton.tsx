import React, { FC } from 'react';
import { Button } from '@mui/material';
import { useToggle } from 'react-use';
import SignInDialog from 'components/SignInDialog';
import ForgotPasswordDialog from 'components/ForgotPasswordDialog';

const SignInButton: FC = () => {
  const [signInOpen, setSignInOpen] = useToggle(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useToggle(false);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setSignInOpen(true);
        }}
        size="small"
      >
        Sign in
      </Button>
      <SignInDialog
        open={signInOpen}
        onClose={() => {
          setSignInOpen(false);
        }}
        onSuccess={() => {
          setSignInOpen(false);
        }}
        onForgotPassword={() => {
          setForgotPasswordOpen(true);
          setSignInOpen(false);
        }}
      />
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onBack={() => {
          setSignInOpen(true);
          setForgotPasswordOpen(false);
        }}
        onSuccess={() => {
          setForgotPasswordOpen(false);
        }}
      />
    </>
  );
};

export default SignInButton;
