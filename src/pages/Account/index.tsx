import Button from '@components/Button';
import AccountGirl from '@components/Icons/AccountGirl';
import styles from './Account.module.scss';
import Close from '@components/Icons/Close';
import Edit from '@components/Icons/Edit';
import Finished from '@components/Icons/Finished';
import HistoryPurchase from '@components/Icons/HistoryPurchase';
import Preparing from '@components/Icons/Preparing';
import Returning from '@components/Icons/Returning';
import Shipping from '@components/Icons/Shipping';
import { ShippingInfo, ShippingResponse } from '@constant/Account';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { useAuth, UserInfo } from '@contexts/AuthContext';
import { snakeToCapitalCase } from '@lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@ui/alert-dialog';
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChangeInformationModel from './Models/ChangeInfomationModel';
import ChangePasswordModel from './Models/ChangePasswordModel';
import ChangeShippingInfoModel from './Models/ChangeShippingInfoModel';
import SenOTPModel from './Models/SendOTPModel';
import SubmitOTPModel from './Models/SubmitOTPModel';
import {
  formPasswordReducer,
  formShippingInfoReducer,
  formUserInfoReducer,
  initialPasswordState,
  initialShippingInfoState,
  initialUserInfoState,
} from './reducer';
export enum OrderStatus {
  ALL = 'ALL',
  CONFIRMING = 'CONFIRMING',
  PREPARING = 'PREPARING',
  SHIPPING = 'SHIPPING',
  COMPLETED = 'COMPLETED',
}

export enum ModelState {
  ACCOUNT_INFO = 'ACCOUNT_INFO',
  SHIPPING_INFO = 'SHIPPING_INFO',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
}

interface ProductVariant {
  Size: string;
  Color: string;
  Images: string;
  Quantity: number;
}

interface Product {
  name: string;
  price: number;
  inventory: number;
  type: string;
  variants: ProductVariant[];
}
interface OrderType {
  id: string;
  prods: Product[];
}

const Account = () => {
  const navigate = useNavigate();
  const { user: userInfo, removeToken, saveUserInfo } = useAuth();
  const [userInfoState, dispatchUserInfo] = useReducer(formUserInfoReducer, initialUserInfoState);
  const [passwordState, dispatchPassword] = useReducer(formPasswordReducer, initialPasswordState);
  const [formShippingInfoState, dispatchShippingInfo] = useReducer(
    formShippingInfoReducer,
    initialShippingInfoState,
  );
  const [selectedOderTracking, setSelectedOderTracking] = useState<string>(OrderStatus.ALL);
  const [otpValue, setOtpValue] = useState('');
  const [isAccountInfoModalOpen, setIsAccountInfoModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isShipppingInfoModalOpen, setShipppingInfoModalOpen] = useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shippingInfoData, setShippingInfoData] = useState<ShippingInfo[] | []>([]);
  const [modelState, setModelState] = useState<ModelState | null>(null);
  const [oderData, setOderData] = useState<OrderType[]>([]);
  // pre-check if user is logged in
  useEffect(() => {
    if (userInfo) {
      const isExpired = new Date(userInfo.expiredTime) < new Date();
      if (!isExpired) {
        getListShippingInfo();
        Object.keys(userInfo).forEach((key) => {
          dispatchUserInfo({ type: 'SET_FIELD', field: key, value: (userInfo as any)[key] });
        });
        return;
      }
    }
    removeToken();
    navigate('/sign-in', {
      state: {
        from: {
          pathname: '/account',
        },
      },
    });
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && selectedOderTracking) {
      getListOderStatus();
    }
  }, [userInfo, selectedOderTracking]);

  // Get user stored information
  const getListShippingInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BACKEND_ENDPOINT}/api/user-stored-information/${userInfo?.account_id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
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

  const getListOderStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BACKEND_ENDPOINT}/api/orders/account/${userInfo?.account_id}/status/${OrderStatus[selectedOderTracking as keyof typeof OrderStatus]}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        },
      );
      if (response.status === 200) {
        const responseData = response.data.responseData;
        setOderData(
          responseData.map((item: any) => ({
            id: '#' + item.id.slice(0, 8),
            prods: item.list_products,
          })),
        );
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: "Can't get order status",
      });
    }
    setLoading(false);
  };

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatchShippingInfo({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatchUserInfo({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  const handlePasswordStateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    dispatchPassword({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  const handleSaveShippingInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BACKEND_ENDPOINT}/api/user-stored-information`,
        {
          account_id: userInfo?.account_id,
          address: {
            address: formShippingInfoState.address,
            name: formShippingInfoState.name,
            phone: formShippingInfoState.phone,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        },
      );
      if (response.status === 201) {
        toast.success('Succesfully!', {
          description: response.data.messageToClient,
        });
        getListShippingInfo();
        setShipppingInfoModalOpen(false);
        dispatchShippingInfo({ type: 'RESET' });
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response.data.messageToClient,
      });
    }
    setLoading(false);
  };

  const handleDeleteShippingInfo = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${API_BACKEND_ENDPOINT}/api/user-stored-information/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success('Succesfully!', {
          description: 'Successfully deleted',
        });
        getListShippingInfo();
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response.data.messageToClient,
      });
    }
    setLoading(false);
  };

  const handleChangeAccountInfo = async () => {
    setModelState(ModelState.ACCOUNT_INFO);
    await handleSendOTP();
    setIsAccountInfoModalOpen(false);
  };

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const email = userInfo?.email;
      const response = await axios.post(
        `${API_BACKEND_ENDPOINT}/api/auth/request-otp/`,
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success('Succesfully!', {
          description: response.data.messageToClient,
        });
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response.data.messageToClient,
      });
    }
    setLoading(false);
    isEmailModalOpen && setIsEmailModalOpen(false);
    !isOTPModalOpen && setIsOTPModalOpen(true);
  };

  const handleUpdateAccountInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BACKEND_ENDPOINT}/api/auth/accounts/${userInfo?.account_id}`,
        {
          name: userInfoState.name,
          email: userInfoState.email,
          phone_number: userInfoState.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success('Succesfully!', {
          description: response.data.messageToClient,
        });
        const newUserInfo: UserInfo = {
          username: userInfo?.username!,
          token: userInfo?.token!,
          expiredTime: userInfo?.expiredTime!,
          account_id: userInfo?.account_id!,
          email: userInfoState.email,
          phone: userInfoState.phone,
          name: userInfoState.name,
        };
        saveUserInfo(newUserInfo);
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response.data.messageToClient,
      });
    }
    setLoading(false);
  };

  const handleSubmitOTP = async () => {
    setLoading(true);
    try {
      const email = userInfo?.email;
      const response = await axios.post(
        `${API_BACKEND_ENDPOINT}/api/auth/confirm-otp`,
        {
          email: email,
          otp: otpValue,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        },
      );
      if (response.status === 201) {
        if (modelState === ModelState.CHANGE_PASSWORD)
          toast.success('Succesfully!', {
            description: response.data.messageToClient,
          });
        else if (modelState === ModelState.ACCOUNT_INFO) {
          await handleUpdateAccountInfo();
        }
        const isCorrectOTP = response.data.responseData;
        if (isCorrectOTP) {
          setIsOTPModalOpen(false);
        }
      } else {
        toast.error('Error!', {
          description: response.data.responseData,
        });
        setLoading(false);
        return;
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response.data.responseData,
      });
      setLoading(false);
      setModelState(null);
      return;
    }
    setIsOTPModalOpen(false);
    if (modelState === ModelState.CHANGE_PASSWORD) {
      setIsChangePasswordModalOpen(true);
    } else {
      setOtpValue('');
    }
    setModelState(null);
    setLoading(false);
  };

  const handleChangePassword = async () => {
    const isMatchPassword = passwordState.newPassword === passwordState.confirmNewPassword;
    if (!isMatchPassword) {
      toast.error('Error!', {
        description: 'Password does not match',
      });
      return;
    }

    setLoading(true);
    try {
      const email = userInfo?.email;
      const response = await axios.post(
        `${API_BACKEND_ENDPOINT}/api/auth/change-password`,
        {
          email: email,
          newPassword: passwordState.newPassword,
          otp: otpValue,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        },
      );
      if (response.status === 201) {
        toast.success('Succesfully!', {
          description: response.data.messageToClient,
        });
      } else {
        toast.error('Error!', {
          description: response.data.messageToClient,
        });
        setLoading(false);

        return;
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response.data.messageToClient,
      });
    }
    setOtpValue('');
    handlePasswordStateChange({ target: { name: 'newPassword', value: '' } } as any);
    handlePasswordStateChange({ target: { name: 'confirmNewPassword', value: '' } } as any);
    setLoading(false);
    isChangePasswordModalOpen && setIsChangePasswordModalOpen(false);
  };

  const handleCancel = () => {
    if (isEmailModalOpen) {
      setIsEmailModalOpen(false);
    }
    if (isAccountInfoModalOpen) {
      setIsAccountInfoModalOpen(false);
    }
    if (isShipppingInfoModalOpen) {
      setShipppingInfoModalOpen(false);
    }
    if (isChangePasswordModalOpen) {
      setIsChangePasswordModalOpen(false);
    }
    if (isOTPModalOpen) {
      setIsOTPModalOpen(false);
    }
  };

  const handleSignOut = () => {
    toast.success('Succesfully!', {
      description: 'You have been signed out',
    });
    removeToken();
    setTimeout(() => {
      navigate('/sign-in');
    }, 1000);
  };

  const handleOpenShippingModel = () => {
    setShipppingInfoModalOpen(true);
  };

  const handleOpenInfoModel = () => {
    setIsAccountInfoModalOpen(true);
  };

  const handleOpenChangePasswordModel = () => {
    setIsEmailModalOpen(true);
    setModelState(ModelState.CHANGE_PASSWORD);
  };

  const handleSelectOrderTracking = (status: OrderStatus) => {
    setSelectedOderTracking(status);
  };

  const handleResendOtp = async () => {
    setLoading(true);
    await handleSendOTP();
    otpValue && setOtpValue('');
    setLoading(false);
  };

  return (
    <div className={styles.Account}>
      <div>
        <div className='flex justify-between items-end pb-7 border-b-[0.5px] border-[#c9c5c9] pl-[180px] Account-block h-[200px]'>
          <div className='Account-icon'>
            <AccountGirl></AccountGirl>
          </div>
          <h3>Hello, {userInfo?.name}</h3>
          <div className='flex items-center gap-4 max-w-[360px] w-full'>
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
                <span className='text-[15px] min-w-[110px]'>Name:</span>
                <span className='text-[14px] font-[gilroy-light] min-w-[180px]'>
                  {userInfo?.name}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-[15px] min-w-[110px]'>Email:</span>
                <span className='text-[14px] font-[gilroy-light] min-w-[180px]'>
                  {userInfo?.email}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-[15px] min-w-[110px]'>Phone Number:</span>
                <span className='text-[14px] font-[gilroy-light] min-w-[180px]'>
                  {userInfo?.phone}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-[15px] min-w-[110px]'>Password:</span>
                <span className='text-[14px] font-[gilroy-light] min-w-[180px]'>
                  **************
                </span>
              </div>
              <span
                onClick={handleOpenChangePasswordModel}
                className='cursor-pointer text-sm font-[gilroy-light-italic] underline text-red-600'
              >
                Change password here
              </span>
            </div>
          </div>
          <div className='pt-[84px] pl-[34px] pb-[55px] flex-1'>
            <h5 className='text-[20px] leading-[1.5] mb-7'>Shipping Information</h5>
            <div className='grid grid-cols-3 gap-4'>
              {shippingInfoData.map((info: ShippingInfo) => (
                <div className='border-[0.5px] border-[#c9c5c9] px-4 py-6 relative group'>
                  <div className=''>
                    <span className='text-[15px]'>Address: </span>
                    <span className='font-[gilroy-light] text-sm leading-[2]'>{info.address}</span>
                  </div>
                  <div className=''>
                    <span className='text-[15px]'>Name: </span>
                    <span className='font-[gilroy-light] text-sm leading-[2]'>{info.name}</span>
                  </div>
                  <div className=''>
                    <span className='text-[15px]'>Phone Number: </span>
                    <span className='font-[gilroy-light] text-sm leading-[2]'>{info.phone}</span>
                  </div>
                  <div className='absolute top-0 right-0 translate-x-2/4 -translate-y-2/4 z-10 bg-white cursor-pointer hidden [&>svg]:stroke-slate-300 hover:[&>svg]:stroke-slate-600 transition-all group-hover:inline-block'>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className='inline-block p-0 m-0'>
                          <Close></Close>
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this address.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteShippingInfo(info.id)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
              {shippingInfoData.length < 3 && (
                <div className='item'>
                  <Button onClick={handleOpenShippingModel} className='h-full'>
                    Add More
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='oder'>
          <h5 className='text-[20px] leading-[1.5] mb-10'>Track My Oder</h5>
          <div className=''>
            <div className='mb-[50px] flex items-center justify-between'>
              <div className='flex flex-col justify-center items-center gap-2'>
                <div className='' onClick={() => handleSelectOrderTracking(OrderStatus.ALL)}>
                  <HistoryPurchase
                    isActive={selectedOderTracking === OrderStatus.ALL}
                  ></HistoryPurchase>
                </div>
                <span className='text-sm'>History Purchase</span>
              </div>
              <div className='flex flex-col justify-center items-center gap-2'>
                <div className='' onClick={() => handleSelectOrderTracking(OrderStatus.CONFIRMING)}>
                  <Returning isActive={selectedOderTracking === OrderStatus.CONFIRMING}></Returning>
                </div>
                <span className='text-sm'>Confirming</span>
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
                <div className='' onClick={() => handleSelectOrderTracking(OrderStatus.COMPLETED)}>
                  <Finished isActive={selectedOderTracking === OrderStatus.COMPLETED}></Finished>
                </div>
                <span className='text-sm'>Finished</span>
              </div>
            </div>
            <div className='border-[0.5px] border-[#c9c5c9] px-8 py-[30px] max-h-[1000px] overflow-y-scroll'>
              <div className='flex items-center justify-between mb-6'>
                <h5>
                  {snakeToCapitalCase(
                    OrderStatus[selectedOderTracking as keyof typeof OrderStatus],
                  )}
                </h5>
                <p className='text-sm font-[gilroy-light]'>
                  Summary:{' '}
                  <span className='font-[gilroy]'>
                    {oderData.reduce((total, order) => {
                      return (
                        total +
                        order.prods.reduce(
                          (a, b) => a + b.variants.reduce((a, b) => a + b.Quantity, 0),
                          0,
                        )
                      );
                    }, 0)}
                  </span>{' '}
                  items
                </p>
              </div>
              {loading ? (
                <p className='text-center'>Loading ...</p>
              ) : oderData.length ? (
                oderData.map((order: OrderType) => (
                  <div className='bg-[#EBF4EB] py-5 px-8 mb-4'>
                    <h5 className='mb-4 text-xl'>ID: {order.id}</h5>
                    <div className='flex flex-col gap-4'>
                      {order.prods.map((prod) =>
                        prod.variants.map((variant) => (
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2 max-w-[400px] w-full'>
                              <div className='flex-[0_0_86px] min-w-[86px] w-full'>
                                <img src={variant.Images} alt='' />
                              </div>
                              <div className=''>
                                <h5 className='text-sm leading-[1.5]'>{prod.name}</h5>
                                <div className='text-xs font-[gilroy-light]'>
                                  Color:{' '}
                                  <span
                                    className={`w-3 h-3 rounded-full bg-[${variant.Color}] inline-block`}
                                  ></span>
                                </div>
                              </div>
                            </div>
                            <div className='text-sm leading-[1.5] font-[gilroy-light]'>
                              <span>{variant.Quantity}x</span>
                            </div>
                            <div className='text-sm leading-[1.5] font-[gilroy-light]'>
                              <span>${prod.price.toFixed(2)}</span>
                            </div>
                          </div>
                        )),
                      )}
                      <div className='text-lg flex items-center justify-between pt-4 border-t border-[#c9c5c9]'>
                        <span>Total:</span>
                        <span>
                          $
                          {order.prods
                            .reduce((total, product) => {
                              return (
                                total +
                                product.price * product.variants.reduce((a, b) => a + b.Quantity, 0)
                              );
                            }, 0)
                            .toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center'>No data</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <>
        <ChangeInformationModel
          handleCancel={handleCancel}
          handleUserInfoChange={handleUserInfoChange}
          handleOk={handleChangeAccountInfo}
          isAccountInfoModalOpen={isAccountInfoModalOpen}
          userInfo={userInfo}
          loading={loading}
          userInfoState={userInfoState}
        ></ChangeInformationModel>
      </>
      <>
        <SenOTPModel
          handleCancel={handleCancel}
          handleSendOTP={handleSendOTP}
          isEmailModalOpen={isEmailModalOpen}
          loading={loading}
          userInfo={userInfo}
        ></SenOTPModel>
      </>
      <>
        <SubmitOTPModel
          handleCancel={handleCancel}
          handleResendOtp={handleResendOtp}
          handleSubmitOTP={handleSubmitOTP}
          isOTPModalOpen={isOTPModalOpen}
          loading={loading}
          otpValue={otpValue}
          setOtpValue={setOtpValue}
          userInfo={userInfo}
          type={modelState === ModelState.ACCOUNT_INFO ? 'account information' : 'password'}
        ></SubmitOTPModel>
      </>

      <>
        <ChangePasswordModel
          handleCancel={handleCancel}
          handleChangePassword={handleChangePassword}
          handlePasswordStateChange={handlePasswordStateChange}
          isChangePasswordModalOpen={isChangePasswordModalOpen}
          loading={loading}
        ></ChangePasswordModel>
      </>

      <>
        <ChangeShippingInfoModel
          handleCancel={handleCancel}
          handleSaveShippingInfo={handleSaveShippingInfo}
          handleShippingInfoChange={handleShippingInfoChange}
          isShipppingInfoModalOpen={isShipppingInfoModalOpen}
          loading={loading}
        ></ChangeShippingInfoModel>
      </>
    </div>
  );
};

export default Account;
