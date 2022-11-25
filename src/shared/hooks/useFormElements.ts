import { MutableRefObject, useEffect, useState } from 'react';

export const getFormElements = (formRef: MutableRefObject<HTMLFormElement | null>) => {
  if (!formRef.current) {
    return [];
  }
  let elements = Array.from(formRef.current.elements) as HTMLFormElement[];
  elements = elements.filter((element) => {
    return !!element.name;
  });
  return elements;
};

export const useListenElements = (elements: HTMLFormElement[], listener: (e: Event) => void) => {
  useEffect(() => {
    // make sure Input onchange has happened.
    const deferListener = (e: Event) => {
      setTimeout(() => {
        listener(e);
      }, 0);
    };
    elements.forEach((element) => {
      element.addEventListener('input', deferListener);
    });
    return () => {
      elements.forEach((element) => {
        element.removeEventListener('input', deferListener);
      });
    };
  }, [elements, listener]);
};

export const useFormElements = (formRef: MutableRefObject<HTMLFormElement | null>, deps: any[] = []) => {
  const [elements, setElements] = useState<HTMLFormElement[]>([]);
  useEffect(() => {
    setElements(getFormElements(formRef));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formRef, ...deps]);
  return elements;
};
