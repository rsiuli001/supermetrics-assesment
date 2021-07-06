import { useState } from 'react';

const useFormInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
};

export default useFormInput;
