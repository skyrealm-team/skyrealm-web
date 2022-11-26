import { useCallback, useRef } from 'react';
import { getFormElements } from './useFormElements';

export type FormFields = { [name: string]: string };

function useOnSubmit<T>(action: (formField: T) => Promise<void>) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const onSubmit = useCallback(() => {
    const elements = getFormElements(formRef);
    let isValid = true;
    elements.forEach((element) => {
      // validate set by InputField component
      if (element.validate && !element.validate()) {
        if (isValid) {
          element.scrollIntoView();
        }
        isValid = false;
      }
    });
    if (!isValid) {
      return;
    }
    const formFiles: FormFields = {};
    elements.forEach((element) => {
      formFiles[element.name] = element.value;
    });
    return action(formFiles as T);
  }, [action]);
  return { formRef, onSubmit };
}

export default useOnSubmit;
