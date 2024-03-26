import { useState, ReactNode } from 'react';

import LogoIcon from '@/public/icons/logoIcon';
import ListIcon from '@/public/icons/listIcon';
import AddIcon from '@/public/icons/addIcon';

import MenuButton from './MenuButton';
import MenuItem from './MenuItem';

interface SideBarProps {
  children?: ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const iconClasses = 'text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white';

  return (
    <>
      <MenuButton onClick={toggleSidebar} />

      <aside
        id='logo-sidebar'
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <div className='flex items-center ps-2.5 mb-5'>
            <LogoIcon className={`w-6 h-6 mr-2 ${iconClasses}`} />
            <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
              Customer Admin
            </span>
          </div>
          <ul className='space-y-2 font-medium'>
            <li>
              <MenuItem
                href='/'
                text='Review'
                icon={
                  <ListIcon className={iconClasses} />
                }
              />
            </li>
            <li>
              <MenuItem
                href='/edit'
                text='Create customer'
                icon={
                  <AddIcon className={iconClasses} />
                }
              />
            </li>
          </ul>
        </div>
      </aside>
      <div
        className={`fixed top-0 left-0 z-30 w-full h-screen bg-black bg-opacity-50 ${
          isSidebarOpen ? 'block' : 'hidden'
        } sm:hidden`}
        onClick={toggleSidebar}
      />
      <div className='p-4 sm:ml-64'>{children}</div>
    </>
  );
};

export default SideBar;
