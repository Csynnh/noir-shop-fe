import OpenEye from '@components/Icons/OpenEye';
import styles from './styles.module.scss';
import { useRef, useState } from 'react';
import CloseEye from '@components/Icons/CloseEye';

interface InputProps {
  label?: string;
  name: string;
  required?: boolean;
  type?: string;
}
const Input = ({ label, name, required, type }: InputProps) => {
  const typeValue = type || 'text';
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    if (inputRef.current) {
      inputRef.current.type = showPassword ? 'password' : 'text';
    }
  };
  return (
    <div className={styles.Input}>
      <label htmlFor={name}>
        {required ? '*' : ''} {label}
      </label>
      <input ref={inputRef} type={typeValue} id={name} name={name} />
      {typeValue === 'password' && (
        <span onClick={handleShowPassword} className='input-icon'>
          {showPassword ? <CloseEye /> : <OpenEye />}
        </span>
      )}
    </div>
  );
};

export default Input;
