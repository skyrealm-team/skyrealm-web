import { FC } from "react";
import { useUpdateEffect } from "react-use";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  Link,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import CloseIcon from "assets/icons/close.svg";
import InputField from "components/InputField";
import useLogin from "graphql/useLogin";
import useOpens from "hooks/useOpens";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("please use your corporate email")
    .required("Required"),
  password: Yup.string().required("Required"),
});

export type SignInDialogProps = Omit<DialogProps, "open">;
const SignInDialog: FC<SignInDialogProps> = ({ ...props }) => {
  const upSM = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  const [opens, setOpens] = useOpens();

  const { mutateAsync: login } = useLogin({
    onSuccess: async () => {
      setOpens({
        ...opens,
        signinDialog: false,
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
      password: "",
    },
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
  }, [opens.signinDialog]);

  return (
    <Dialog
      scroll="body"
      fullScreen={!upSM}
      fullWidth
      {...props}
      open={opens.signinDialog}
      onClose={(event, reason) => {
        setOpens({
          ...opens,
          signinDialog: false,
        });
        props.onClose?.(event, reason);
      }}
      PaperProps={{
        ...props.PaperProps,
        sx: {
          maxWidth: 710,
          ...props.PaperProps?.sx,
        },
      }}
    >
      <IconButton
        onClick={(event) => {
          setOpens({
            ...opens,
            signinDialog: false,
          });
          props.onClose?.(event, "backdropClick");
        }}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack alignItems="center" gap={3}>
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
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
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
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              FormHelperTextProps={{
                children: formik.touched.password && formik.errors.password,
              }}
              autoComplete="current-password"
              fullWidth
            />
            <Typography variant="button">
              <Link
                type="button"
                align="center"
                onClick={(event) => {
                  event.preventDefault();
                  setOpens({
                    ...opens,
                    signinDialog: false,
                    signupDialog: true,
                  });
                }}
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Sign up
              </Link>{" "}
              here if you don't have an account yet.
            </Typography>
            <Link
              type="button"
              align="center"
              onClick={(event) => {
                event.preventDefault();
                setOpens({
                  ...opens,
                  signinDialog: false,
                  forgotPasswordDialog: true,
                });
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
              fullWidth
              sx={{
                height: 70,
              }}
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
