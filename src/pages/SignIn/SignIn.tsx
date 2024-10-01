import React from 'react';
import styles from './SignIn.module.scss';
import Girl from '@components/Icons/Girl/girl';
import Input from '@components/Input';
import type { CheckboxProps } from 'antd';
import Checkbox from '@components/Icons/Checkbox';

const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
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
            <div className='SignIn-right-form'>
              <Input></Input>
              <Input></Input>
              <div className='SignIn-right-addition'>
                <div className='SignIn-right-remember'>
                  <Checkbox></Checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
