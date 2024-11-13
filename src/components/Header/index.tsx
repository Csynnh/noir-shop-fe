import Navigation from '@components/Navigation';
import Account from '@components/Icons/Account';
import Cart from '@components/Icons/Cart';
import Home from '@components/Icons/Home';
import Logo from '@components/Icons/Logo';
import Search from '@components/Icons/Search';
import { Tooltip } from 'antd';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import MyCartTab from '@components/MyCartTab';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { user: userInfo, removeToken } = useAuth();
  const [isSignedIn, setIsSignedIn] = useState(false);
  // pre-check if user is logged in
  useEffect(() => {
    if (userInfo) {
      const isExpired = new Date(userInfo.expiredTime) < new Date();
      console.log('userInfo :>> ', userInfo);
      if (!isExpired) {
        setIsSignedIn(true);
        return;
      }
    }
    setIsSignedIn(false);
    removeToken();
  }, [userInfo]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className={`${styles.Header}`}>
      <div className='header-wrapper'>
        <div className='header-top'>
          <div className='header-container'>
            <Tooltip title='Home' arrow={false}>
              <span className='icon'>
                <Home></Home>
              </span>
            </Tooltip>
            <Tooltip title='Search' arrow={false}>
              <span className='icon'>
                <Search></Search>
              </span>
            </Tooltip>
          </div>
          <div className='header-container'>
            <span>
              <Logo></Logo>
            </span>
          </div>
          <div className='header-container'>
            <Tooltip title='Cart' arrow={false}>
              <span className='icon' onClick={toggleCart}>
                <Cart></Cart>
              </span>
            </Tooltip>
            <Tooltip title='Account' arrow={false}>
              <span className='icon'>
                <Link to='/account'>
                  <Account></Account>
                </Link>
              </span>
            </Tooltip>
          </div>
        </div>
        <div className='header-nav'>
          <Navigation></Navigation>
        </div>
        <MyCartTab
          isOpen={isCartOpen}
          toggleCart={toggleCart}
          isSignedIn={isSignedIn}
          onToggle={setIsCartOpen}
          account_id={userInfo?.account_id}
        ></MyCartTab>
      </div>
    </div>
  );
};

export default Header;
