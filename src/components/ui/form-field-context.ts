import { createContext, useContext } from 'react';

export type FormFieldContextValue = {
  id: string;
  labelId: string;
  error?: string;
  describedBy?: string;
};

export const FormFieldContext = createContext<FormFieldContextValue | null>(
  null
);

export function useFormField() {
  return useContext(FormFieldContext);
}
