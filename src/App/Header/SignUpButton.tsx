import React, { FC } from 'react';
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { useCounter, useInterval, useToggle, useUpdateEffect } from 'react-use';
import SignUpDialog from 'components/SignUpDialog';
import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg';

const SignUpButton: FC = () => {
  const [open, setOpen] = useToggle(false);
  const [success, setSuccess] = useToggle(false);

  const [count, { inc, reset }] = useCounter(0);
  const [isRunning, toggleIsRunning] = useToggle(true);

  useInterval(
    () => {
      inc(1);
    },
    isRunning ? 1000 : null,
  );

  useUpdateEffect(() => {
    if (count >= 3) {
      setSuccess(false);
      reset();
      toggleIsRunning(false);
    }
  }, [count]);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
        size="small"
      >
        Sign up
      </Button>
      <SignUpDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSuccess={() => {
          setOpen(false);
          setSuccess(true);
          toggleIsRunning(true);
        }}
      />
      <Dialog
        open={success}
        fullWidth
        PaperProps={{
          sx: (theme) => ({
            maxWidth: 420,
          }),
        }}
      >
        <DialogContent>
          <Stack
            alignItems="center"
            gap={3}
            sx={{
              py: 3,
            }}
          >
            <SuccessIcon />
            <Typography>Successfully</Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUpButton;
