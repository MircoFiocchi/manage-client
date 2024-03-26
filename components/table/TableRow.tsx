import React from 'react';
import { CustomizedCustomer } from '@/types';

interface TableRowProps {
  customer: CustomizedCustomer;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({ customer, onDelete, onEdit }) => {
  return (
    <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {customer.fullName}
      </th>
      <td className='px-6 py-4'>{customer.age}</td>
      <td className='px-6 py-4'>{customer.birthdayDate}</td>
      <td className='px-6 py-4'>{customer.probabilityOfDeath}</td>
      <td className='px-6 py-4'>
        <button
          className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2'
          onClick={() => onDelete(customer.id)}
        >
          Delete
        </button>
        |
        <button
          className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2'
          onClick={() => onEdit(customer.id)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
