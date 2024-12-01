import OderNotify from '@components/Icons/OderNotify';
import Ring from '@components/Icons/Ring';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { NotificationResponse } from '@constant/Notify';
import { useAuth, UserInfo } from '@contexts/AuthContext';
import { getTimeElapsed } from '@lib/utils';
import * as signalR from '@microsoft/signalr';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notification: React.FC = () => {
  const { user } = useAuth();
  const navigator = useNavigate();
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [lenNoti, setLenNoti] = useState<number>(0);

  useEffect(() => {
    if (user) {
      handleRetrieveNotification(user);
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${API_BACKEND_ENDPOINT}/notificationHub`)
        .withAutomaticReconnect()
        .build();

      const startConnection = async () => {
        try {
          await connection.start();
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
        setLenNoti((prev) => prev + 1);
      };

      connection.on('ReceiveOrderNotification', handleNotification);

      return () => {
        connection.off('ReceiveOrderNotification', handleNotification);
        connection.stop();
      };
    }
  }, [user]);

  const handleRetrieveNotification = async (user: UserInfo) => {
    // Call API to retrieve notifications
    if (user) {
      const response = await axios.get(`${API_BACKEND_ENDPOINT}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data: NotificationResponse[] = response.data.responseData;
      const newNotification = data.sort((a, b) => {
        if (a.is_read !== b.is_read) {
          return a.is_read ? 1 : -1;
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      setNotifications(newNotification);
      setLenNoti(data.map((item) => item.is_read).filter((item) => !item).length);
    }
  };

  const handleClickOnNotify = async (id: string, oderId: string) => {
    if (user) {
      await axios.put(`${API_BACKEND_ENDPOINT}/api/notifications/${id}`, null, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      await handleRetrieveNotification(user);
      navigator('/admin/manage-oder', {
        state: {
          id: oderId,
        },
      });
    }
  };

  return (
    <div className='cursor-pointer'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='relative p-5 border-x border-[#c9c5c9]'>
            <Ring></Ring>
            {lenNoti || 0 ? (
              <div className='absolute w-6 h-6 rounded-full leading-none bg-red-400 text-white translate-x-1/2 top-2 flex items-center justify-center'>
                {lenNoti || 0}
              </div>
            ) : (
              ''
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[450px] pt-16'>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {notifications.map((note, idx) => (
              <div key={idx}>
                <DropdownMenuItem
                  className={`${!note.is_read ? 'bg-slate-50' : ''} min-h-20  px-7 cursor-pointer`}
                  onClick={() => {
                    handleClickOnNotify(note.id, note.content.id);
                  }}
                >
                  <div className='flex gap-1 justify-between w-full'>
                    <div className='w-10 h-10'>
                      <OderNotify></OderNotify>
                    </div>
                    <div className='w-[223px]'>{note.content.message}</div>
                    <div className='font-[gilroy-light-italic]'>
                      {getTimeElapsed(note.content.createdAt)}
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notification;
