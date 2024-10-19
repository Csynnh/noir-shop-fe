import { Form, Radio, Space } from 'antd';
import styles from './styles.module.scss';
import Input from '@components/Input';
import DatePicker from '@components/DatePicker';
import { useState } from 'react';
import OderItem from '@components/OderItem';
import Button from '@components/Button';

const Checkout = () => {
  const [summaryOder] = useState(10);
  const [subtotalOder] = useState(360);
  return (
    <div className={styles.Checkout}>
      <div className='checkout-wrapper'>
        <div className='checkout-top'>
          <h1 className='checkout-top-header'>CHECKOUT</h1>
          <p className='checkout-top-desc'>
            Complete your purchase with ease and confidence. Our secure checkout process ensures
            your personal information is protected, while our convenient payment options make it
            simple to finalize your order. Sit back, relax, and let us handle the rest.
          </p>
        </div>
        <div className='checkout-progress'>
          <div className='checkout-progress-label-list'>
            <div className='checkout-progress-label'>Add information</div>
            <div className='checkout-progress-label'>Check your order</div>
            <div className='checkout-progress-label'>Confirm order</div>
          </div>
          <div className='checkout-progress-dot-list'>
            <div className='checkout-progress-dot'></div>
            <div className='checkout-progress-dot'></div>
            <div className='checkout-progress-dot'></div>
          </div>
        </div>
        <div className='checkout-content'>
          <div className='checkout-container'>
            <h5 className='checkout-container-header --mb34'>Your information</h5>
            <Form className='checkout-info-form'>
              <Form.Item>
                <Input name='name' label='Your Name' required></Input>
              </Form.Item>
              <Form.Item>
                <Input name='phone' label='Your Phone' required type='nunber'></Input>
              </Form.Item>
              <Form.Item>
                <Input name='email' label='Your Email' required type='email'></Input>
              </Form.Item>
              <h5 className='checkout-container-header --mb20'>Shipping Method</h5>
              <Form.Item className='checkout-info-shipping'>
                <Radio.Group onChange={() => {}}>
                  <Space direction='vertical'>
                    <Radio value={1}>Go to store</Radio>
                    <Radio value={2}>Standard Shipping ($60.000)</Radio>
                    <Radio value={3}>Express Shipping ($120.000)</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <h5 className='checkout-container-header --mb20'>
                Select your appointment date <span>(*If you go to store)</span>
              </h5>
              <Form.Item className='checkout-info-date'>
                <h5 className='checkout-container-label'>Date: </h5>
                <DatePicker></DatePicker>
              </Form.Item>
            </Form>
          </div>
          <div className='checkout-container flex flex-col justify-between'>
            <div className='checkout-oder-top'>
              <h5 className='checkout-container-header --mb0'>My oder</h5>
              <div className='checkout-oder-subtitle'>
                Summary: <span>{summaryOder}</span> items
              </div>
            </div>
            <div className='checkout-oder-list flex-1'>
              <div className='checkout-oder-list-wrap w-full flex justify-center gap-6 flex-col pr-4 scrollable'>
                {[...Array(10)].map((_, index) => (
                  <OderItem key={index} />
                ))}
              </div>
            </div>
            <div className='checkout-oder-bottom'>
              <h5 className='checkout-container-header --mb0'>Subtotal: </h5>
              <div className='checkout-oder-subtotalOder'>${subtotalOder.toFixed(2)}</div>
            </div>
          </div>
          <div className='checkout-container flex flex-col'>
            <div className='checkout-oder-top'>
              <h5 className='checkout-container-header --mb0'>Payment Method</h5>
            </div>
            <Form className='checkout-info-form !mb-14'>
              <Form.Item className='mb-24'>
                <Radio.Group onChange={() => {}}>
                  <Space direction='vertical' className='grid grid-cols-2 gap-x-10'>
                    <Radio value={1}>Credit Card</Radio>
                    <Radio value={2}>Go to store</Radio>
                    <Radio value={3}>Bank Transfers</Radio>
                    <Radio value={4}>Momo (Apple Pay)</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <h5 className='checkout-container-header --mb0'>Credit Card Required Fields</h5>
              <Form.Item className='mb-0'>
                <div className=' flex items-end gap-[20px] w-full justify-between'>
                  <span className=''>Cardholder Name:</span>
                  <Input name='card-holder-name' maxWidth={220}></Input>
                </div>
              </Form.Item>
              <Form.Item className='mb-0'>
                <div className=' flex items-end gap-[20px] w-full justify-between'>
                  <span className=''>Card number:</span>
                  <Input name='card-holder-number' maxWidth={220}></Input>
                </div>
              </Form.Item>
              <Form.Item className='mb-0'>
                <div className=' flex items-end gap-[20px] w-full justify-between'>
                  <span className=''>Expiration Date(MM/DD):</span>
                  <Input name='card-holder-expire' maxWidth={220} maxLen={4} isExpire></Input>
                </div>
              </Form.Item>
              <Form.Item className='mb-0'>
                <div className=' flex items-end gap-[20px] w-full justify-between'>
                  <span className=''>CVV/CVC:</span>
                  <Input name='card-holder-cvv' maxWidth={220} maxLen={3}></Input>
                </div>
              </Form.Item>
            </Form>
            <div className='checkout-oder-bottom flex flex-col w-full !border-t-[0px]'>
              <div className='checkout-container-subtotal flex items-center justify-between w-full mb-4'>
                <span className='font-[gilroy-light] text-[16px]'>Subtotal:</span>
                <span className='font-[gilroy-light] text-[16px]'>${3600}</span>
              </div>
              <div className='checkout-container-shipping flex items-center justify-between w-full mb-4'>
                <span className='font-[gilroy-light] text-[16px]'>Shipping:</span>
                <span className='font-[gilroy-light] text-[16px]'>${360}</span>
              </div>
              <div className='checkout-container-total  flex items-center justify-between w-full border-t border-t-black pt-4 mb-6'>
                <h5 className='checkout-container-header --mb0'>Subtotal: </h5>
                <div className='checkout-oder-subtotalOder !font-[gilroy] text-[16px]'>
                  ${subtotalOder.toFixed(2)}
                </div>
              </div>
              <Button onClick={() => {}} isPrimary>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
