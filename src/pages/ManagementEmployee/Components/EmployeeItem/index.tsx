import { Employee, PositionDummyData } from '@pages/ManagementEmployee';
import React, { useState } from 'react';
import styles from './ManagementItem.module.scss';
import Delete from '@components/Icons/Delete';
import Option from '@components/Icons/Option';
import Avatar from '@components/Icons/Avatar';
import Mail from '@components/Icons/Mail';
import Phone from '@components/Icons/Phone';
import dayjs from 'dayjs';
import { Modal } from 'antd';
import Button from '@components/Button';
import { ComboBox, ComboBoxValueProps } from '@components/ComboBox';
import DatePicker from '@components/DatePicker';
import { parse } from 'path';
import axios from 'axios';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { toast } from 'sonner';
import { useAuth } from '@contexts/AuthContext';
import Input from '@components/Input';

interface EmployeeItemProps {
  employee: Employee;
  handleDeleteEmployee: (id: string) => void;
  refecth: (a: boolean) => void;
}
const EmployeeItem = ({ employee, handleDeleteEmployee, refecth }: EmployeeItemProps) => {
  const { user } = useAuth();
  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [name, setName] = useState<string>(employee.name);
  const [position, setPosition] = useState<ComboBoxValueProps | null>(
    PositionDummyData.find((item) => item.value === employee.position)!,
  ); //
  const [manHours, setManHours] = useState<number>(employee.sumManHours);
  const [email, setEmail] = useState<string>(employee.email);
  const [phone, setPhone] = useState<string>(employee.phone);
  const [hired_date, setHired_date] = useState<Date | undefined>(
    dayjs(employee.hiredDate).toDate(),
  );

  const handleUpdateEmployee = async () => {
    try {
      const response = await axios.put(
        `${API_BACKEND_ENDPOINT}/api/employee/${employee.id}`,
        {
          name: name,
          position: position?.value,
          man_hours: manHours,
          email: email,
          phone: phone,
          hired_date: dayjs(hired_date).toDate(),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success('Successfully!', {
          description: 'Successfully update employee',
        });
        refecth(true);
        setIsOpenUpdate(false);
      }
    } catch (error) {
      console.error('Failed to update employee: ', error);
      toast.error('Error!', {
        description: 'Failed to update employee',
      });
    }
  };
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
            <p className='block' onClick={() => setIsOpenUpdate(true)}>
              <Option></Option>
            </p>
          </span>
        </div>
        <div className='ManagementItem-infor'>
          <Avatar></Avatar>
          <p className='bold'>{employee.name}</p>
          <p className='light'>
            {
              PositionDummyData.find(
                (item) => item.value.toLocaleLowerCase() === employee.position.toLocaleLowerCase(),
              )?.label
            }
          </p>
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
      <Modal
        open={isOpenUpdate}
        onCancel={() => setIsOpenUpdate(false)}
        width={'30%'}
        footer={
          [
            // <Button key='back' onClick={handleCancel} loading={false}>
            //   Cancle
            // </Button>,
            // <Button key='submit' isPrimary loading={false} onClick={handleOk}>
            //   Save
            // </Button>,
          ]
        }
      >
        <div className=''>
          <h2 className='text-2xl font-[gilroy-bold] mb-7'>Update Employee</h2>
          <div className='new-content'>
            <p className='text-[14px] font-[gilroy-semibold] '>Employee name:</p>
            <Input
              name='name'
              defaultValue={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Input>
          </div>

          <div className='flex gap-[20px]  mt-[20px]'>
            <div className='new-content w-[calc((100%-20px)/2)]'>
              <p className='text-[14px] font-[gilroy-semibold] '>Employee position:</p>
              <ComboBox
                classname='p-0 max-w-full font-[gilroy-light] text-[13px]'
                data={PositionDummyData}
                value={position?.value!}
                setValue={setPosition}
              ></ComboBox>
              <div className='border-b-[var(--line-color)] border-b '></div>
            </div>
            <div className='new-content w-[calc((100%-20px)/2)]'>
              <p className='text-[14px] font-[gilroy-semibold] '>Hired Date:</p>
              <div className=''>
                <DatePicker
                  className='w-full pl-0 border-0 border-b-[var(--line-color)] border-b font-[gilroy-light] text-[12px]'
                  onChange={setHired_date}
                  defaultValue={dayjs(employee.hiredDate).toDate()}
                ></DatePicker>
              </div>
            </div>
          </div>

          <div className='new-content mt-[20px]'>
            <p className='text-[14px] font-[gilroy-semibold] '>Employee Email:</p>
            <Input
              name='email'
              defaultValue={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input>
          </div>
          <div className='new-content mt-[20px]'>
            <p className='text-[14px] font-[gilroy-semibold] '>Sum man-hours:</p>
            <Input
              type='number'
              name='sum-hours'
              defaultValue={(manHours || 0).toString()}
              onChange={(e) => {
                setManHours(parseInt(e.target.value));
              }}
            ></Input>
          </div>
          <div className='new-content mt-[20px]'>
            <p className='text-[14px] font-[gilroy-semibold] '>Employee Phone:</p>
            <Input
              name='name'
              defaultValue={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            ></Input>
          </div>
          <div className=' mt-[20px]'>
            <Button
              onClick={() => {
                handleUpdateEmployee();
              }}
              isPrimary
            >
              Update Employee
            </Button>
          </div>
        </div>
      </Modal>{' '}
    </div>
  );
};

export default EmployeeItem;
