import Button from '@components/Button';
import AccountGirl from '@components/Icons/AccountGirl';
import Canceled from '@components/Icons/Cancled';
import Edit from '@components/Icons/Edit';
import Finished from '@components/Icons/Finished';
import HistoryPurchase from '@components/Icons/HistoryPurchase';
import Preparing from '@components/Icons/Preparing';
import Returning from '@components/Icons/Returning';
import Shipping from '@components/Icons/Shipping';
import { snakeToCapitalCase } from '@lib/utils';
import { useState } from 'react';
import { Form, Modal } from 'antd';
import Input from '@components/Input';
export enum OrderStatus {
  HISTORY_PURCHASE = 'HISTORY_PURCHASE',
  PREPARING = 'PREPARING',
  SHIPPING = 'SHIPPING',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
  RETURNING = 'RETURNING',
}

const mockData = {
  id: '00131991293',
  prods: [
    {
      id: '001',
      name: 'Product Name',
      price: 120,
      quantity: 2,
      img: 'https://via.placeholder.com/150',
      color: '#000',
    },
    {
      id: '002',
      name: 'Product Name',
      price: 120,
      quantity: 2,
      img: 'https://via.placeholder.com/150',
      color: '#000',
    },
    {
      id: '003',
      name: 'Product Name',
      price: 120,
      quantity: 2,
      img: 'https://via.placeholder.com/150',
      color: '#000',
    },
  ],
};
const Account = () => {
  const [selectedOderTracking, setSelectedOderTracking] = useState<OrderStatus>(
    OrderStatus.HISTORY_PURCHASE,
  );
  const [isAccountInfoModalOpen, setIsAccountInfoModalOpen] = useState(false);
  const [isShipppingInfoModalOpen, setShipppingInfoModalOpen] = useState(false);

  const handleOk = () => {
    setIsAccountInfoModalOpen(false);
  };

  const handleCancel = () => {
    setIsAccountInfoModalOpen(false);
    setShipppingInfoModalOpen(false);
  };

  const handleDeleteAccount = () => {
    console.log('Delete Account');
  };
  const handleSignOut = () => {
    console.log('Delete Account');
  };
  const handleOpenShippingModel = () => {
    setShipppingInfoModalOpen(true);
  };
  const handleOpenInfoModel = () => {
    setIsAccountInfoModalOpen(true);
  };
  const handleSelectOrderTracking = (status: OrderStatus) => {
    setSelectedOderTracking(status);
  };
  return (
    <div className='px-16 pb-14'>
      <div>
        <div className='flex justify-between items-end pb-7 border-b-[0.5px] border-[#c9c5c9]'>
          <div className=''>
            <AccountGirl></AccountGirl>
          </div>
          <div className='flex items-center gap-4 max-w-[360px] w-full'>
            <Button onClick={handleDeleteAccount} className=''>
              Delete Account
            </Button>
            <Button onClick={handleSignOut} isPrimary className=''>
              Sign Out
            </Button>
          </div>
        </div>
        <div className='flex border-b-[0.5px] border-[#c9c5c9] mb-[57px]'>
          <div className='pt-[84px] pr-[61px] pb-[55px] border-r-[0.5px] border-[#c9c5c9] min-w-[36%]'>
            <h5 className='text-[20px] leading-[1.5] mb-7 flex items-center justify-between'>
              My Information
              <span onClick={handleOpenInfoModel} className='cursor-pointer'>
                <Edit></Edit>
              </span>
            </h5>
            <div className='flex flex-col gap-[14px] mb-7'>
              <div className='flex items-center justify-between'>
                <span className='text-[15px] min-w-[110px]'>Username:</span>
                <span className='text-[14px] font-[gilroy-light] min-w-[180px]'>John Doe</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-[15px] min-w-[110px]'>Email:</span>
                <span className='text-[14px] font-[gilroy-light] min-w-[180px]'>
                  email@mail.com
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-[15px] min-w-[110px]'>Phone Number:</span>
                <span className='text-[14px] font-[gilroy-light] min-w-[180px]'>+84333333333</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-[15px] min-w-[110px]'>Password:</span>
                <span className='text-[14px] font-[gilroy-light] min-w-[180px]'>
                  **************
                </span>
              </div>
            </div>
          </div>
          <div className='pt-[84px] pl-[34px] pb-[55px] flex-1'>
            <h5 className='text-[20px] leading-[1.5] mb-7'>Shipping Information</h5>
            <div className='grid grid-cols-3 gap-4'>
              <div className='border-[0.5px] border-[#c9c5c9] px-4 py-6'>
                <div className=''>
                  <span className='text-[15px]'>Address: </span>
                  <span className='font-[gilroy-light] text-sm leading-[2]'>
                    012 TowerName, 123 Street, 456 City, 789 Country
                  </span>
                </div>
                <div className=''>
                  <span className='text-[15px]'>Name: </span>
                  <span className='font-[gilroy-light] text-sm leading-[2]'>John Doe</span>
                </div>
                <div className=''>
                  <span className='text-[15px]'>Phone Number: </span>
                  <span className='font-[gilroy-light] text-sm leading-[2]'>+84333333333</span>
                </div>
              </div>
              <div className='border-[0.5px] border-[#c9c5c9] px-4 py-6'>
                <div className=''>
                  <span className='text-[15px]'>Address: </span>
                  <span className='font-[gilroy-light] text-sm leading-[2]'>
                    012 TowerName, 123 Street, 456 City, 789 Country
                  </span>
                </div>
                <div className=''>
                  <span className='text-[15px]'>Name: </span>
                  <span className='font-[gilroy-light] text-sm leading-[2]'>John Doe</span>
                </div>
                <div className=''>
                  <span className='text-[15px]'>Phone Number: </span>
                  <span className='font-[gilroy-light] text-sm leading-[2]'>+84333333333</span>
                </div>
              </div>
              <div className='item'>
                <Button onClick={handleOpenShippingModel} className='h-full'>
                  Add More
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='oder'>
          <h5 className='text-[20px] leading-[1.5] mb-10'>Track My Oder</h5>
          <div className=''>
            <div className='mb-[50px] flex items-center justify-between'>
              <div className='flex flex-col justify-center items-center gap-2'>
                <div
                  className=''
                  onClick={() => handleSelectOrderTracking(OrderStatus.HISTORY_PURCHASE)}
                >
                  <HistoryPurchase
                    isActive={selectedOderTracking === OrderStatus.HISTORY_PURCHASE}
                  ></HistoryPurchase>
                </div>
                <span className='text-sm'>History Purchase</span>
              </div>
              <div className='flex flex-col justify-center items-center gap-2'>
                <div className='' onClick={() => handleSelectOrderTracking(OrderStatus.PREPARING)}>
                  <Preparing isActive={selectedOderTracking === OrderStatus.PREPARING}></Preparing>
                </div>
                <span className='text-sm'>Preparing</span>
              </div>
              <div className='flex flex-col justify-center items-center gap-2'>
                <div className='' onClick={() => handleSelectOrderTracking(OrderStatus.SHIPPING)}>
                  <Shipping isActive={selectedOderTracking === OrderStatus.SHIPPING}></Shipping>
                </div>
                <span className='text-sm'>Shipping</span>
              </div>
              <div className='flex flex-col justify-center items-center gap-2'>
                <div className='' onClick={() => handleSelectOrderTracking(OrderStatus.FINISHED)}>
                  <Finished isActive={selectedOderTracking === OrderStatus.FINISHED}></Finished>
                </div>
                <span className='text-sm'>Finished</span>
              </div>
              <div className='flex flex-col justify-center items-center gap-2'>
                <div className='' onClick={() => handleSelectOrderTracking(OrderStatus.CANCELED)}>
                  <Canceled isActive={selectedOderTracking === OrderStatus.CANCELED}></Canceled>
                </div>
                <span className='text-sm'>Canceled</span>
              </div>
              <div className='flex flex-col justify-center items-center gap-2'>
                <div className='' onClick={() => handleSelectOrderTracking(OrderStatus.RETURNING)}>
                  <Returning isActive={selectedOderTracking === OrderStatus.RETURNING}></Returning>
                </div>
                <span className='text-sm'>Returning</span>
              </div>
            </div>
            <div className='border-[0.5px] border-[#c9c5c9] px-8 py-[30px]'>
              <div className='flex items-center justify-between mb-6'>
                <h5>{snakeToCapitalCase(selectedOderTracking)}</h5>
                <p className='text-sm font-[gilroy-light]'>
                  Summary: <span className='font-[gilroy]'>{mockData.prods.length}</span> items
                </p>
              </div>
              <div className='bg-[#EBF4EB] py-5 px-8'>
                <h5 className='mb-4 text-sm'>ID: {mockData.id}</h5>
                <div className='flex flex-col gap-4'>
                  {mockData.prods.map((prod) => (
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <div className='flex-[0_0_86px]'>
                          <img src={prod.img} alt='' />
                        </div>
                        <div className=''>
                          <h5 className='text-sm leading-[1.5]'>Product Name</h5>
                          <div className='text-xs font-[gilroy-light]'>
                            Color:{' '}
                            <span
                              className={`w-3 h-3 rounded-full bg-[${prod.color}] inline-block`}
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div className='text-sm leading-[1.5] font-[gilroy-light]'>
                        <span>{prod.quantity}x</span>
                      </div>
                      <div className='text-sm leading-[1.5] font-[gilroy-light]'>
                        <span>${prod.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                  <div className='flex items-center justify-between font-[gilroy-light] pt-4 border-t border-[#c9c5c9]'>
                    <span>Total:</span>
                    <span>
                      $
                      {mockData.prods
                        .reduce((total, product) => {
                          return total + product.price * product.quantity;
                        }, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title='My Information'
        open={isAccountInfoModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel} loading={false}>
            Cancle
          </Button>,
          <Button key='submit' isPrimary loading={false} onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Form className=''>
          <Form.Item>
            <Input name='username' label='Username'></Input>
          </Form.Item>
          <Form.Item>
            <Input name='email' label='Email' type='email'></Input>
          </Form.Item>
          <Form.Item>
            <Input name='password' label='Password' type='password'></Input>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Shipping Information'
        open={isShipppingInfoModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back_ship' onClick={handleCancel} loading={false}>
            Cancle
          </Button>,
          <Button key='submit_ship' isPrimary loading={false} onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Form className=''>
          <Form.Item>
            <Input name='address' label='Address'></Input>
          </Form.Item>
          <Form.Item>
            <Input name='name' label='Name'></Input>
          </Form.Item>
          <Form.Item>
            <Input name='phone' label='Phone Number' type='number'></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Account;
