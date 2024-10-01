import React from 'react';
import styles from './styles.module.scss';
const Input = () => {
  return (
    <div className={styles.Input}>
      <label htmlFor='input'>* Hello</label>
      <input type='text' id='input' name='input' />
    </div>
  );
};

export default Input;
