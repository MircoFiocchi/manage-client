import React from 'react';
import { useCustomersContext } from '@/context/customers/CustomersContext';
import { useModalContext } from '@/context/modal/ModalContext';
import { CustomerData } from '@/types';
import {
  buildDate,
  getYearFromBirthday,
  transformDateFormat,
} from '@/utils/date';
import { useRouter } from 'next/router';

interface CustomerForm {
  name: string;
  lastName: string;
  age: number;
  birthdayDate: {
    year: number;
    month: {
      number: number;
    };
    day: number;
  } | null;
}

interface useFormCustomerProps {
  isEditCustomer: boolean;
  customerId?: string;
}

interface useFormCustomerHook {
  onSave: (value: CustomerForm, actions: any) => Promise<void>;
}

const useFormCustomer = ({
  isEditCustomer,
  customerId,
}: useFormCustomerProps): useFormCustomerHook => {
  const { addCustomer, editCustomer } = useCustomersContext();
  const { openModal } = useModalContext();
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/');
  };

  const onSave = async (value: CustomerForm, actions: any) => {
    const { name, lastName, age, birthdayDate } = value;
    const dateNow = new Date();

    if (!birthdayDate) {
      openModal({
        errorModal: true,
        messageModal: 'Please add your birthday',
      });
      return;
    }

    if (birthdayDate.year === dateNow.getFullYear()) {
      openModal({
        errorModal: true,
        messageModal: 'Customer must be at least 1 year old',
      });
      return;
    }

    let dataBirthday;
    if (typeof birthdayDate === 'object') {
      dataBirthday = buildDate(
        birthdayDate.year,
        birthdayDate.month.number,
        birthdayDate.day,
      );
    } else {
      dataBirthday = transformDateFormat(birthdayDate);
    }

    const yearsBirthday = getYearFromBirthday(dataBirthday);

    if (yearsBirthday !== age) {
      openModal({
        errorModal: true,
        messageModal: 'Please check age or date of birthday',
      });
      return;
    }
    const customer: CustomerData = {
      name,
      lastName,
      age,
      birthdayDate: dataBirthday,
    };

    try {
      if (isEditCustomer) {
        if (customerId) {
          await editCustomer(customerId, customer);
        }
      } else {
        await addCustomer(customer);
      }
      openModal({
        errorModal: false,
        messageModal: 'Your customer was saved',
        onClick: handleRedirect,
      });
      actions.resetForm();
    } catch (error) {
      openModal({
        errorModal: true,
        messageModal: 'There was an error saving, please try again.',
      });
    }
  };

  return { onSave };
};

export default useFormCustomer;
