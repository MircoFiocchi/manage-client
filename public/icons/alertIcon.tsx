import { FC } from 'react';

interface AlertIconProps {
  className?: string;
}

const AlertIcon: FC<AlertIconProps> = ({ className }) => (
  <svg
    className={`mx-auto mb-4 text-gray-400 ${className}`}
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 20 20'
  >
    <path
      stroke="#94a3b8"
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
    />
  </svg>
);

export default AlertIcon;
