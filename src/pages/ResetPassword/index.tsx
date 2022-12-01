import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import InputField from 'components/InputField';

const ResetPassword: FC = () => {
  return (
    <Dialog
      open
      fullWidth
      hideBackdrop
      PaperProps={{
        elevation: 0,
        sx: (theme) => ({
          maxWidth: 710,
          borderRadius: theme.spacing(1),
        }),
      }}
      sx={(theme) => ({
        zIndex: theme.zIndex.appBar - 1,
      })}
    >
      <DialogTitle>
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          Forgot Password?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <InputField label="New Password" placeholder="Minimum 6 characters" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" fullWidth>
          Reset Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPassword;
