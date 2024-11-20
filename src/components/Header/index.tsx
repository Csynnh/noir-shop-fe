import Navigation from '@components/Navigation';
import Account from '@components/Icons/Account';
import Cart from '@components/Icons/Cart';
import Home from '@components/Icons/Home';
import Logo from '@components/Icons/Logo';
import Search from '@components/Icons/Search';
import { Tooltip } from 'antd';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import MyCartTab from '@components/MyCartTab';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { SearchIcon } from 'lucide-react';
import axios from 'axios';
import { API_BACKEND_ENDPOINT } from '@constant/Api';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user: userInfo, removeToken } = useAuth();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const inputref = useRef(null);

  //handle searching
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await axios.get(
          `${API_BACKEND_ENDPOINT}/api/products?name=${searchQuery}`,
        );
        console.log('searchQuery :>> ', searchQuery);
        navigate(`/products/${searchQuery}`, {
          state: { id: response.data.responseData },
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
  };
  const handleSearchClick = () => {
    handleSearch();
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
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
              {/* <span className='icon'>
                <SearchIcon></SearchIcon>
              </span> */}
              <div>
                <div className='search-box'>
                  <button className='btn-search' onClick={handleSearchClick}>
                    <Search></Search>
                  </button>
                  <input
                    ref={inputref}
                    type='text'
                    className={`input-search ${searchQuery ? 'is-active' : ''}`}
                    placeholder='Type to Search...'
                    onChange={handleSearchChange}
                  ></input>
                </div>
              </div>
            </Tooltip>
          </div>
          <div className='header-logo'>
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
