import { FC } from 'react';

interface LogoIconProps {
  className?: string;
}

const LogoIcon: FC<LogoIconProps> = ({ className }) => (
  <svg
    className={className}
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='currentColor'
    viewBox='0 0 18 20'
  >
    <path d='M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z' />
  </svg>
);

export default LogoIcon;
