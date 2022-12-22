import { FC } from "react";
import { useUpdateEffect } from "react-use";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import BackIcon from "assets/icons/back.svg";
import InputField from "components/InputField";
import { useForgetPassword } from "graphql/useForgetPassword";
import useOpens from "hooks/useOpens";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("please use your corporate email")
    .required("Required"),
});

export type ForgotPasswordDialogProps = Omit<DialogProps, "open">;
const ForgotPasswordDialog: FC<ForgotPasswordDialogProps> = ({ ...props }) => {
  const [opens, setOpens] = useOpens();

  const { mutateAsync: forgetPassword } = useForgetPassword({
    onSuccess: async () => {
      setOpens({
        ...opens,
        forgotPasswordDialog: false,
      });
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
      email: "",
    },
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
  }, [opens.forgotPasswordDialog]);

  return (
    <Dialog
      scroll="body"
      fullWidth
      {...props}
      open={opens.forgotPasswordDialog}
      PaperProps={{
        ...props.PaperProps,
        sx: {
          maxWidth: 710,
        },
      }}
    >
      <IconButton
        onClick={(event) => {
          event.preventDefault();
          setOpens({
            ...opens,
            signinDialog: true,
            forgotPasswordDialog: false,
          });
        }}
        sx={{
          position: "absolute",
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
                color: "#333",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
              <br />
              <br />
              For security reasons, we do NOT store your password. So rest
              assured that we will never send your password via email.
            </Typography>
            <InputField
              type="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
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
              fullWidth
              sx={{
                height: 70,
              }}
            >
              {formik.isSubmitting ? (
                <CircularProgress />
              ) : (
                <>Send Reset Instructions</>
              )}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
