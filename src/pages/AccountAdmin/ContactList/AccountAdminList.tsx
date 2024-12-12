import React from 'react';
import ContactItem from '../ContactItem/ContactItem';
import { NotificationResponse } from '@constant/Notify';
interface ContactListProps {
  data?: NotificationResponse[] | null;
}
const ContactList = ({ data }: ContactListProps) => {
  console.log(data);
  return (
    <div className='flex flex-col gap-[20px] max-h-[166px] overflow-y-scroll scroll-smooth pr-5'>
      {data?.map((ContactEmail) => (
        <ContactItem key={ContactEmail.id} NotificationResponse={ContactEmail} />
      ))}
    </div>
  );
};

export default ContactList;
