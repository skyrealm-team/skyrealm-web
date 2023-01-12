import { FC } from "react";
import Dropzone from "react-dropzone";
import { useToggle } from "react-use";

import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

import { useFormik } from "formik";
import * as Yup from "yup";

import AddButtonIcon from "assets/icons/add-button.svg";
import RemoveCircleIcon from "assets/icons/remove-circle.svg";
import FieldLabel from "components/FieldLabel";
import InputField from "components/InputField";
import UploadPhotoDialog from "components/UploadPhotoDialog";
import useBrokerUpdateProfile from "graphql/useBrokerUpdateProfile";
import useGetImgUploadUrl from "graphql/useGetImgUploadUrl";
import useGetUserInfo, { useSetUserInfoData } from "graphql/useGetUserInfo";
import base64ToFile from "utils/base64ToFile";
import uploadFile from "utils/uploadFile";

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
  const { mutateAsync: brokerUpdateProfile } = useBrokerUpdateProfile({
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
  const setUserInfoDate = useSetUserInfoData();

  const formik = useFormik({
    initialValues: {
      ...userInfo,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await Promise.allSettled([
          Promise.resolve().then(async () => {
            if (values.avatar) {
              const file = await base64ToFile(values.avatar);

              if (file) {
                const [, imgType] =
                  values.avatar?.match(/data:image\/([^;]+);base64[^"]+/i) ??
                  [];

                const imgUploadUrl = await getImgUploadUrl({
                  imgType,
                });

                if (imgUploadUrl?.uploadUrl) {
                  const ok = await uploadFile(imgUploadUrl?.uploadUrl, file);

                  if (ok) {
                    values.avatar = imgUploadUrl?.imgUrl;
                  }
                }
              }
            }
          }),
          Promise.resolve().then(async () => {
            if (values.organizationAvatar) {
              const file = await base64ToFile(values.organizationAvatar);

              if (file) {
                const [, imgType] =
                  values.organizationAvatar?.match(
                    /data:image\/([^;]+);base64[^"]+/i
                  ) ?? [];

                const imgUploadUrl = await getImgUploadUrl({
                  imgType,
                });

                if (imgUploadUrl?.uploadUrl) {
                  const ok = await uploadFile(imgUploadUrl?.uploadUrl, file);
                  if (ok) {
                    values.organizationAvatar = imgUploadUrl?.imgUrl;
                  }
                }
              }
            }
          }),
        ]);

        await brokerUpdateProfile(values);
        setUserInfoDate(values);
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
        <Stack gap={1} alignItems="flex-start">
          <FieldLabel>Organization Logo</FieldLabel>
          {!!formik.values.organizationAvatar ? (
            <Stack
              sx={{
                position: "relative",
              }}
            >
              <Avatar
                src={formik.values.organizationAvatar}
                variant="rounded"
                sx={{
                  width: 220,
                  height: 220,
                }}
              />
              <IconButton
                onClick={() => {
                  formik.handleChange("organizationAvatar")("");
                }}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <RemoveCircleIcon />
              </IconButton>
            </Stack>
          ) : (
            <Dropzone
              accept={{
                "image/jpeg": [],
                "image/png": [],
              }}
              maxSize={1024 * 1024 * 20}
              multiple={false}
              onDrop={([file]) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  if (reader.result) {
                    formik.handleChange("organizationAvatar")(
                      reader.result?.toString()
                    );
                  }
                };
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <Card
                  {...getRootProps()}
                  elevation={0}
                  sx={{
                    width: 220,
                    height: 220,
                    border: "2px dashed #3056D3",
                    borderRadius: 2.5,
                    position: "relative",
                  }}
                >
                  <CardActionArea
                    sx={{
                      height: "100%",
                    }}
                  >
                    <Stack
                      gap={2}
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        height: "100%",
                        background: "#F0F0F0",
                        p: 1,
                      }}
                    >
                      <AddButtonIcon />
                      <Typography
                        align="center"
                        sx={{
                          color: "#999999",
                          fontSize: 14,
                        }}
                      >
                        jpg/png format RGB mode, maximum 20M
                      </Typography>
                      <input {...getInputProps()} />
                    </Stack>
                  </CardActionArea>
                </Card>
              )}
            </Dropzone>
          )}
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
          disabled={!formik.isValid || formik.isSubmitting}
          sx={{
            width: 140,
            height: 48,
          }}
        >
          {formik.isSubmitting ? <CircularProgress /> : <>Save</>}
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
