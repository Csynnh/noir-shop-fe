import React from 'react';
import EmployeeItem from '../EmployeeItem';
import { Employee } from '@pages/ManagementEmployee';
import Input from '@components/Input';
interface EmployeeListProps {
  data?: Employee[] | null;
}
const EmployeeList = ({ data }: EmployeeListProps) => {
  return (
    <div className='grid grid-cols-3 gap-6'>
      {data?.map((Employee) => <EmployeeItem key={Employee.id} employee={Employee} />)}
    </div>
  );
};

export default EmployeeList;
