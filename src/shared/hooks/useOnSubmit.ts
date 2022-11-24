import { useCallback, useRef } from 'react';

export type FormFields = { [name: string]: string };
export type SubmitAction = (form: FormFields) => Promise<void>;

export const useOnSubmit = (action: SubmitAction) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const onSubmit = useCallback(() => {
    if (!formRef.current) {
      return null;
    }
    const elements = Array.from(formRef.current.elements) as HTMLFormElement[];
    const isValid = elements.every((element) => {
      // validate set by InputField component
      return element.validate?.();
    });
    if (!isValid) {
      return;
    }
    const formFiles: FormFields = {};
    elements.forEach((element) => {
      formFiles[element.name] = formFiles[element.value];
    });
    return action(formFiles);
  }, [action]);
  return { formRef, onSubmit };
};
