import { FC } from 'react';
import { useUpdateEffect } from 'react-use';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as BackIcon } from 'assets/icons/back.svg';
import InputField from 'components/InputField';
import { useForgetPassword } from 'graphql/useForgetPassword';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('please use your corporate email').required('Required'),
});

export type ForgotPasswordDialogProps = DialogProps & {
  onBack?: () => void;
  onSuccess?: () => void;
};
const ForgotPasswordDialog: FC<ForgotPasswordDialogProps> = ({ onBack, onSuccess, ...props }) => {
  const { mutateAsync: forgetPassword } = useForgetPassword({
    onSuccess: async () => {
      onSuccess?.();
    },
    onError: ({ response }) => {
      response.errors?.forEach((error) => {
        Object.keys(formik.values).forEach((key) => {
          if (error.message.toLowerCase().includes(key)) {
            formik.setFieldError(key, error.message);
          }
        });
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    isInitialValid: false,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await forgetPassword(values);
      } catch {
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  useUpdateEffect(() => {
    formik.resetForm();
  }, [props.open]);

  return (
    <Dialog
      scroll="body"
      fullWidth
      {...props}
      PaperProps={{
        ...props.PaperProps,
        sx: (theme) => ({
          maxWidth: 710,
        }),
      }}
    >
      <IconButton
        onClick={(event) => {
          event.preventDefault();
          onBack?.();
        }}
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
        }}
      >
        <BackIcon />
      </IconButton>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            gap={3}
            sx={{
              p: 3,
            }}
          >
            <Typography
              paragraph
              sx={{
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              Forgot Password?
            </Typography>
            <Typography
              sx={{
                color: '#333',
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Enter the email address you used when you joined and we’ll send you instructions to reset your password.
              <br />
              <br />
              For security reasons, we do NOT store your password. So rest assured that we will never send your password
              via email.
            </Typography>
            <InputField
              type="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              FormHelperTextProps={{
                children: formik.touched.email && formik.errors.email,
              }}
              autoComplete="username"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid || formik.isSubmitting}
              size="large"
              fullWidth
            >
              {formik.isSubmitting ? <CircularProgress /> : <>Send Reset Instructions</>}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
