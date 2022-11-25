import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Severity } from 'shared/enums';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  severity: Severity;
  message: string;
}

const ReactMessage = ({ message, severity }: Props) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const portalId = 'sky-message-container';

const getPortalEle = () => {
  let ele = document.getElementById(portalId);
  if (!ele) {
    ele = document.createElement('div');
    ele.id = portalId;
    document.body.appendChild(ele);
  }
  return ele;
};

const createMessage = (severity: Severity) => {
  return (message: string) => {
    const portalEle = getPortalEle();
    const root = createRoot(portalEle);
    root.render(<ReactMessage severity={severity} message={message} />);
  };
};

const Message = {
  success: createMessage(Severity.success),
  info: createMessage(Severity.info),
  warning: createMessage(Severity.warning),
  error: createMessage(Severity.error),
};

export default Message;
