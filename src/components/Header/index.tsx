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
import { useAuth, UserInfo } from '@contexts/AuthContext';
import * as signalR from '@microsoft/signalr';
import axios from 'axios';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { NotificationResponse } from '@constant/Notify';
import { toast } from 'sonner';
import { Toaster } from '@ui/sonner';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user: userInfo, removeToken } = useAuth();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const inputref = useRef(null);
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [newNotify, setNewNotifty] = useState<boolean>(false);

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
        navigate(`/products/${searchQuery}`, {
          state: { id: response.data.responseData },
        });
        if (response.status === 500) {
          toast.error('Not found!', {
            description: 'Please try another keyword',
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Not found!', {
          description: 'Please try another keyword',
        });
      }
    }
  };
  const handleSearchClick = () => {
    handleSearch();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleShopNow = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    if (userInfo) {
      handleRetrieveNotification(userInfo);
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${API_BACKEND_ENDPOINT}/notificationHub`, {
          accessTokenFactory: () => userInfo.token,
        })
        .withAutomaticReconnect()
        .build();

      const startConnection = async () => {
        try {
          await connection.start();
          console.log('connected');
        } catch (err) {
          console.error('SignalR Connection Error:', err);
        }
      };

      startConnection();

      const handleNotification = (message: NotificationResponse) => {
        const newNotification = (prev: NotificationResponse[]) =>
          [...prev, message].sort((a, b) => {
            if (a.is_read !== b.is_read) {
              return a.is_read ? 1 : -1;
            }
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });

        setNotifications(newNotification);
        setNewNotifty(true);
      };

      connection.on('ReceiveCartNotification', handleNotification);

      return () => {
        connection.off('ReceiveCartNotification', handleNotification);
        connection.stop();
      };
    }
  }, [userInfo]);

  // pre-check if user is logged in
  useEffect(() => {
    if (userInfo) {
      const isExpired = new Date(userInfo.expiredTime) < new Date();
      if (!isExpired) {
        setIsSignedIn(true);
        return;
      }
    }
    setIsSignedIn(false);
    removeToken();
  }, [userInfo]);

  const toggleCart = async () => {
    setIsCartOpen(!isCartOpen);
    await handleClickOnNotify();
  };

  const handleClickOnNotify = async () => {
    if (userInfo) {
      const needMarkRead = notifications?.filter((item) => item.id && !item.is_read);

      if (needMarkRead.length > 0) {
        needMarkRead.forEach(async (item) => {
          await axios.put(
            `${API_BACKEND_ENDPOINT}/api/notifications/${item.id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            },
          );
        });
      }
      await handleRetrieveNotification(userInfo);
      setNewNotifty(false);
    }
  };

  const handleRetrieveNotification = async (user: UserInfo) => {
    // Call API to retrieve notifications
    try {
      if (user) {
        const response = await axios.get(
          `${API_BACKEND_ENDPOINT}/api/notifications?type=CART_NOTIFICATION&accountId=${user.account_id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        const data: NotificationResponse[] = response.data.responseData;
        const newNotification = data.sort((a, b) => {
          if (a.is_read !== b.is_read) {
            return a.is_read ? 1 : -1;
          }
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        setNotifications(newNotification);
        setNewNotifty(data.map((item) => item.is_read).filter((item) => !item).length > 0);
        console.log(data.map((item) => item.is_read).filter((item) => !item).length > 0);
      }
    } catch (error) {}
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
                    onKeyDown={handleKeyDown}
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
          <div className='header-container cursor-pointer'>
            <Tooltip title='Cart' arrow={false}>
              <span className='icon relative' onClick={toggleCart}>
                <Cart></Cart>
                {newNotify ? (
                  <div className='absolute top-0 translate-y-2/4  -translate-x-1/4  right-0 rounded-full bg-red-400 w-3 h-3'></div>
                ) : null}
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
          refetch={newNotify}
          handleShopNow={handleShopNow}
        ></MyCartTab>
      </div>
      <Toaster position='top-right' richColors></Toaster>
    </div>
  );
};

export default Header;
