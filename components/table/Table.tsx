import React from 'react';

import TableRow from './TableRow';

import { CustomizedCustomer } from '@/types';
import TableHeader from './TableHeader';


interface TableProps {
  customers: CustomizedCustomer[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ customers, onDelete, onEdit }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <TableHeader text='Name and last name' />
            <TableHeader text='Age' />
            <TableHeader text='Date Of Birthday' />
            <TableHeader text='Probability of death' />
            <TableHeader text='Action' />
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              customer={customer}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
