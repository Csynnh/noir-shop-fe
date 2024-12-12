import Checked from '@components/Icons/Checked';
import styles from './styles.module.scss';
import { useState } from 'react';
interface CheckboxProps {
  name: string;
  label?: string;
}
const Checkbox = ({ name, label }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={styles.Checkbox}>
      <label htmlFor={name}>
        <div className='checkbox-container'>
          <span className='checkbox-icon-checked'>{checked && <Checked />}</span>
        </div>
        <input
          type='checkbox'
          name={name}
          id={name}
          onChange={() => {
            setChecked(!checked);
          }}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
