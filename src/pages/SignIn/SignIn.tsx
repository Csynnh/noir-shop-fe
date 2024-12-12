import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import Girl from '@components/Icons/Girl/girl';
import Google from '@components/Icons/Google';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import Input from '@components/Input';
import { API_BACKEND_ENDPOINT, GOOGLE_CLIENT_ID } from '@constant/Api';
import { useAuth } from '@contexts/AuthContext';
import { Form } from 'antd';
import axios from 'axios';
import { useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { toast } from 'sonner';
import ChangePasswordModel from '@pages/Account/Models/ChangePasswordModel';
import SenOTPModel from '@pages/Account/Models/SendOTPModel';
import SubmitOTPModel from '@pages/Account/Models/SubmitOTPModel';
import { formPasswordReducer, initialPasswordState } from '@pages/Account/reducer';
import { ModelState } from '@pages/Account';
import { Toaster } from '@ui/sonner';
import Logo from '@components/Icons/Logo';

interface FormState {
  username: string;
  password: string;
}

type Action = { type: 'SET_FIELD'; field: string; value: any } | { type: 'RESET' };

const initialState: FormState = {
  username: '',
  password: '',
};

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const SignIn = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { from } = location.state || {};
  const { saveUserInfo } = useAuth();
  const navigater = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };
  const [openTypeEmailModel, setOpenTypeEmailModel] = useState(false);
  const [openSubmitOTP, setOpenSubmitOTP] = useState(false);
  const [openChangePass, setOpenChangePass] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [OTPSubmited, setOTPSubmited] = useState('');
  const [passwordState, dispatchPassword] = useReducer(formPasswordReducer, initialPasswordState);
  const [modelState, setModelState] = useState<ModelState | null>(null);

  const onSuccess = async (user: CredentialResponse) => {
    try {
      const idToken = user.credential;
      const result = await axios.post(`${API_BACKEND_ENDPOINT}/api/auth/google`, {
        token: idToken,
      });
      if (result.status === 200) {
        const userInfo = {
          username: result.data.responseData?.username,
          token: result.data.responseData?.token,
          expiredTime: result.data.responseData?.expiredTime,
          account_id: result.data.responseData?.accountId,
          email: result.data.responseData?.email,
          phone: result.data.responseData?.phoneNumber,
          name: result.data.responseData?.name,
        };
        toast.success('Succesfully!', {
          description: result.data.messageToClient,
        });
        saveUserInfo(userInfo);
        console.log('from?.pathname', from?.pathname);
        setTimeout(() => {
          navigater(from && from?.pathname ? from?.pathname : '/', {
            state: { id: from?.productId ?? 'null' },
          });
        }, 1200);
      }
    } catch (error: any) {
      toast.error('Error!', {
        description:
          'Error while signing in, please try again. ' +
          (error.response.data.messageToClient ?? ''),
      });
    }
  };

  const onFailure = () => {
    toast.error('Error!', {
      description: 'Error while signing in, please try again',
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSignIn();
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BACKEND_ENDPOINT}/api/auth/login`, {
        username: formState.username,
        password: formState.password,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success('Succesfully!', {
          description: response.data.messageToClient,
        });

        const userInfo = {
          username: formState.username,
          token: response.data.responseData?.token,
          expiredTime: response.data.responseData?.expiredTime,
          account_id: response.data.responseData?.accountId,
          email: response.data.responseData?.email,
          phone: response.data.responseData?.phoneNumber,
          name: response.data.responseData?.name,
        };
        saveUserInfo(userInfo);
        setTimeout(() => {
          if (location?.pathname === '/admin/sign-in') {
            navigater(from?.pathname);
          } else {
            navigater(from && from?.pathname ? from?.pathname : '/', {
              state: { id: from?.productId ?? 'null' },
            });
          }
        }, 1200);
      } else {
        toast.error('Error!', {
          description: 'Error while signing in, please check your username and password again',
        });
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error('Error!', {
        description: error.response.data.messageToClient,
      });
    }
    setLoading(false);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const email = userEmail;
      const response = await axios.post(`${API_BACKEND_ENDPOINT}/api/auth/request-otp/`, {
        email: email,
      });
      if (response.status === 201) {
        toast.success('Succesfully!', {
          description: response.data.messageToClient,
        });
      }
      setOpenSubmitOTP(true);
      setOpenTypeEmailModel(false);
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response.data.responseData,
      });
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setLoading(true);
    await handleSendOTP();
    OTPSubmited && setOTPSubmited('');
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
      const email = userEmail;
      const response = await axios.post(`${API_BACKEND_ENDPOINT}/api/auth/change-password`, {
        email: email,
        newPassword: passwordState.newPassword,
        otp: OTPSubmited,
      });
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
    setOTPSubmited('');
    setLoading(false);
    setOpenChangePass(false);
  };

  const handleSubmitOTP = async () => {
    setLoading(true);
    try {
      const email = userEmail;
      const response = await axios.post(`${API_BACKEND_ENDPOINT}/api/auth/confirm-otp`, {
        email: email,
        otp: OTPSubmited,
      });
      if (response.status === 201) {
        const isCorrectOTP = response.data.responseData;
        if (isCorrectOTP) {
          setOpenSubmitOTP(false);
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
    setOpenSubmitOTP(false);
    if (modelState === ModelState.CHANGE_PASSWORD) {
      setOpenChangePass(true);
    } else {
      setOTPSubmited('');
    }
    setModelState(null);
    setLoading(false);
  };
  return (
    <>
      <div className={styles.SignIn}>
        <div className='SignIn-container'>
          <div className='SignIn-Logo'>
            <Logo></Logo>
          </div>
          <div className='SignIn-left'>
            <Girl></Girl>
            <div className='SignIn-left-content'>
              <p>You are not logged in</p>
              <span>Please log in to continue</span>
            </div>
          </div>
          <div className='SignIn-right'>
            <div className='SignIn-right-container'>
              <h3 className='SignIn-right-header'>Sign in</h3>
              <Form className='SignIn-right-form'>
                <Input
                  name='username'
                  label='Username'
                  required
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                ></Input>
                <Input
                  name='password'
                  label='Password'
                  required
                  type='password'
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                ></Input>
                <div className='SignIn-remember-forgot-pass'>
                  <Checkbox name='remember-me' label='Remember Me' />
                  <div className='SignIn-forgot'>
                    <span
                      onClick={() => {
                        setOpenTypeEmailModel(true);
                      }}
                    >
                      Forgot password
                    </span>
                  </div>
                </div>
              </Form>
              <div className='SignIn-nav-to-sign-up'>
                If you don't have an account{' '}
                <Link
                  to={'/sign-up'}
                  state={{
                    from: {
                      pathname: from?.pathname,
                      id: from?.productId ?? 'null',
                    },
                  }}
                >
                  Sign up
                </Link>{' '}
                now
              </div>
              <div className='SignIn-button'>
                <Button
                  isPrimary
                  onClick={handleSignIn}
                  disabled={!formState.username || !formState.password}
                  loading={loading}
                >
                  Sign in
                </Button>
                <Button icon={<Google />} className='--text-sm relative' disabled={loading}>
                  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <div className='opacity-0 absolute w-full h-full top-0 left-0'>
                      <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
                    </div>
                    Continue with Google
                  </GoogleOAuthProvider>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubmitOTPModel
        handleCancel={() => {
          setOpenSubmitOTP(false);
        }}
        handleResendOtp={handleResendOtp}
        handleSubmitOTP={handleSubmitOTP}
        isOTPModalOpen={openSubmitOTP}
        loading={loading}
        otpValue={OTPSubmited}
        setOtpValue={setOTPSubmited}
        userInfo={{}}
      ></SubmitOTPModel>

      <SenOTPModel
        handleCancel={() => {
          setOpenTypeEmailModel(false);
        }}
        handleSendOTP={() => {
          handleSendOTP();
        }}
        isEmailModalOpen={openTypeEmailModel}
        loading={loading}
        title='Type your Email to reset your password'
        handleOnChange={handleOnChange}
      ></SenOTPModel>

      <ChangePasswordModel
        handleCancel={() => {
          setOpenChangePass(false);
        }}
        handleChangePassword={handleChangePassword}
        handlePasswordStateChange={(e) =>
          dispatchPassword({
            type: 'SET_FIELD',
            field: e.target.name,
            value: e.target.value,
          })
        }
        isChangePasswordModalOpen={openChangePass}
        loading={loading}
      ></ChangePasswordModel>
      <Toaster position='top-right' richColors></Toaster>
    </>
  );
};

export default SignIn;
