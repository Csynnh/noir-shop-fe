import styles from './styles.module.scss';
import Input from '@components/Input';
import { Form } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import Google from '@components/Icons/Google';
import PhoneBold from '@components/Icons/PhoneBold';
import GirlSignUp from '@components/Icons/GirlSignUp';
import { useReducer, useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import axios from 'axios';
import { API_BACKEND_ENDPOINT, GOOGLE_CLIENT_ID } from '@constant/Api';
import { toast } from 'sonner';
import { Toaster } from '@ui/sonner';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

interface FormState {
  username: string;
  phone: string;
  password: string;
  email: string;
  confirmPassword: string;
  name: string;
}

type Action = { type: 'SET_FIELD'; field: string; value: any } | { type: 'RESET' };

const initialState: FormState = {
  username: '',
  password: '',
  email: '',
  phone: '',
  confirmPassword: '',
  name: '',
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

const SignUp = () => {
  const { saveUserInfo } = useAuth();
  const location = useLocation();
  const { from } = location.state || {};
  const navigater = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BACKEND_ENDPOINT}/api/auth/accounts`, {
        username: formState.username,
        password: formState.password,
        email: formState.email,
        phone_number: formState.phone,
        name: formState.name,
        role: 'User',
      });
      if (response.status === 201) {
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
          navigater(from && from?.pathname ? from?.pathname : '/', {
            state: { id: from?.id ?? 'null' },
          });
        }, 1200);
      } else {
        toast.error('Error!', {
          description: 'Error while signing in, please check your username and password again',
        });
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response.data.messageToClient,
      });
    }
    setLoading(false);
  };

  const onSuccess = async (user: CredentialResponse) => {
    try {
      const idToken = user.credential;
      const result = await axios.post(`${API_BACKEND_ENDPOINT}/api/auth/google/register`, {
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
  return (
    <div className={styles.SignUp}>
      <div className='SignUp-container'>
        <div className='SignUp-left'>
          <GirlSignUp></GirlSignUp>
        </div>
        <div className='SignUp-right'>
          <div className='SignUp-right-container'>
            <h3 className='SignUp-right-header'>Sign Up</h3>
            <Form className='SignUp-right-form'>
              <Input name='name' label='Name' required onChange={handleChange}></Input>
              <Input name='username' label='Username' required onChange={handleChange}></Input>
              <Input
                name='phone'
                label='Phone Number'
                required
                onChange={handleChange}
                type='number'
              ></Input>
              <Input
                name='email'
                label='Email'
                required
                onChange={handleChange}
                type='email'
              ></Input>
              <Input
                name='password'
                label='Password'
                required
                onChange={handleChange}
                type='password'
              ></Input>
              <Input
                name='confirmPassword'
                label='Confirm Password'
                required
                onChange={handleChange}
                type='password'
              ></Input>
            </Form>
            <div className='SignUp-nav-to-sign-up'>
              If you have an account already <Link to={'/sign-in'}>Sign in</Link> now
            </div>
            <div className='SignUp-button'>
              <Button isPrimary onClick={handleSignUp} disabled={loading}>
                Sign up
              </Button>
              <Button
                onClick={() => {}}
                icon={<Google />}
                className='--text-sm relative'
                disabled={loading}
              >
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                  <div className='opacity-0 absolute w-full h-full top-0 left-0'>
                    <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
                  </div>
                  Continue with Google
                </GoogleOAuthProvider>
              </Button>
              <Button
                onClick={() => {}}
                icon={<PhoneBold />}
                className='--text-sm'
                disabled={loading}
              >
                Continue with Phone number
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position='top-right' richColors />
    </div>
  );
};

export default SignUp;
