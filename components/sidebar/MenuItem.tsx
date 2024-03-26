import Link from 'next/link';

interface MenuItemProps {
  href: string;
  text: string;
  icon: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, text, icon }) => (
  <Link href={href}>
    <div className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
      {icon}
      <span className='ms-3'>{text}</span>
    </div>
  </Link>
);

export default MenuItem;