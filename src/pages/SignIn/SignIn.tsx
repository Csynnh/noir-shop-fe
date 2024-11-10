import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import Girl from '@components/Icons/Girl/girl';
import Google from '@components/Icons/Google';
import PhoneBold from '@components/Icons/PhoneBold';
import Input from '@components/Input';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { useAuth } from '@contexts/AuthContext';
import { Form } from 'antd';
import axios from 'axios';
import { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { toast } from 'sonner';
import { Toaster } from '@ui/sonner';

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
  const { saveUserInfo } = useAuth();
  const navigater = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BACKEND_ENDPOINT}/api/auth/login`, {
        username: formState.username,
        password: formState.password,
      });
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
        };
        saveUserInfo(userInfo);
        setTimeout(() => {
          navigater('/');
        }, 2000);
      }
    } catch (error: any) {
      console.log('error', error);
      toast.error('Error!', {
        description: error.response.data.messageToClient,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.SignIn}>
        <div className='SignIn-container'>
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
                <Input name='username' label='Username' required onChange={handleChange}></Input>
                <Input
                  name='password'
                  label='Password'
                  required
                  type='password'
                  onChange={handleChange}
                ></Input>
                <div className='SignIn-remember-forgot-pass'>
                  <Checkbox name='remember-me' label='Remember Me' />
                  <div className='SignIn-forgot'>
                    <Link to={'/forgot-password'}>Forgot password</Link>
                  </div>
                </div>
              </Form>
              <div className='SignIn-nav-to-sign-up'>
                If you don't have an account <Link to={'/sign-up'}>Sign up</Link> now
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
                <Button
                  onClick={() => {}}
                  icon={<Google />}
                  className='--text-sm'
                  disabled={loading}
                >
                  Continue with Google
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
      </div>
      <Toaster position='top-right' richColors />
    </>
  );
};

export default SignIn;
