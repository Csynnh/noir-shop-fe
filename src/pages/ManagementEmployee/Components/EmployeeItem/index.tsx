import { Employee } from '@pages/ManagementEmployee';
import React from 'react';
import styles from './ManagementItem.module.scss';
import Delete from '@components/Icons/Delete';
import Option from '@components/Icons/Option';
import Avatar from '@components/Icons/Avatar';
import Mail from '@components/Icons/Mail';
import Phone from '@components/Icons/Phone';

interface EmployeeItemProps {
  employee: Employee;
}
const EmployeeItem = ({ employee }: EmployeeItemProps) => {
  return (
    <div className={styles.ManagementItem}>
      <div className='ManagementItem-container'>
        <div className='flex justify-between mt-[10px]'>
          <span className='w-4 h-4 cursor-pointer flex items-center justify-center'>
            <Delete></Delete>
          </span>
          <span className='w-4 h-4 cursor-pointer flex items-center justify-center'>
            <Option></Option>
          </span>
        </div>
        <div className='ManagementItem-infor'>
          <Avatar></Avatar>
          <p className='bold'>{employee.name}</p>
          <p className='light'>{employee.position}</p>
        </div>
        <div className='ManagementItem-middle'>
          <div className='ManagementItem-hours'>
            <p className='light'>Sum man-hours:</p>
            <p className='bold'>{employee.sumManHours} hours</p>
          </div>
          <div className='ManagementItem-date'>
            <p className='light'>Hired Date:</p>
            <p className='bold'>{employee.hiredDate}</p>
          </div>
        </div>
        <div className='ManagementItem-contact'>
          <div className='ManagementItem-detail'>
            <Mail></Mail>
            <p className='bold'>Email:</p>
            <p className='light'>{employee.email}</p>
          </div>
          <div className='ManagementItem-detail'>
            <Phone></Phone>
            <p className='bold'>Phone:</p>
            <p className='light'>{employee.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeItem;
