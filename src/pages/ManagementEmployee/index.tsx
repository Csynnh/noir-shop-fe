import React, { useEffect, useState } from 'react';
import styles from './ManagementEmployee.module.scss';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { snakeToCapitalCase } from '@lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';
import Filter from '@components/Icons/Filter';
import Pagination from '@components/Pagination';
import { Slider } from '@ui/slider';
import Button from '@components/Button';
import DatePicker from '@components/DatePicker';
import AddNew from '@components/Icons/AddNew';
import Search from '@components/Icons/Search';
import EmployeeList from './Components/EmployeeList';
import { Modal } from 'antd';
import Input from '@components/Input';
import { ComboBox, ComboBoxValueProps } from '@components/ComboBox';
import axios from 'axios';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { Console } from 'console';
import { useAuth } from '@contexts/AuthContext';
import { set } from 'lodash';
import { toast } from 'sonner';
import { Toaster } from '@ui/sonner';
import dayjs from 'dayjs';
enum EmployeeTab {
  INFORMATION = 'INFORMATION',
  SALARY = 'SALARY',
  WORK_SCHEDULE = 'WORK_SCHEDULE',
}
export interface Employee {
  id: string;
  name: string;
  position: string;
  sumManHours: number;
  hiredDate: string;
  email: string;
  phone: string;
  location: string;
}
export interface EmployeeResponse {
  data: Employee[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
const PositionDummyData: ComboBoxValueProps[] = [
  {
    label: 'Manager',
    value: 'Manager',
  },
  {
    label: 'Cashier',
    value: 'Cashier',
  },
  {
    label: 'Customer Service',
    value: 'Customer_Service',
  },
];

const ManagementEmployee = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sumManHourFrom, setSumManHourFrom] = useState<number>(0);
  const [sumManHourTo, setSumManHourTo] = useState<number>(0);
  const [hiredDate, setHiredDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [position, setPosition] = useState<ComboBoxValueProps | null>(PositionDummyData[0]); //
  const [manHours, setManHours] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [hired_date, setHired_date] = useState<Date | undefined>(dayjs().toDate());
  const [avatar, setAvatar] = useState<string>('');

  const getListEmployees = async () => {
    try {
      const response = await axios.get(`${API_BACKEND_ENDPOINT}/api/employees`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.status === 200) {
        const responseData = response.data.responseData;
        console.log('responseData', responseData);
        const employees: Employee[] = responseData.map((employee: any) => ({
          id: employee.id,
          name: employee.name,
          position: employee.position,
          sumManHours: employee.man_hours,
          hiredDate: employee.hired_date,
          email: employee.email,
          phone: employee.phone,
          location: employee.location,
        }));
        setData(employees);
      }
    } catch (error) {
      console.error('Failed to fetch employees: ', error);
    }
  };

  const handleFilter = async () => {
    console.log('sumManHourFrom', sumManHourFrom);
    console.log('sumManHourTo', sumManHourTo);
    try {
      if (!sumManHourFrom && !sumManHourTo) {
        toast.error('Error!', {
          description: "Min sum man-hour and Max sum man-hour can't be 0 at the same time",
        });
        return;
      } else {
        if (sumManHourFrom >= sumManHourTo) {
          toast.error('Error!', {
            description: "Min sum man-hour can't be greater than or equal to Max sum man-hour.",
          });
          return;
        }
      }
      const response = await axios.get(
        `${API_BACKEND_ENDPOINT}/api/employees?${hiredDate ? 'hiredDate=' + hiredDate?.toISOString() + '&' : ''}sumManHoursFrom=${sumManHourFrom}&sumManHoursTo=${sumManHourTo}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      if (response.status === 200) {
        const responseData = response.data.responseData;
        console.log('responseData', responseData);
        const employees: Employee[] = responseData.map((employee: any) => ({
          id: employee.id,
          name: employee.name,
          position: employee.position,
          sumManHours: employee.man_hours,
          hiredDate: employee.hired_date,
          email: employee.email,
          phone: employee.phone,
          location: employee.location,
        }));
        setData(employees);
      }
    } catch (error) {
      console.error('Failed to fetch employees: ', error);
    }
  };

  const addNewEmployee = async () => {
    // console.log('name',name);
    // console.log('position',position);
    // console.log('sum-hours',manHours);
    // console.log('hireDate',hired_date);
    // console.log('email',email);
    // console.log('phone',phone);

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}(\s?\(?\d+\)?[\s\-]?)?[\d\s\-]{6,}$/;

    if (!emailRegex.test(email) && !phoneRegex.test(phone)) {
      toast.error('Invalid Email and Phone Number!', {
        description: 'Please provide a valid email address and phone number.',
      });
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Invalid Email!', {
        description: 'Please provide a valid email address.',
      });
      return;
    }

    // Validate phone
    if (!phoneRegex.test(phone)) {
      toast.error('Invalid Phone Number!', {
        description: 'Please provide a valid phone number.',
      });
      return;
    }
    try {
      console.log('run addNewEmployee');
      const response = await axios.post(
        `${API_BACKEND_ENDPOINT}/api/employee`,
        {
          name: name,
          position: position?.value,
          man_hours: manHours,
          hired_date: hired_date?.toISOString(),
          email: email,
          phone: phone,
          avatar: 'string',
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      if (response.status === 201) {
        toast.success('Successfully!', {
          description: 'Successfully add new employee',
        });
        getListEmployees();
      }
    } catch (error) {
      console.error('Failed to add new employee: ', error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      const response = await axios.delete(`${API_BACKEND_ENDPOINT}/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.status === 200) {
        toast.success('Successfully!', {
          description: 'Successfully delete employee',
        });
        getListEmployees();
      }
    } catch (error) {
      console.error('Failed to fetch employees: ', error);
      toast.error('Error!', {
        description: 'Failed to delete employee',
      });
    }
  };

  const handleCancel = () => {
    console.log('object');
    setIsOpen && setIsOpen(false);
  };
  const handleChangTab = (value: string) => {
    console.log('value', value);
  };
  const handleChangePage = (pageNumber: number) => {
    console.log('pageNumber', pageNumber);
  };

  useEffect(() => {
    if (user) {
      // console.log('user', user);
      getListEmployees();
    }
  }, [user]);

  return (
    <div className={styles.ManagementEmployee}>
      <div className='ManagementEmployee-container'>
        <h1 className='ManagementEmployee-header'>Management Employee</h1>
        <div className='ManagementEmployee-tab'>
          <Tabs
            defaultValue={EmployeeTab.INFORMATION}
            className='w-full'
            onValueChange={handleChangTab}
          >
            <TabsList>
              {Object.values(EmployeeTab).map((type) => (
                <TabsTrigger key={type} value={type}>
                  {snakeToCapitalCase(type)}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className='ManagementEmployee-content'>
              <div className='ManagementEmployee-left'>
                <div className='ManagementEmployee-filter'>
                  <Filter></Filter>
                  Filter
                </div>
                <div className='ManagementEmployee-filter-block'>
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-2'>
                      <AccordionTrigger>Sum man-hours</AccordionTrigger>
                      <AccordionContent className='p-4 mb-2'>
                        <div className='flex gap-[10px]'>
                          <div className='w-[calc((100%-10px)/2)]'>
                            <Input
                              name='fromHours'
                              label='Min'
                              defaultValue='0'
                              onChange={(e) => setSumManHourFrom(parseInt(e.target.value))}
                            ></Input>
                          </div>
                          <div className='w-[calc((100%-10px)/2)]'>
                            <Input
                              name='toHours'
                              label='Max'
                              defaultValue='0'
                              onChange={(e) => setSumManHourTo(parseInt(e.target.value))}
                            ></Input>
                          </div>
                        </div>
                        {/* <input type='number' placeholder='hours'className='border-b border-b-[var(--line-color)] w-full' onChange={e=>setSumManHour(parseInt(e.target.value))}/> */}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger>Hired Date</AccordionTrigger>
                      <AccordionContent className='p-4'>
                        <div className='date'>
                          <DatePicker onChange={setHiredDate}></DatePicker>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button onClick={handleFilter} isPrimary>
                    Filter Now
                  </Button>
                </div>
              </div>
              <div className='ManagementEmployee-right'>
                {' '}
                <div className='flex items-center justify-between  mb-5'>
                  <div
                    className='flex items-center gap-3 cursor-pointer'
                    onClick={() => setIsOpen(true)}
                  >
                    <span>
                      <AddNew></AddNew>
                    </span>
                    <span className='underline text-[15px]'>Add New Employee</span>
                  </div>

                  {/* <Pagination data={data} onPageChange={handleChangePage}></Pagination> */}
                </div>
                <TabsContent value={EmployeeTab.INFORMATION}>
                  <EmployeeList data={data} handleDeleteEmployee={handleDeleteEmployee}></EmployeeList>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
      <Modal
        open={isOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
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
          <h2 className='text-2xl font-[gilroy-bold] mb-7'>Add new product</h2>
          <div className='new-content'>
            <p className='text-[14px] font-[gilroy-semibold] '>Employee name:</p>
            <Input name='name' onChange={(e) => setName(e.target.value)}></Input>
          </div>

          <div className='flex gap-[20px]  mt-[20px]'>
            <div className='new-content w-[calc((100%-20px)/2)]'>
              <p className='text-[14px] font-[gilroy-semibold] '>Employee position:</p>
              <ComboBox
                classname='p-0 max-w-full font-[gilroy-light] text-[13px]'
                data={PositionDummyData}
                value={position?.value || PositionDummyData[0].value}
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
                ></DatePicker>
              </div>
            </div>
          </div>

          <div className='new-content mt-[20px]'>
            <p className='text-[14px] font-[gilroy-semibold] '>Employee Email:</p>
            <Input name='name' onChange={(e) => setEmail(e.target.value)}></Input>
          </div>
          <div className='new-content mt-[20px]'>
            <p className='text-[14px] font-[gilroy-semibold] '>Employee Phone:</p>
            <Input name='name' onChange={(e) => setPhone(e.target.value)}></Input>
          </div>
          <div className=' mt-[20px]'>
            <Button
              onClick={() => {
                addNewEmployee();
              }}
              isPrimary
            >
              Add new Employee
            </Button>
          </div>
        </div>
      </Modal>{' '}
      <Toaster position='top-right' richColors />
    </div>
  );
};

export default ManagementEmployee;
