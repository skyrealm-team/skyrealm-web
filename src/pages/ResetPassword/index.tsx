import { FC } from 'react';
import { Button, CircularProgress, Dialog, DialogContent, Typography, Stack } from '@mui/material';
import InputField from 'components/InputField';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const ResetPassword: FC = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    isInitialValid: false,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);

      formik.setSubmitting(false);
    },
  });

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
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            gap={5}
            sx={{
              px: 2,
              py: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              Forgot Password?
            </Typography>
            <InputField
              label="New Password"
              placeholder="Minimum 6 characters"
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              FormHelperTextProps={{
                children: formik.errors.password,
              }}
              fullWidth
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid || formik.isSubmitting}
              size="large"
              fullWidth
            >
              {formik.isSubmitting ? <CircularProgress /> : <>Reset Password</>}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassword;
