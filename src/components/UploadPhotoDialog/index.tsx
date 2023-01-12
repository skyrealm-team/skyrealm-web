import { FC, useState } from "react";
import Dropzone from "react-dropzone";
import Cropper, { Area } from "react-easy-crop";
import { useUpdateEffect } from "react-use";

import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogActions,
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

import AddButtonIcon from "assets/icons/add-button.svg";
import CloseIcon from "assets/icons/close.svg";
import MinusCircleIcon from "assets/icons/minus-circle.svg";
import PlusCircleIcon from "assets/icons/plus-circle.svg";
import fileToBase64 from "utils/fileToBase64";

export type UploadPhotoDialogProps = DialogProps & {
  url?: string;
  onConfirm?: (url?: string) => void;
};
const UploadPhotoDialog: FC<UploadPhotoDialogProps> = ({
  url,
  onConfirm,
  ...props
}) => {
  const upSM = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  const [image, setImage] = useState(url);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area>();
  const scale = 100 / (croppedArea?.width ?? 0);

  const reset = () => {
    setCrop({
      x: 0,
      y: 0,
    });
    setZoom(1);
    setCroppedArea(undefined);
  };

  useUpdateEffect(() => {
    setImage(url);
    reset();
  }, [props.open]);

  return (
    <Dialog scroll="body" fullScreen={!upSM} fullWidth {...props}>
      <DialogTitle
        sx={{
          fontWeight: 700,
        }}
      >
        Upload Photo
      </DialogTitle>
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
      <DialogContent
        sx={{
          py: 0,
        }}
      >
        <Stack direction="row" gap={4}>
          <Stack
            gap={1}
            sx={{
              flex: 1,
            }}
          >
            {image ? (
              <>
                <Stack
                  sx={{
                    aspectRatio: `${1 / 1}`,
                    position: "relative",
                  }}
                >
                  <Cropper
                    image={image}
                    aspect={1 / 1}
                    cropShape="round"
                    objectFit="auto-cover"
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropAreaChange={setCroppedArea}
                  />
                </Stack>
                {image && (
                  <Stack direction="row" justifyContent="space-between">
                    <Link
                      component="button"
                      color="error"
                      underline="none"
                      onClick={() => {
                        setImage("");
                        reset();
                      }}
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Remove
                    </Link>
                    <Stack direction="row" gap={2}>
                      <IconButton
                        disabled={zoom <= 1}
                        onClick={() => {
                          setZoom((zoom) => zoom - 1);
                        }}
                        sx={{
                          p: 0,
                        }}
                      >
                        <MinusCircleIcon />
                      </IconButton>
                      <IconButton
                        disabled={zoom >= 3}
                        onClick={() => {
                          setZoom((zoom) => zoom + 1);
                        }}
                        sx={{
                          p: 0,
                        }}
                      >
                        <PlusCircleIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                )}
              </>
            ) : (
              <Dropzone
                accept={{
                  "image/jpeg": [],
                  "image/png": [],
                }}
                maxSize={1024 * 1024 * 3}
                multiple={false}
                onDrop={async ([file]) => {
                  const image = await fileToBase64(file);
                  setImage(image);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Card
                    {...getRootProps()}
                    elevation={0}
                    square
                    sx={{
                      aspectRatio: `${1 / 1}`,
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
                          p: 6,
                        }}
                      >
                        <AddButtonIcon />
                        <Typography
                          align="center"
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          Add Photos
                        </Typography>
                        <Typography
                          align="center"
                          sx={{
                            color: "#999999",
                            fontSize: 14,
                          }}
                        >
                          Only jpg/png/ is supported, and the size cannot exceed
                          3 MB
                        </Typography>
                        <input {...getInputProps()} />
                      </Stack>
                    </CardActionArea>
                  </Card>
                )}
              </Dropzone>
            )}
          </Stack>
          <Avatar
            src={image}
            sx={{
              ...(image && {
                display: "block",
              }),
              width: 120,
              height: 120,
              backgroundColor: "#F0F0F0",
            }}
            imgProps={{
              sx: {
                width: "calc(100% + 0.5px)",
                height: "auto",
                transform: `translate3d(${-(croppedArea?.x ?? 0) * scale}%, ${
                  -(croppedArea?.y ?? 0) * scale
                }%, 0) scale3d(${scale}, ${scale}, 1)`,
                transformOrigin: "top left",
              },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          gap={6}
          justifyContent="center"
          sx={{
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            onClick={(event) => {
              props.onClose?.(event, "backdropClick");
            }}
            sx={{
              width: 210,
              height: 60,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={(event) => {
              onConfirm?.(image);
              props.onClose?.(event, "backdropClick");
            }}
            sx={{
              width: 210,
              height: 60,
            }}
          >
            Confirm
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default UploadPhotoDialog;
