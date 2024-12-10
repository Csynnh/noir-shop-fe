import { Employee } from '@pages/ManagementEmployee';
import React from 'react';
import styles from './ManagementItem.module.scss';
import Delete from '@components/Icons/Delete';
import Option from '@components/Icons/Option';
import Avatar from '@components/Icons/Avatar';
import Mail from '@components/Icons/Mail';
import Phone from '@components/Icons/Phone';
import dayjs from 'dayjs';
import { Modal } from 'antd';
import Button from '@components/Button';

interface EmployeeItemProps {
  employee: Employee;
  handleDeleteEmployee: (id: string) => void;
}
const EmployeeItem = ({ employee, handleDeleteEmployee }: EmployeeItemProps) => {
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  return (
    <div className={styles.ManagementItem}>
      <div className='ManagementItem-container'>
        <div className='flex justify-between mt-[10px]'>
          <span className='w-4 h-4 cursor-pointer flex items-center justify-center'>
            <p onClick={() => setIsModelOpen(true)}>
              <Delete></Delete>
            </p>
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
            <p className='bold'>{dayjs(employee.hiredDate).format('MM/DD/YYYY')}</p>
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
      <Modal
        open={isModelOpen}
        onCancel={() => setIsModelOpen(false)}
        footer={[
          <Button key='back' onClick={() => setIsModelOpen(false)}>
            Cancle
          </Button>,
          <Button key='submit' isPrimary onClick={() => handleDeleteEmployee(employee.id)}>
            Delete
          </Button>,
        ]}
      >
        <div className=''>
          <h4 className='text-xl text-left mb-4'>Please confirm</h4>
          <p className='text-sm mb-5'>
            Are you sure you want to delete {employee.position} {employee.name}?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeItem;
