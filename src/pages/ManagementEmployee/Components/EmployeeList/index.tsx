import React from 'react';
import EmployeeItem from '../EmployeeItem';
import { Employee } from '@pages/ManagementEmployee';
import Input from '@components/Input';
interface EmployeeListProps {
  data?: Employee[] | null;
  handleDeleteEmployee: (id: string) => void;
  refecth: (a: boolean) => void;
}
const EmployeeList = ({ data, handleDeleteEmployee, refecth }: EmployeeListProps) => {
  return (
    <div className='grid grid-cols-3 gap-6'>
      {data?.map((Employee) => (
        <EmployeeItem
          refecth={refecth}
          key={Employee.id}
          employee={Employee}
          handleDeleteEmployee={handleDeleteEmployee}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
