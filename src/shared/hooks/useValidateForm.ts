import { useCallback, useEffect, useState } from 'react';
import { useListenElements } from './useFormElements';

const useValidateForm = (elements: HTMLFormElement[]) => {
  const [isValid, setIsValid] = useState(true);
  const validateForm = useCallback(() => {
    const nextIsValid = elements.every((element) => {
      // validate set by InputField component
      return !element.validate || element.validate(false);
    });
    setIsValid(nextIsValid);
  }, [elements]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  useListenElements(elements, validateForm);
  return isValid;
};

export default useValidateForm;
