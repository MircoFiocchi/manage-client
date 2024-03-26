import React, { useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { validationSchema } from './validationSchema';

import Title from '@/components/text/Title';
import Input from '@/components/input/Input';
import CustomDatePicker from '@/components/customDatePicker/CustomDatePicker';

import useFormCustomer from './useFormCustomer';
import Button from '@/components/button/Button';
import { buildDate, getYearFromBirthday } from '@/utils/date';

export interface FormCustomerProps {
  customer?: {
    name: string;
    lastName: string;
    age: number;
    birthdayDate: any;
  };
  isEditCustomer?: boolean;
  customerId?: string;
}

const FormCustomer: React.FC<FormCustomerProps> = ({
  customer,
  isEditCustomer = false,
  customerId,
}) => {
  const { onSave } = useFormCustomer({isEditCustomer, customerId});

  const onChangeDatePicker = (
    val: { year: number; month: { number: number }; day: number },
    setFieldValue: FormikProps<any>['setFieldValue'],
  ) => {
    setFieldValue('birthdayDate', val);
    const dataBirthday = buildDate(val.year, val.month.number, val.day);
    const yearsBirthday = getYearFromBirthday(dataBirthday);
    setFieldValue('age', yearsBirthday);
  };

  return (
    <>
      <Title
        text='Add your customer!'
        className='text-center'
      />
      <div className='mt-8 max-w-md mx-auto'>
        <Formik
          initialValues={{
            name: customer?.name || '',
            lastName: customer?.lastName || '',
            age: customer?.age || 0,
            birthdayDate: customer?.birthdayDate || 0,
          }}
          validationSchema={validationSchema}
          onSubmit={onSave}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Input
                label='Name'
                id='name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
              />
              <Input
                label='Last Name'
                id='lastName'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.lastName}
                touched={touched.lastName}
              />

              <div className='mb-5 flex flex-row gap-2'>
                <div className='flex flex-col'>
                  <CustomDatePicker
                    label='Date Of Birth'
                    id='birthdayDate'
                    value={values.birthdayDate}
                    onChange={(val) => onChangeDatePicker(val, setFieldValue)}
                    onMonthChange={(val) => setFieldValue('birthdayDate', val)}
                    onYearChange={(val) => setFieldValue('birthdayDate', val)}
                    error={errors.birthdayDate}
                    touched={touched.birthdayDate}
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <Input
                    label='Age'
                    id='age'
                    type='number'
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.age}
                    touched={touched.age}
                  />
                </div>
              </div>
              <Button
                type='submit'
                text={`${isEditCustomer ? 'Edit' : 'Add'} customer`}
              />
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormCustomer;
