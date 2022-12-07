import { FC } from "react";

import { useRouter } from "next/router";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import InputField from "components/InputField";
import useResetForgetPassword from "graphql/useResetForgetPassword";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  resetToken: Yup.string().uuid().required(),
});

const ResetPassword: FC = () => {
  const router = useRouter();
  const { token } = router.query;

  const { mutateAsync: resetForgetPassword } = useResetForgetPassword();

  const formik = useFormik({
    initialValues: {
      password: "",
      resetToken: String(token),
    },
    isInitialValid: false,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await resetForgetPassword(values);
      } catch {
      } finally {
        formik.setSubmitting(false);
        router.replace("/");
      }
    },
  });

  return (
    <Dialog
      open
      scroll="body"
      fullWidth
      hideBackdrop
      PaperProps={{
        elevation: 0,
        sx: (theme) => ({
          maxWidth: 710,
        }),
      }}
      sx={(theme) => ({
        zIndex: theme.zIndex.appBar - 1,
      })}
    >
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            gap={2}
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
            <InputField
              label="New Password"
              placeholder="Minimum 6 characters"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              FormHelperTextProps={{
                children: formik.touched.password && formik.errors.password,
              }}
              autoComplete="current-password"
              fullWidth
            />
            <br />
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
