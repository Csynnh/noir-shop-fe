import React, { useEffect, useState } from 'react';
import styles from './AccountAdmin.module.scss';
import Avatar from '@components/Icons/Avatar';
import Edit from '@components/Icons/Edit';
import Button from '@components/Button';
import Boy from '@components/Icons/Boy/Boy';
import ContactList from './ContactList/AccountAdminList';
import Pagination from '@components/Pagination';
import { useNavigate } from 'react-router-dom';

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

const mockResponse: ContactEmaiResponse = {
  data: [
    {
      id: '1',
      email: 'john.doe@example.com',
      sentDate: '2024-12-01T10:30:00Z',
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      sentDate: '2024-12-02T14:45:00Z',
    },
    {
      id: '3',
      email: 'mark.jones@example.com',
      sentDate: '2024-12-03T09:20:00Z',
    },
    // {
    //   id: '4',
    //   email: 'emily.davis@example.com',
    //   sentDate: '2024-12-04T16:15:00Z',
    // },
    // {
    //   id: '5',
    //   email: 'david.wilson@example.com',
    //   sentDate: '2024-12-05T11:05:00Z',
    // },
  ],
  pageNumber: 1,
  pageSize: 3,
  totalItems: 50,
  totalPages: Math.ceil(50 / 3),
};

const AccountAdmin = () => {
  const [mockData, setMockData] = useState<ContactEmaiResponse>();
  const navigator = useNavigate();

  const handleChangeAccount = () => {
    navigator('/admin/sign-in');
  };
  const handleChangePage = (pageNumber: number) => {
    console.log('Page number:', pageNumber);
  };
  useEffect(() => {
    setMockData(mockResponse);
  }, []);
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
                  <p className='light'>TruLem</p>
                  <Edit></Edit>
                </div>
                <div className='AccountAdmin-text'>
                  <p className='strong'>Email:</p>
                  <p className='light'>TruLem</p>
                  <Edit></Edit>
                </div>{' '}
                <div className='AccountAdmin-text'>
                  <p className='strong'>Phone Number:</p>
                  <p className='light'>TruLem</p>
                  <Edit></Edit>
                </div>
                <div className='AccountAdmin-text'>
                  <p className='strong'>Password:</p>
                  <p className='light'>TruLem</p>
                  <Edit></Edit>
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
                <p>{mockData?.totalItems}</p>
              </div>
            </div>
            <ContactList data={mockData?.data}></ContactList>
            <div className='AccountAdmin-bottom'>
              <Pagination data={mockData} onPageChange={handleChangePage}></Pagination>
              <Button isPrimary onClick={() => {}}>
                Check Email Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAdmin;
