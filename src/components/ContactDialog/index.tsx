import { FC } from "react";
import { useUpdateEffect } from "react-use";

import { useRouter } from "next/router";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useFormik } from "formik";
import { merge } from "lodash";
import * as Yup from "yup";

import CloseIcon from "assets/icons/close.svg";
import InputField from "components/InputField";
import PropertyHeader from "components/PropertyHeader";
import useContactBroker from "graphql/useContactBroker";
import useGetUserInfo from "graphql/useGetUserInfo";
import useOpens from "hooks/useOpens";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string()
    .email("please use your corporate email")
    .required("Required"),
  company: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});

export type ContactDialogProps = DialogProps & {
  listing?: Maybe<SingleListing>;
};

const ContactDialog: FC<ContactDialogProps> = ({ listing, open, ...props }) => {
  const router = useRouter();
  const { lid } = router.query;

  const upSM = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  const { data: userInfo } = useGetUserInfo();
  const { mutateAsync: contactBroker } = useContactBroker();

  const formik = useFormik<MutationContactBrokerArgs>({
    initialValues: {
      listingId: String(lid),
      firstName: userInfo?.firstName ?? "",
      lastName: userInfo?.lastName ?? "",
      email: userInfo?.email ?? "",
      phone: userInfo?.phoneNumber ?? "",
      company: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await contactBroker(values);

        props.onClose?.({}, "backdropClick");
      } catch {
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  const [opens, setOpens] = useOpens();

  useUpdateEffect(() => {
    formik.resetForm();
  }, [open]);

  useUpdateEffect(() => {
    if (userInfo) {
      const { firstName, lastName, email } = userInfo;

      formik.setValues(
        merge(formik.values, {
          firstName,
          lastName,
          email,
        })
      );
    }
  }, [userInfo]);

  return (
    <Dialog
      scroll="body"
      fullScreen={!upSM}
      fullWidth
      {...props}
      open={open && !opens.signinDialog}
      PaperProps={{
        ...props.PaperProps,
        sx: {
          maxWidth: 710,
          ...props.PaperProps?.sx,
        },
      }}
    >
      <DialogTitle>
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Request Information
        </Typography>
        <IconButton
          onClick={(event) => {
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
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={3}>
            <PropertyHeader listing={listing} />
            {!userInfo && (
              <Typography
                align="center"
                sx={{
                  fontWeight: 700,
                }}
              >
                Already a memeber?{" "}
                <Link
                  underline="always"
                  onClick={() => {
                    setOpens({
                      ...opens,
                      signinDialog: true,
                    });
                  }}
                >
                  Log In
                </Link>
              </Typography>
            )}
            <Stack direction="row" gap={2}>
              <InputField
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
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
            <InputField
              label="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange("phone")}
              onBlur={formik.handleBlur("phone")}
              FormHelperTextProps={{
                children: formik.touched.phone && formik.errors.phone,
              }}
              autoComplete="tel"
              required
              fullWidth
            />
            <InputField
              type="email"
              label="Email"
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
              label="Company"
              value={formik.values.company}
              onChange={formik.handleChange("company")}
              onBlur={formik.handleBlur("company")}
              FormHelperTextProps={{
                children: formik.touched.company && formik.errors.company,
              }}
              required
              fullWidth
            />
            <InputField
              label="Message"
              value={formik.values.message}
              placeholder="Please send me additional information about this property"
              onChange={formik.handleChange("message")}
              onBlur={formik.handleBlur("message")}
              FormHelperTextProps={{
                children: formik.touched.message && formik.errors.message,
              }}
              fullWidth
              multiline
              rows={3}
              required
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid || formik.isSubmitting}
              fullWidth
              sx={{
                height: 70,
              }}
            >
              {formik.isSubmitting ? <CircularProgress /> : <>Submit Request</>}
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
