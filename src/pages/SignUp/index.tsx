import styles from './styles.module.scss';
import Input from '@components/Input';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import Button from '@components/Button';
import Google from '@components/Icons/Google';
import PhoneBold from '@components/Icons/PhoneBold';
import GirlSignUp from '@components/Icons/GirlSignUp';

const SignUp = () => {
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
              <Input name='username' label='Username' required></Input>
              <Input name='phone' label='Phone Number' required type='number'></Input>
              <Input name='email' label='Email' required type='email'></Input>
              <Input name='password' label='Password' required type='password'></Input>
              <Input
                name='confirm-password'
                label='Confirm Password'
                required
                type='password'
              ></Input>
            </Form>
            <div className='SignUp-nav-to-sign-up'>
              If you have an account already <Link to={'/sign-in'}>Sign in</Link> now
            </div>
            <div className='SignUp-button'>
              <Button isPrimary onClick={() => {}}>
                Sign up
              </Button>
              {/* <Button onClick={() => {}} icon={<Google />} className='--text-sm'>
                Continue with Google
              </Button>
              <Button onClick={() => {}} icon={<PhoneBold />} className='--text-sm'>
                Continue with Phone number
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
