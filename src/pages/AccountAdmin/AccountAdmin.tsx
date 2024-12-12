import Button from '@components/Button';
import Boy from '@components/Icons/Boy/Boy';
import NoData from '@components/Icons/NoData/NoData';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { NotificationResponse } from '@constant/Notify';
import { useAuth, UserInfo } from '@contexts/AuthContext';
import { Spinner } from '@ui/spiner';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import styles from './AccountAdmin.module.scss';
import ContactList from './ContactList/AccountAdminList';

export interface ContactEmail {
  id: string;
  email: string;
  sentDate: string;
}
export interface ContactEmaiResponse {
  data: ContactEmail[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const AccountAdmin = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [lenNoti, setLenNoti] = useState<number>(0);

  useEffect(() => {
    if (user) {
      handleRetrieveNotification(user);
    }
  }, [user]);
  const handleRetrieveNotification = async (user: UserInfo) => {
    if (user) {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BACKEND_ENDPOINT}/api/notifications?type=CONTACT_NOTIFICATION`,
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
        setLenNoti(data.map((item) => item.is_read).filter((item) => !item).length);
      } catch (error) {
        toast.error('Error!', {
          description: 'Failed to retrieve notifications',
        });
      } finally {
        setLoading(false);
      }
    }
  };
  const handleEmailClick = () => {
    window.location.href = 'https://mail.google.com/';
  };
  const handleChangeAccount = () => {
    navigator('/admin/sign-in');
  };

  return (
    <div className={`${styles.AccountAdmin}`}>
      <div className='AccountAdmin-container'>
        <h1>My Profile</h1>
        <div className='AccountAdmin-content'>
          <div className='AccountAdmin-left'>
            <div className='AccountAdmin-left-top'>
              <div className='flex flex-col gap-[14px]'>
                <p className='font-["gilroy-semibold"] tittle-header'>Hi, Admin</p>
                <p className=''>Ready to start your day</p>
              </div>
              <div className='AccountAdmin-icon'>
                <Boy></Boy>
              </div>
            </div>

            <div className='AccountAdmin-left-bottom'>
              <div className='AccountAdmin-infor'>
                <div className='AccountAdmin-text'>
                  <p className='strong'>Username:</p>
                  <p className='light'>{user?.name}</p>
                </div>
                <div className='AccountAdmin-text'>
                  <p className='strong'>Email:</p>
                  <p className='light'>{user?.email}</p>
                </div>{' '}
                <div className='AccountAdmin-text'>
                  <p className='strong'>Phone Number:</p>
                  <p className='light'>{user?.phone}</p>
                </div>
                <div className='AccountAdmin-text'>
                  <p className='strong'>Password:</p>
                  <p className='light'>********</p>
                </div>
              </div>
              <Button onClick={handleChangeAccount}>Change Account</Button>
            </div>
          </div>

          <div className='AccountAdmin-right'>
            <div className='AccountAdmin-tittle'>
              <p className='text-[20px]'>Customer Contact Email</p>
              <div className='AccountAdmin-summary'>
                <p className='light'>Summary: </p>
                <p>{lenNoti}</p>
              </div>
            </div>
            {loading ? (
              <div className='flex items-center gap-3 justify-center mt-10'>
                <Spinner></Spinner>
                Loading...
              </div>
            ) : notifications.length ? (
              <div className='flex flex-col justify-between h-full'>
                <ContactList data={notifications}></ContactList>
                <div className='AccountAdmin-bottom'>
                  <Button isPrimary onClick={handleEmailClick}>
                    Check Email Now
                  </Button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-[10px] w-full h-full justify-center items-center border '>
                <NoData></NoData>
                <p className='text-[13px] text-[var(--main-color)]'>No Results Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAdmin;
