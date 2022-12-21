import { FC } from "react";
import { useToggle } from "react-use";

import { Button, ButtonProps } from "@mui/material";

import ContactSmallIcon from "assets/icons/contact-small.svg";
import ContactIcon from "assets/icons/contact.svg";
import ContactDialog from "components/ContactDialog";

export type ContactButtonProps = ButtonProps & {
  listing?: SingleListing;
};

const ContactButton: FC<ContactButtonProps> = ({ listing, ...props }) => {
  const [open, setOpen] = useToggle(false);
  const size = props.size ?? "medium";

  return (
    <>
      <Button
        variant="contained"
        {...(size === "small" && {
          startIcon: <ContactSmallIcon />,
        })}
        {...(size === "medium" && {
          startIcon: <ContactIcon />,
        })}
        {...props}
        onClick={(event) => {
          setOpen(true);

          props.onClick?.(event);
        }}
        sx={{
          ...props.sx,
          fontSize: 18,
          ...(size === "small" && {
            width: 120,
            height: 40,
          }),
          ...(size === "medium" && {
            width: 190,
            height: 50,
          }),
        }}
      >
        Contact
      </Button>
      <ContactDialog
        listing={listing}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default ContactButton;
