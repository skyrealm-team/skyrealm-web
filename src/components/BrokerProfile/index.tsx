import { FC } from "react";
import { useToggle } from "react-use";

import { Avatar, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import { useFormik } from "formik";
import * as Yup from "yup";

import InputField from "components/InputField";
import UploadPhotoDialog from "components/UploadPhotoDialog";
import useBrokerUpdateProfile from "graphql/useBrokerUpdateProfile";
import useGetImgUploadUrl from "graphql/useGetImgUploadUrl";
import useGetUserInfo from "graphql/useGetUserInfo";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  organization: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  bio: Yup.string().max(2000).required("Required"),
});

const BrokerProfile: FC = () => {
  const { data: userInfo } = useGetUserInfo();
  const { mutateAsync: getImgUploadUrl } = useGetImgUploadUrl();
  const { mutateAsync: brokerUpdateProfile } = useBrokerUpdateProfile();

  const formik = useFormik({
    initialValues: {
      ...userInfo,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.avatar) {
          const [avatar, type, imgType] =
            values.avatar?.match(/data:(image\/([^;]+));base64[^"]+/i) ?? [];
          if (avatar) {
            const res = await fetch(avatar);
            const blob = await res.blob();
            const file = new File([blob], `${Date.now()}`, { type });

            const imgUploadUrl = await getImgUploadUrl({
              imgType,
            });

            if (imgUploadUrl?.uploadUrl) {
              const res = await fetch(imgUploadUrl?.uploadUrl, {
                method: "PUT",
                body: file,
              });

              if (res.ok) {
                values.avatar = imgUploadUrl.imgUrl;
              }
            }
          }
        }
        await brokerUpdateProfile(values);
      } catch {
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const [open, toggleOpen] = useToggle(false);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={3}>
        <Stack direction="row" gap={4} alignItems="center">
          <Stack direction="row" gap={2} alignItems="center">
            <Avatar
              src={formik.values?.avatar ?? undefined}
              sx={(theme) => ({
                width: 120,
                height: 120,
                fontSize: 40,
                ...(!formik.values?.avatar && {
                  backgroundColor: theme.palette.primary.main,
                }),
              })}
            >
              {formik.values?.firstName?.[0]} {formik.values?.lastName?.[0]}
            </Avatar>
            <Typography
              sx={{
                color: "#333333",
              }}
            >
              {formik.values?.email}
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            onClick={() => {
              toggleOpen(true);
            }}
            sx={{
              width: 140,
              height: 48,
            }}
          >
            Upload Photo
          </Button>
        </Stack>
        <Stack direction="row" gap={4} alignItems="center">
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
        <Stack direction="row" gap={4} alignItems="center">
          <InputField
            label="Organization"
            value={formik.values.organization}
            onChange={formik.handleChange("organization")}
            onBlur={formik.handleBlur("organization")}
            FormHelperTextProps={{
              children:
                formik.touched.organization && formik.errors.organization,
            }}
            required
            fullWidth
          />
          <InputField
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange("phoneNumber")}
            onBlur={formik.handleBlur("phoneNumber")}
            FormHelperTextProps={{
              children: formik.touched.phoneNumber && formik.errors.phoneNumber,
            }}
            required
            fullWidth
          />
        </Stack>
        <Stack alignItems="flex-end">
          <InputField
            label="About"
            value={formik.values.bio ?? ""}
            placeholder="You can write about your past experience and skills to help connect you with landlord, tenants and investors."
            onChange={formik.handleChange("bio")}
            onBlur={formik.handleBlur("bio")}
            FormHelperTextProps={{
              children: formik.touched.bio && formik.errors.bio,
            }}
            required
            fullWidth
            multiline
            rows={6}
          />
          <Typography
            sx={{
              color: "#999999",
            }}
          >
            {formik.values.bio?.length ?? 0}/2000
          </Typography>
        </Stack>
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: 140,
            height: 48,
          }}
        >
          Save
        </Button>
      </Stack>
      <UploadPhotoDialog
        open={open}
        onClose={() => {
          toggleOpen(false);
        }}
        url={formik.values.avatar ?? undefined}
        onConfirm={(avatar) => {
          formik.handleChange("avatar")(avatar ?? "");
        }}
      />
    </form>
  );
};

export default BrokerProfile;
