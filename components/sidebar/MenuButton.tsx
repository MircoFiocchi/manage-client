import MenuIcon from '@/public/icons/menuIcon';

interface MenuButtonProps {
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => (
  <button
    data-drawer-target='logo-sidebar'
    data-drawer-toggle='logo-sidebar'
    aria-controls='logo-sidebar'
    type='button'
    className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
    onClick={onClick}
  >
    <MenuIcon className='w-6 h-6' />
  </button>
);

export default MenuButton;
