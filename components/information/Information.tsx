import React from 'react';

interface InformationProps {
  statistics: {
    average: number;
    standardDeviation: number;
  };
}

const Information: React.FC<InformationProps> = ({ statistics }) => {
  return (
    <div className='mt-8 justify-center w-2/4 self-center'>
      <div className='mt-4 flex bg-gray-700 rounded-lg border-2 border-white border-opacity-100'>
        <div className='mx-auto flex flex-col items-center w-1/2 justify-between'>
          <h1 className='text-lg text-gray-900 dark:text-white font-bold text-center'>
            Average age
          </h1>
          <div>{statistics.average}%</div>
        </div>
        <div className='mx-auto flex flex-col items-center w-1/2'>
          <h1 className='text-lg text-gray-900 dark:text-white font-bold text-center'>
            Standard deviation between ages
          </h1>
          <div>{statistics.standardDeviation}%</div>
        </div>
      </div>
    </div>
  );
};

export default Information;
