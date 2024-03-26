import React from 'react';

interface CardInformationProps {
  title: string;
  subtitle?: string;
  textButton: string;
  onClick: () => void;
}

const CardInformation: React.FC<CardInformationProps> = ({
  title,
  subtitle,
  textButton,
  onClick,
}) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center'>
          {title}
        </h5>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 text-center'>
          {subtitle}
        </p>
        <div className='flex justify-center'>
          <button
            onClick={onClick}
            className='flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            {textButton}
            <svg
              className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 5h12m0 0L9 1m4 4L9 9'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardInformation;
