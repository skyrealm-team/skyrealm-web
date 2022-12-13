import { useState } from "react";
import { useUpdateEffect } from "react-use";

const useEffectState = <S>(value: S): ReturnType<typeof useState<S>> => {
  const [state, setState] = useState<S | undefined>(value);

  useUpdateEffect(() => {
    console.log("useUpdateEffect");
    setState(value);
  }, [value]);

  return [state, setState];
};

export default useEffectState;
