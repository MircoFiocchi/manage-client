import React from 'react';

import AlertIcon from '@/public/icons/alertIcon';
import CheckIcon from '@/public/icons/checkIcon';
import Button from '../button/Button';

interface ModalAlertProps {
  message: string;
  onClose: () => void;
  error?: boolean;
}

const ModalAlert: React.FC<ModalAlertProps> = ({
  error = false,
  message,
  onClose,
}) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-950 bg-opacity-90 z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 min-w-80 max-w-96'>
        <div className='text-center'>
          {error ? <AlertIcon /> : <CheckIcon />}
          <h3 className='mb-5 text-lg font-normal text-gray-500'>{message}</h3>
        </div>
        <div className='text-center'>
          <Button
            type='button'
            text='OK'
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
