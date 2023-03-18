import { ChangeEvent, useState } from "react";

export type FormType = {
  id: string;
  lat: string;
  long: string;
  [key: string]: string;
};
export const useForm = (initValue: FormType) => {
  const [form, setForm] = useState<FormType>(initValue);
  const onChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setForm({ ...form, [name]: value });
  };

  const onClear = () => setForm(initValue);

  const checkFormValues = () =>
    Object.keys(form).reduce((result, key) => {
      result[key] = form[key] ? true : false;
      return result;
    }, {} as { [key: string]: boolean });

  return [form, onChangeForm, setForm, onClear, checkFormValues()] as const;
};
