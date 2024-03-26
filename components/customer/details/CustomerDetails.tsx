import React from 'react';

import Title from '@/components/text/Title';
import Table from '@/components/table/Table';
import Information from '@/components/information/Information';

import { useModalContext } from '@/context/modal/ModalContext';
import { useCustomersContext } from '@/context/customers/CustomersContext';

import { useRouter } from 'next/router';

interface CustomerDetailsProps {
  statistics: {
    average: number,
    standardDeviation: number,
  };
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ statistics }) => {
  const { deleteCustomer, customers } = useCustomersContext();
  const { openModal } = useModalContext();
  const router = useRouter();

  const removeCustomer = async (id: string) => {
    try {
      await deleteCustomer(id);
      openModal({
        errorModal: false,
        messageModal: 'Your customer was deleted',
      });
    } catch (error) {
      openModal({
        errorModal: true,
        messageModal: 'There was an error saving, please try again.',
      });
    }
  };

  const onEdit = (id: string) => {
    router.push(`/edit/${id}`);
  }

  return (
    <>
      <Title
        text='Customer forecasting and analysis'
        className='text-center mb-10'
      />
      <div className='justify-center text-center flex flex-col mx-40'>
        <Table
          customers={customers}
          onDelete={removeCustomer}
          onEdit={onEdit}
        />
        <Information statistics={statistics} />
      </div>
    </>
  );
};

export default CustomerDetails;
