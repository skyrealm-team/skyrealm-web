import React, { FC } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateEffect } from 'react-use';
import InputField from 'components/InputField';
import useLogin from 'graphql/useLogin';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('please use your corporate email').required('Required'),
  password: Yup.string().required('Required'),
});

export type SignInDialogProps = DialogProps & {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
};
const SignInDialog: FC<SignInDialogProps> = ({ onSuccess, onForgotPassword, ...props }) => {
  const { mutateAsync: login } = useLogin({
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
      password: '',
    },
    isInitialValid: false,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
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
          props.onClose?.(event, 'backdropClick');
        }}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
        }}
      >
        <CloseIcon />
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
              Welcome Skyrealm!
            </Typography>
            <InputField
              type="email"
              label="Email"
              placeholder="Corporate email only"
              value={formik.values.email}
              onChange={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              FormHelperTextProps={{
                children: formik.touched.email && formik.errors.email,
              }}
              autoComplete="username"
              fullWidth
            />
            <InputField
              type="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              FormHelperTextProps={{
                children: formik.touched.password && formik.errors.password,
              }}
              autoComplete="current-password"
              fullWidth
            />
            <Link
              component="button"
              type="button"
              align="center"
              onClick={(event) => {
                event.preventDefault();
                onForgotPassword?.();
              }}
              sx={{
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Forgot Password?
            </Link>
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid || formik.isSubmitting}
              size="large"
              fullWidth
            >
              {formik.isSubmitting ? <CircularProgress /> : <>Sign in</>}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
