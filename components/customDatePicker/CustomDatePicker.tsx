import React, { FocusEvent } from 'react';

import DatePicker from 'react-multi-date-picker';

interface CustomDatePickersProps {
  label: string;
  id: string;
  value: any;
  onChange: (val: any) => void;
  onMonthChange: (val: any) => void;
  onYearChange: (val: any) => void;
  error: string | undefined;
  touched: boolean | undefined;
}

const CustomDatePicker: React.FC<CustomDatePickersProps> = ({
  label,
  id,
  value,
  onChange,
  onMonthChange,
  onYearChange,
  error,
  touched,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <DatePicker
        id={id}
        format='MM/DD/YYYY'
        value={value}
        style={{
          color: 'white',
          height: '42px',
          backgroundColor: '#374151',
          borderColor: '#4b5563',
        }}
        onChange={onChange}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
      />
      {error && touched && (
        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
          <span className='font-medium'>{error}</span>
        </p>
      )}
    </>
  );
};

export default CustomDatePicker;
