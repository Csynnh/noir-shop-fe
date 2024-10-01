import Navigation from '@components/Navigation';
import Account from '@components/Icons/Account';
import Cart from '@components/Icons/Cart';
import Home from '@components/Icons/Home';
import Logo from '@components/Icons/Logo';
import Search from '@components/Icons/Search';
import { Tooltip } from 'antd';
import styles from './styles.module.scss';

const Header = () => {
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
              <span className='icon'>
                <Cart></Cart>
              </span>
            </Tooltip>
            <Tooltip title='Account' arrow={false}>
              <span className='icon'>
                <Account></Account>
              </span>
            </Tooltip>
          </div>
        </div>
        <div className='header-nav'>
          <Navigation></Navigation>
        </div>
      </div>
    </div>
  );
};

export default Header;
