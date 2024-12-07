import Button from '@components/Button';
import DatePicker from '@components/DatePicker';
import Input from '@components/Input';
import OderItem from '@components/OderItem';
import { ShippingInfo, ShippingResponse } from '@constant/Account';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { useAuth } from '@contexts/AuthContext';
import { snakeToCapitalCase } from '@lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Toaster } from '@ui/sonner';
import { Form, Modal, Radio, RadioChangeEvent, Space } from 'antd';
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  FormCheckoutError,
  formCheckoutReducer,
  FormCheckoutValues,
  initialCheckoutState,
  PaymentMethodType,
  ShippingMethodType,
} from './reducer';
import styles from './styles.module.scss';

export interface ProductCheckoutType {
  id?: string;
  name?: string;
  price?: number;
  variants?: {
    id?: string;
    color?: string;
    image?: string;
    count?: number;
  }[];
}

export enum ProductOperation {
  IN_CREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

const Checkout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const navigator = useNavigate();
  const { products } = (location.state || {}) as { products: ProductCheckoutType[] | undefined };
  const [checkoutState, dispatchCheckout] = useReducer(formCheckoutReducer, initialCheckoutState);
  const [shippingInfoData, setShippingInfoData] = useState<ShippingInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [subtotalOder, setSubTotoal] = useState(
    products?.reduce((total, product) => {
      const productTotal =
        product?.variants?.reduce(
          (variantTotal, variant) => variantTotal + (product?.price ?? 0) * (variant?.count ?? 1),
          0,
        ) ?? 0;
      return total + productTotal;
    }, 0),
  );

  const getListShippingInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BACKEND_ENDPOINT}/api/user-stored-information/${user?.account_id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      if (response.status === 200) {
        const responseData = response.data.responseData;
        const responseInfo = responseData.map((item: ShippingResponse) => {
          return {
            id: item.id,
            address: item.info.address,
            name: item.info.name,
            phone: item.info.phone,
          };
        });

        setShippingInfoData(responseInfo);
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response.data.messageToClient,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatchCheckout({ type: 'UPDATE_FIELD', field: 'products', value: products });
  }, []);

  useEffect(() => {
    getListShippingInfo();
  }, [user]);

  const handleSelecShippingInfo = (value: string) => {
    const shippingInfo = shippingInfoData?.find((item) => item.id === value);
    if (shippingInfo) {
      dispatchCheckout({
        type: 'UPDATE_FIELD',
        field: 'name',
        value: shippingInfo.name,
      });
      dispatchCheckout({
        type: 'UPDATE_FIELD',
        field: 'phone',
        value: shippingInfo.phone,
      });
      dispatchCheckout({
        type: 'UPDATE_FIELD',
        field: 'address',
        value: shippingInfo.address,
      });
    } else {
      dispatchCheckout({
        type: 'UPDATE_FIELD',
        field: 'name',
        value: '',
      });
      dispatchCheckout({
        type: 'UPDATE_FIELD',
        field: 'phone',
        value: '',
      });
      dispatchCheckout({
        type: 'UPDATE_FIELD',
        field: 'address',
        value: '',
      });
    }
  };

  const handleProductChange = (
    method: ProductOperation,
    prod_id: string,
    variant_id: string,
    quality: number,
  ) => {
    const product = products?.find((item) => item.id === prod_id);
    if (product) {
      const productTotal = product?.price;
      let summary = subtotalOder;
      if (method === ProductOperation.IN_CREASE) {
        summary = summary! + productTotal!;
      } else {
        summary = summary! - productTotal!;
      }
      setSubTotoal(summary);
      dispatchCheckout({
        type: 'UPDATE_FIELD',
        field: 'products',
        value: products?.map((item) => {
          if (item.id === prod_id) {
            return {
              ...item,
              variants: item.variants?.map((variant) => {
                if (variant.id === variant_id) {
                  return {
                    ...variant,
                    count: quality,
                  };
                }
                return variant;
              }),
            };
          }
          return item;
        }),
      });
    }
  };

  const handleCreateOder = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BACKEND_ENDPOINT}/api/orders`,
        {
          account_id: user?.account_id,
          shippingMethod: checkoutState.values.shippingMethod,
          paymentMethod: checkoutState.values.paymentMethod,
          products: checkoutState.values.products,
          userInfo: {
            address: checkoutState.values.address,
            name: checkoutState.values.name,
            phone: checkoutState.values.phone,
          },
          price: subtotalOder,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      if (response.status === 201) {
        toast.success('Success!', {
          description: 'Order created successfully',
        });
        dispatchCheckout({ type: 'RESET' });
        setTimeout(() => {
          navigator('/');
        }, 2000);
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response.data.messageToClient,
      });
    }
    setLoading(false);
    setIsConfirmModalOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmModalOpen(false);
  };

  // Handle field change
  const handleCheckoutChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | RadioChangeEvent,
  ) => {
    const { name, value } = e.target;

    // reset error if payment method change
    if (name === 'paymentMethod') {
      const paymentValues = ['cardName', 'cardNumber', 'cardExpired', 'cardCvv'];
      paymentValues.forEach((field) => {
        dispatchCheckout({
          type: 'VALIDATE_FIELD',
          field: field as keyof FormCheckoutError,
          error: '',
        });
      });
    }

    // Update field value
    dispatchCheckout({ type: 'UPDATE_FIELD', field: name as keyof FormCheckoutValues, value });

    // Validate field
    const error = validateField(name as keyof FormCheckoutValues, value);
    dispatchCheckout({ type: 'VALIDATE_FIELD', field: name as keyof FormCheckoutError, error });
  };

  const validateField = (field: keyof FormCheckoutError, value: string): string => {
    switch (field) {
      case 'name':
        return value ? '' : 'Name is required';
      case 'phone':
        return value ? '' : 'Phone is required';
      case 'address':
        return value ? '' : 'Address is required';
      case 'paymentMethod':
        return value ? '' : 'Payment Method is required';
      case 'cardName':
        return value || checkoutState.values.paymentMethod !== PaymentMethodType.CREDIT_CARD
          ? ''
          : 'Cardholder Name is required';
      case 'cardNumber':
        return value || checkoutState.values.paymentMethod !== PaymentMethodType.CREDIT_CARD
          ? ''
          : 'Card Number is required';
      case 'cardExpired':
        return value || checkoutState.values.paymentMethod !== PaymentMethodType.CREDIT_CARD
          ? ''
          : 'Expiration Date is required';
      case 'cardCvv':
        return value || checkoutState.values.paymentMethod !== PaymentMethodType.CREDIT_CARD
          ? ''
          : 'CVV/CVC is required';
      default:
        return '';
    }
  };

  const handleValidateForm = () => {
    const errors: Partial<FormCheckoutError> = {};
    let isValid = true;

    for (const [field, value] of Object.entries(checkoutState.values)) {
      const error = validateField(field as keyof FormCheckoutValues, value.toString());
      if (error) {
        isValid = false;
        errors[field as keyof FormCheckoutError] = error;
      }
    }

    // Update errors in state
    for (const [field, error] of Object.entries(errors)) {
      dispatchCheckout({
        type: 'VALIDATE_FIELD',
        field: field as keyof FormCheckoutError,
        error,
      });
    }

    dispatchCheckout({ type: 'SET_IS_VALID', isValid });
    return isValid;
  };

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
            <div className='mb-6'>
              <Select onValueChange={handleSelecShippingInfo}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select Shipping Info' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem key={'EMPTY'} value={'EMPTY'}>
                      <SelectLabel>New</SelectLabel>
                    </SelectItem>
                    {shippingInfoData?.map((item) => (
                      <SelectItem key={item?.id} value={item?.id}>
                        <SelectLabel>
                          {item?.name} - {item?.phone}
                        </SelectLabel>
                        <SelectLabel>{item?.address}</SelectLabel>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Form className='checkout-info-form'>
              <Form.Item>
                <Input
                  name='name'
                  label='Your Name'
                  required
                  onChange={handleCheckoutChange}
                  error={checkoutState.errors.name}
                  defaultValue={checkoutState.values.name}
                ></Input>
              </Form.Item>
              <Form.Item>
                <Input
                  name='phone'
                  label='Your Phone'
                  required
                  type='nunber'
                  onChange={handleCheckoutChange}
                  error={checkoutState.errors.phone}
                  defaultValue={checkoutState.values.phone}
                ></Input>
              </Form.Item>
              <Form.Item>
                <Input
                  name='address'
                  label='Your Address'
                  required
                  onChange={handleCheckoutChange}
                  error={checkoutState.errors.address}
                  defaultValue={checkoutState.values.address}
                ></Input>
              </Form.Item>
              <h5 className='checkout-container-header --mb20'>Shipping Method</h5>
              <Form.Item className='checkout-info-shipping'>
                <Radio.Group
                  name='shippingMethod'
                  onChange={(e) => {
                    dispatchCheckout({
                      type: 'UPDATE_FIELD',
                      field: e.target.name! as keyof FormCheckoutValues,
                      value: e.target.value,
                    });
                  }}
                  value={checkoutState.values.shippingMethod}
                >
                  <Space direction='vertical'>
                    {Object.entries(ShippingMethodType).map(([value, label]) => (
                      <Radio key={value} value={value}>
                        {snakeToCapitalCase(label)}
                      </Radio>
                    ))}
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
                Summary: <span>{products?.length || 0}</span> items
              </div>
            </div>
            <div className='checkout-oder-list flex-1'>
              <div className='checkout-oder-list-wrap w-full flex justify-center gap-6 flex-col pr-4 scrollable'>
                {products?.map((product) =>
                  product?.variants?.map((variant) => (
                    <OderItem
                      key={product.id}
                      data={product}
                      variant={variant}
                      onChange={handleProductChange}
                    />
                  )),
                )}
              </div>
            </div>
            <div className='checkout-oder-bottom'>
              <h5 className='checkout-container-header --mb0'>Subtotal: </h5>
              <div className='checkout-oder-subtotalOder'>${subtotalOder?.toFixed(2)}</div>
            </div>
          </div>
          <div className='checkout-container flex flex-col'>
            <div className='checkout-oder-top'>
              <h5 className='checkout-container-header --mb0'>Payment Method</h5>
            </div>
            <Form className='checkout-info-form !mb-14'>
              <Form.Item className='mb-24'>
                <Radio.Group
                  name='paymentMethod'
                  onChange={handleCheckoutChange}
                  value={checkoutState.values.paymentMethod}
                >
                  <Space direction='vertical'>
                    {Object.entries(PaymentMethodType).map(([value, label]) => (
                      <Radio key={value} value={value}>
                        {snakeToCapitalCase(label)}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
              <div className=''>
                {checkoutState.values.paymentMethod === PaymentMethodType.CREDIT_CARD ? (
                  <>
                    <h5 className='checkout-container-header --mb0'>Credit Card Required Fields</h5>
                    <Form.Item className='mb-0'>
                      <div className=' flex items-end gap-[20px] w-full justify-between'>
                        <span className=''>Cardholder Name:</span>
                        <Input
                          name='cardName'
                          maxWidth={220}
                          error={checkoutState.errors.cardName}
                          onChange={handleCheckoutChange}
                          defaultValue={checkoutState.values.cardName}
                        ></Input>
                      </div>
                    </Form.Item>
                    <Form.Item className='mb-0'>
                      <div className=' flex items-end gap-[20px] w-full justify-between'>
                        <span className=''>Card number:</span>
                        <Input
                          name='cardNumber'
                          maxWidth={220}
                          onChange={handleCheckoutChange}
                          error={checkoutState.errors.cardNumber}
                          defaultValue={checkoutState.values.cardNumber}
                        ></Input>
                      </div>
                    </Form.Item>
                    <Form.Item className='mb-0'>
                      <div className=' flex items-end gap-[20px] w-full justify-between'>
                        <span className=''>Expiration Date(MM/DD):</span>
                        <Input
                          name='cardExpired'
                          maxWidth={220}
                          maxLen={4}
                          isExpire
                          onChange={handleCheckoutChange}
                          error={checkoutState.errors.cardExpired}
                          defaultValue={checkoutState.values.cardExpired}
                        ></Input>
                      </div>
                    </Form.Item>
                    <Form.Item className='mb-0'>
                      <div className=' flex items-end gap-[20px] w-full justify-between'>
                        <span className=''>CVV/CVC:</span>
                        <Input
                          name='cardCvv'
                          error={checkoutState.errors.cardCvv}
                          maxWidth={220}
                          maxLen={3}
                          onChange={handleCheckoutChange}
                          defaultValue={checkoutState.values.cardCvv}
                        ></Input>
                      </div>
                    </Form.Item>
                  </>
                ) : checkoutState.values.paymentMethod === PaymentMethodType.BANK_TRANSFER ? (
                  <div className='w-[60%] mx-auto'>
                    <img
                      src='https://noirstorage.blob.core.windows.net/images/IMG_7005.jpg'
                      alt=''
                      className=''
                    />
                  </div>
                ) : null}
              </div>
            </Form>
            <div className='checkout-oder-bottom flex flex-col w-full !border-t-[0px] mt-auto'>
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
                  ${subtotalOder?.toFixed(2)}
                </div>
              </div>
              <Button
                onClick={() => {
                  const isValid = handleValidateForm();
                  if (isValid) setIsConfirmModalOpen(true);
                }}
                isPrimary
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
        <>
          <Modal
            title='Confirm Order'
            open={isConfirmModalOpen}
            onOk={handleCreateOder}
            onCancel={handleCancel}
            footer={[
              <Button key='back' onClick={handleCancel} disabled={loading}>
                Cancle
              </Button>,
              <Button key='submit' isPrimary loading={loading} onClick={handleCreateOder}>
                Submit
              </Button>,
            ]}
          >
            <div className='mb-10 italic'>
              Please confirm your information before proceeding with the order
            </div>
          </Modal>
        </>
        <Toaster position='top-right' richColors />
      </div>
    </div>
  );
};

export default Checkout;
