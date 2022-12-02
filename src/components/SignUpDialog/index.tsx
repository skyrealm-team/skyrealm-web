import React, { FC, useState } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  FormControlLabel,
  IconButton,
  Link,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from 'components/InputField';
import useRegister from 'graphql/useRegister';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { useToggle, useUpdateEffect } from 'react-use';
import SelectField from 'components/SelectField';
import { TermsOfService, PrivacyPolicy } from 'constants/links';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  organization: Yup.string().required('Required'),
  phoneNumber: Yup.string(),
  userType: Yup.string().required('Required'),
  email: Yup.string().email('please use your corporate email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

export type SignUpDialogProps = DialogProps & {
  onSuccess?: () => void;
};
const SignUpDialog: FC<SignUpDialogProps> = ({ onSuccess, ...props }) => {
  const { mutateAsync: register } = useRegister({
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
      firstName: '',
      lastName: '',
      organization: '',
      phoneNumber: '',
      userType: '',
      email: '',
      password: '',
    },
    isInitialValid: false,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await register(values);
      } catch {
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const [userType, setUserType] = useState('');
  const [checked, setChecked] = useToggle(false);

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
            <Stack direction="row" gap={2}>
              <InputField
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange('firstName')}
                onBlur={formik.handleBlur('firstName')}
                FormHelperTextProps={{
                  children: formik.touched.firstName && formik.errors.firstName,
                }}
                autoComplete="given-name"
                required
                fullWidth
              />
              <InputField
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange('lastName')}
                onBlur={formik.handleBlur('lastName')}
                FormHelperTextProps={{
                  children: formik.touched.lastName && formik.errors.lastName,
                }}
                autoComplete="family-name"
                required
                fullWidth
              />
            </Stack>
            <Stack direction="row" gap={2}>
              <InputField
                label="Organization"
                value={formik.values.organization}
                onChange={formik.handleChange('organization')}
                onBlur={formik.handleBlur('organization')}
                FormHelperTextProps={{
                  children: formik.touched.organization && formik.errors.organization,
                }}
                autoComplete="organization"
                required
                fullWidth
              />
              <InputField
                label="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange('phoneNumber')}
                onBlur={formik.handleBlur('phoneNumber')}
                FormHelperTextProps={{
                  children: formik.touched.phoneNumber && formik.errors.phoneNumber,
                }}
                autoComplete="tel"
                fullWidth
              />
            </Stack>
            <Stack direction="row" gap={2}>
              <SelectField
                label="What best describes you"
                value={userType}
                onChange={(event) => {
                  setUserType(event.target?.value);
                  formik.setFieldValue('userType', event.target.value !== 'Others' ? event.target.value : '');
                }}
                onBlur={formik.handleBlur('userType')}
                FormHelperTextProps={{
                  children: userType !== 'Others' && formik.touched.userType && formik.errors.userType,
                }}
                required
                fullWidth
              >
                {[
                  {
                    key: 'Broker',
                    value: 'Broker',
                  },
                  {
                    key: 'Tenant',
                    value: 'Tenant',
                  },
                  {
                    key: 'Landlord',
                    value: 'Landlord',
                  },
                  {
                    key: 'Real Estate Fund',
                    value: 'Real Estate Fund',
                  },
                  {
                    key: 'Others',
                    value: 'Others',
                  },
                ].map(({ key, value }) => (
                  <MenuItem key={key} value={value}>
                    {key}
                  </MenuItem>
                ))}
              </SelectField>
              {userType === 'Others' && (
                <InputField
                  label={<br />}
                  placeholder="Please specify"
                  value={formik.values.userType}
                  onChange={formik.handleChange('userType')}
                  onBlur={formik.handleBlur('userType')}
                  fullWidth
                />
              )}
            </Stack>
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
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={checked}
                  onChange={(event, checked) => {
                    setChecked(checked);
                  }}
                />
              }
              label={
                <Typography color="#999999">
                  Creating an account means you’re okay with our{' '}
                  <Link color="primary" href={TermsOfService}>
                    Terms of Service
                  </Link>
                  ,{' '}
                  <Link color="primary" href={PrivacyPolicy}>
                    Privacy Policy
                  </Link>
                  , and our default <Link color="primary">Notification Settings</Link>.
                </Typography>
              }
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid || formik.isSubmitting || !checked}
              size="large"
              fullWidth
            >
              {formik.isSubmitting ? <CircularProgress /> : <>Sign up</>}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
