import { FC, useState } from "react";
import { useCounter, useInterval, useToggle, useUpdateEffect } from "react-use";

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
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import CloseIcon from "assets/icons/close.svg";
import SuccessIcon from "assets/icons/success.svg";
import InputField from "components/InputField";
import SelectField from "components/SelectField";
import { PrivacyPolicy, TermsOfService } from "consts/links";
import useRegister from "graphql/useRegister";
import useOpens from "hooks/useOpens";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  organization: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  userType: Yup.string().required("Required"),
  email: Yup.string()
    .email("please use your corporate email")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export type SignUpDialogProps = Omit<DialogProps, "open">;
const SignUpDialog: FC<SignUpDialogProps> = ({ ...props }) => {
  const [opens, setOpens] = useOpens();

  const [success, setSuccess] = useToggle(false);
  const [count, { inc, reset }] = useCounter(0);
  const [isRunning, toggleIsRunning] = useToggle(true);

  const { mutateAsync: register } = useRegister({
    onSuccess: async () => {
      setOpens({
        ...opens,
        signupDialog: false,
      });
      setSuccess();
      toggleIsRunning(true);
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
      firstName: "",
      lastName: "",
      organization: "",
      phoneNumber: "",
      userType: "",
      email: "",
      password: "",
    },
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

  const [userType, setUserType] = useState("");
  const [checked, setChecked] = useToggle(false);

  useUpdateEffect(() => {
    formik.resetForm();
  }, [opens.signupDialog]);

  useInterval(
    () => {
      inc(1);
    },
    isRunning ? 1000 : null
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
      <Dialog
        scroll="body"
        fullWidth
        {...props}
        open={opens.signupDialog}
        onClose={(event, reason) => {
          setOpens({
            ...opens,
            signupDialog: false,
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
              signupDialog: false,
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
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  FormHelperTextProps={{
                    children:
                      formik.touched.firstName && formik.errors.firstName,
                  }}
                  autoComplete="given-name"
                  required
                  fullWidth
                />
                <InputField
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
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
                  onChange={formik.handleChange("organization")}
                  onBlur={formik.handleBlur("organization")}
                  FormHelperTextProps={{
                    children:
                      formik.touched.organization && formik.errors.organization,
                  }}
                  autoComplete="organization"
                  required
                  fullWidth
                />
                <InputField
                  label="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange("phoneNumber")}
                  onBlur={formik.handleBlur("phoneNumber")}
                  FormHelperTextProps={{
                    children:
                      formik.touched.phoneNumber && formik.errors.phoneNumber,
                  }}
                  autoComplete="tel"
                  required
                  fullWidth
                />
              </Stack>
              <Stack direction="row" gap={2}>
                <SelectField
                  label="What best describes you"
                  value={userType}
                  onChange={(event) => {
                    setUserType(event.target?.value);
                    formik.setFieldValue(
                      "userType",
                      event.target.value !== "Others" ? event.target.value : ""
                    );
                  }}
                  onBlur={formik.handleBlur("userType")}
                  FormHelperTextProps={{
                    children:
                      userType !== "Others" &&
                      formik.touched.userType &&
                      formik.errors.userType,
                  }}
                  required
                  fullWidth
                >
                  {[
                    {
                      key: "Broker",
                      value: "Broker",
                    },
                    {
                      key: "Tenant",
                      value: "Tenant",
                    },
                    {
                      key: "Landlord",
                      value: "Landlord",
                    },
                    {
                      key: "Real Estate Fund",
                      value: "Real Estate Fund",
                    },
                    {
                      key: "Others",
                      value: "Others",
                    },
                  ].map(({ key, value }) => (
                    <MenuItem key={key} value={value}>
                      {key}
                    </MenuItem>
                  ))}
                </SelectField>
                {userType === "Others" && (
                  <InputField
                    label={<br />}
                    placeholder="Please specify"
                    value={formik.values.userType}
                    onChange={formik.handleChange("userType")}
                    onBlur={formik.handleBlur("userType")}
                    fullWidth
                  />
                )}
              </Stack>
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
                required
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
                required
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
                    Creating an account means you’re okay with our{" "}
                    <Link color="primary" href={TermsOfService}>
                      Terms of Service
                    </Link>
                    ,{" "}
                    <Link color="primary" href={PrivacyPolicy}>
                      Privacy Policy
                    </Link>
                    , and our default{" "}
                    <Link color="primary">Notification Settings</Link>.
                  </Typography>
                }
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!formik.isValid || formik.isSubmitting || !checked}
                fullWidth
                sx={{
                  height: 70,
                }}
              >
                {formik.isSubmitting ? <CircularProgress /> : <>Sign up</>}
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={success}
        fullWidth
        PaperProps={{
          sx: {
            maxWidth: 420,
          },
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

export default SignUpDialog;
