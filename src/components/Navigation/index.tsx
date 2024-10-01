import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
type MenuItem = Required<MenuProps>['items'][number];

const MenuItemKeys = {
  newCollection: '/new-collection',
  giftCard: '/gift-card',
  contact: '/contact',
  about: '/about',
  home: '/new-collection',
} as const;

const items: MenuItem[] = [
  {
    label: <Link to={'/'}>New Collection</Link>,
    key: MenuItemKeys.newCollection,
  },
  {
    label: <Link to={'/gift-card'}>Gift Card</Link>,
    key: MenuItemKeys.giftCard,
  },
  {
    label: <Link to={'/about'}>About us</Link>,
    key: MenuItemKeys.about,
  },
  {
    label: <Link to={'/contact'}>Contact</Link>,
    key: MenuItemKeys.contact,
  },
];

const Navigation = () => {
  const location = useLocation();
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const path = location.pathname;
    const currentItem =
      items.find((item) => item?.key === path)?.key?.toString() || MenuItemKeys.home;
    setCurrent(currentItem);
  }, [location.pathname]);

  return (
    <Menu
      className={`${styles.navigation}`}
      selectedKeys={[current]}
      mode='horizontal'
      items={items}
    />
  );
};

export default Navigation;
