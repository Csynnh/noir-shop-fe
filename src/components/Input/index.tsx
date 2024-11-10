import OpenEye from '@components/Icons/OpenEye';
import styles from './styles.module.scss';
import { useRef, useState } from 'react';
import CloseEye from '@components/Icons/CloseEye';

interface InputProps {
  label?: string;
  name: string;
  required?: boolean;
  type?: string;
  maxWidth?: number;
  maxLen?: number;
  isExpire?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  defaultValue?: string;
  disabled?: boolean;
}
const Input = ({
  label,
  name,
  required,
  type,
  maxWidth,
  maxLen,
  isExpire,
  onChange,
  defaultValue,
  disabled
}: InputProps) => {
  const typeValue = type || 'text';
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    if (inputRef.current) {
      inputRef.current.type = showPassword ? 'password' : 'text';
    }
  };
  const handleInputChange = () => {
    if (inputRef?.current?.value && maxLen && isExpire) {
      let value = inputRef.current.value.replace(/\//g, '');
      if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      inputRef.current.value = value;
    }
  };
  return (
    <div className={styles.Input} style={{ maxWidth: maxWidth }}>
      <label htmlFor={name}>
        {required ? '*' : ''} {label}
      </label>
      <input
        disabled={disabled}
        onChange={onChange ? onChange : handleInputChange}
        ref={inputRef}
        type={typeValue}
        id={name}
        name={name}
        maxLength={maxLen && maxLen + (isExpire ? 1 : 0)}
        defaultValue={defaultValue}
        className={`${disabled ? 'opacity-30' : ''}`}
      />
      {typeValue === 'password' && (
        <span onClick={handleShowPassword} className='input-icon'>
          {showPassword ? <CloseEye /> : <OpenEye />}
        </span>
      )}
    </div>
  );
};

export default Input;
