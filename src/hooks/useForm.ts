import { ChangeEvent, useState } from "react";

export type FormType = {
  id?: string;
  lat?: string;
  long?: string;
  // [key: string]: number;
};
export const useForm = (initValue: FormType) => {
  const [form, setForm] = useState<FormType | undefined>(initValue);
  const onChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setForm({ ...form, [name]: value });
  };

  const onClear = () => setForm(initValue);

  return [form, onChangeForm, setForm,onClear] as const;
};
