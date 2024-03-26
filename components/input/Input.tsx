import React, { ChangeEvent, FocusEvent } from 'react';

interface InputsProps {
  label: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  value?: string | number | readonly string[] | undefined;
  type?: string;
}

const Input: React.FC<InputsProps> = ({
  id,
  label,
  onChange,
  onBlur,
  error,
  touched,
  value,
  type,
}) => {
  return (
    <div className='mb-5'>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        type={type}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        onChange={onChange}
        onBlur={onBlur}
        autoComplete='off'
      />
      {error && touched && (
        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
          <span className='font-medium'>{error}</span>
        </p>
      )}
    </div>
  );
};

export default Input;
