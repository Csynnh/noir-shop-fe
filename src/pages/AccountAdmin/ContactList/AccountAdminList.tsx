import React from 'react';
// import EmployeeItem from '../EmployeeItem';
import { Employee } from '@pages/ManagementEmployee';
import Input from '@components/Input';
import { ContactEmail } from '../AccountAdmin';
import ContactItem from '../ContactItem/ContactItem';
interface ContactListProps {
  data?: ContactEmail[] | null;
}
const ContactList = ({ data }: ContactListProps) => {
  return (
    <div className='flex flex-col gap-[20px]'>
      {data?.map((ContactEmail) => (
        <ContactItem key={ContactEmail.id} contactEmail={ContactEmail} />
      ))}
    </div>
  );
};

export default ContactList;
