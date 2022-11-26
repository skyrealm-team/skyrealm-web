import React, { ReactNode } from 'react';

interface Props {
  visible: boolean;
  children: ReactNode;
}

const Create = ({ visible, children }: Props) => {
  return visible ? <>{children}</> : null;
};

export default Create;
