import React, { useCallback, useState } from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';

const AsyncButton = ({ onClick, ...restProps }: Omit<LoadingButtonProps, 'loading'>) => {
  const [loading, setLoading] = useState(false);

  const asyncHandler = useCallback(
    async (e: any) => {
      setLoading(true);
      try {
        await onClick?.(e);
      } finally {
        setLoading(false);
      }
    },
    [onClick],
  );
  return <LoadingButton loading={loading} onClick={asyncHandler} {...restProps} />;
};

export default AsyncButton;
