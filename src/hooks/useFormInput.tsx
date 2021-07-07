import { useState } from 'react';

export interface UserFormInput {
  value: string;
  onChange: (e: any) => void;
}

const useFormInput = (initialValue: string): UserFormInput => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (e: any): void => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
};

export default useFormInput;
