import styles from './SignIn.module.scss';
import Girl from '@components/Icons/Girl/girl';
import Input from '@components/Input';
import { Form } from 'antd';
import Checkbox from '@components/Checkbox';
import { Link } from 'react-router-dom';
import Button from '@components/Button';
import Google from '@components/Icons/Google';
import PhoneBold from '@components/Icons/PhoneBold';

const SignIn = () => {
  return (
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
              <Input name='username' label='Username' required></Input>
              <Input name='password' label='Password' required type='password'></Input>
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
              <Button isPrimary onClick={() => {}}>
                Sign in
              </Button>
              <Button onClick={() => {}} icon={<Google />} className='--text-sm'>
                Continue with Google
              </Button>
              <Button onClick={() => {}} icon={<PhoneBold />} className='--text-sm'>
                Continue with Phone number
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
