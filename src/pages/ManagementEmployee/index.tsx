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
enum EmployeeTab {
  INFORMATION = 'INFORMATION',
  SALARY = 'SALARY',
  WORK_SCHEDULE = 'WORK_SCHEDULE',
}
export interface Employee {
  id: number;
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
const mockDataPosition: ComboBoxValueProps[] = [
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
const mockDataEmployees: EmployeeResponse = {
  data: [
    {
      id: 1,
      name: 'Theore Cooper',
      position: 'Software Engineer',
      sumManHours: 15,
      hiredDate: '11/09/2024',
      email: 'theore.cooper@example.com',
      phone: '+84 28 366 400 874',
      location: 'Ho Chi Minh City, Vietnam',
    },
    {
      id: 2,
      name: 'Anna Smith',
      position: 'UI/UX Designer',
      sumManHours: 20,
      hiredDate: '10/10/2024',
      email: 'anna.smith@example.com',
      phone: '+84 28 123 456 789',
      location: 'Hanoi, Vietnam',
    },
    {
      id: 3,
      name: 'John Doe',
      position: 'Project Manager',
      sumManHours: 25,
      hiredDate: '09/15/2024',
      email: 'john.doe@example.com',
      phone: '+84 28 987 654 321',
      location: 'Da Nang, Vietnam',
    },
    {
      id: 4,
      name: 'Sarah Lee',
      position: 'QA Tester',
      sumManHours: 18,
      hiredDate: '08/20/2024',
      email: 'sarah.lee@example.com',
      phone: '+84 28 654 321 987',
      location: 'Ho Chi Minh City, Vietnam',
    },
  ],
  pageNumber: 17,
  pageSize: 6,
  totalItems: 100,
  totalPages: 20,
};
const ManagementEmployee = () => {
  const [prodValues, setProdValues] = useState<EmployeeResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangTab = (value: string) => {
    console.log('value', value);
  };
  const handleChangePage = (pageNumber: number) => {
    console.log('pageNumber', pageNumber);
  };
  const handleFilter = () => {
    console.log('handleFilter');
  };
  const handleCancel = () => {
    console.log('object');
    setIsOpen && setIsOpen(false);
  };

  useEffect(() => {
    setProdValues(mockDataEmployees);
  }, []);

  const [hours, setHours] = useState([0]);
  // const [isOpened, setIsOpened]
  const [position, setPosition] = useState<ComboBoxValueProps | null>(null);
  const handleChangeHours = (value: number[]) => {
    console.log('value', value);
    setHours(value);
  };
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
                        <div className='flex items-center justify-between mb-2'>
                          <span>0</span>
                          <span>300</span>
                        </div>
                        <Slider
                          defaultValue={hours}
                          max={300}
                          step={1}
                          onValueChange={handleChangeHours}
                        />
                        <p className='text-right font-[gilroy-light] mt-2 text-xs'>
                          {hours[0]} hours
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger>Hired Date</AccordionTrigger>
                      <AccordionContent className='p-4'>
                        <div className='date'>
                          <DatePicker></DatePicker>
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

                  <Pagination data={prodValues} onPageChange={handleChangePage}></Pagination>
                </div>
                <TabsContent value={EmployeeTab.INFORMATION}>
                  <EmployeeList data={prodValues?.data}></EmployeeList>
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
            <Input name='name'></Input>
          </div>

          <div className='flex gap-[20px]  mt-[20px]'>
            <div className='new-content w-[calc((100%-20px)/2)]'>
              <p className='text-[14px] font-[gilroy-semibold] '>Employee position:</p>
              <ComboBox
                classname='p-0 max-w-full font-[gilroy-light] text-[13px]'
                data={mockDataPosition}
                value={position?.value || mockDataPosition[0].value}
                setValue={setPosition}
              ></ComboBox>
              <div className='border-b-[var(--line-color)] border-b '></div>
            </div>
            <div className='new-content w-[calc((100%-20px)/2)]'>
              <p className='text-[14px] font-[gilroy-semibold] '>Hired Date:</p>
              <div className=''>
                <DatePicker className='w-full pl-0 border-0 border-b-[var(--line-color)] border-b font-[gilroy-light] text-[12px]'></DatePicker>
              </div>
            </div>
          </div>

          <div className='new-content mt-[20px]'>
            <p className='text-[14px] font-[gilroy-semibold] '>Employee Email:</p>
            <Input name='name'></Input>
          </div>
          <div className='new-content mt-[20px]'>
            <p className='text-[14px] font-[gilroy-semibold] '>Employee Phone:</p>
            <Input name='name'></Input>
          </div>
          <div className=' mt-[20px]'>
            <Button onClick={() => {}} isPrimary>
              Add new Employee
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManagementEmployee;
