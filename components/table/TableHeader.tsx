import React from 'react';

interface TableHeaderProps {
  text: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ text }) => {
  return (
    <th
      scope='col'
      className='px-6 py-3'
    >
      {text}
    </th>
  );
};

export default TableHeader;
