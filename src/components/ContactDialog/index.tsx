import { FC } from "react";
import { useUpdateEffect } from "react-use";

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
  Typography,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import CloseIcon from "assets/icons/close.svg";
import LocationIcon from "assets/icons/location.svg";
import InputField from "components/InputField";
import useOpen from "hooks/useOpen";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string()
    .email("please use your corporate email")
    .required("Required"),
  company: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});

export type ContactDialogProps = DialogProps & {
  listing?: SingleListing;
};

const ContactDialog: FC<ContactDialogProps> = ({ ...props }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: "",
    },
    validationSchema,
    onSubmit: async () => {
      try {
      } catch {
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  const [open, setOpen] = useOpen();

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
        <Stack gap={3}>
          <Stack
            alignItems="center"
            gap={1}
            sx={{
              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              270 W 43rd St, New York, NY 100
            </Typography>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <LocationIcon />
              <Typography
                sx={{
                  color: "#999999",
                }}
              >
                Washington Square, New York, NY 10012
              </Typography>
            </Stack>
          </Stack>
          <Typography
            align="center"
            sx={{
              fontWeight: 700,
            }}
          >
            Already a memeber?{" "}
            <Link
              underline="always"
              onClick={(event) => {
                props.onClose?.(event, "backdropClick");
                setOpen({
                  ...open,
                  signinDialog: true,
                });
              }}
            >
              Log In
            </Link>
          </Typography>
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
              fullWidth
            />
          </Stack>
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
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
