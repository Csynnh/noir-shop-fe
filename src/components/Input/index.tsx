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
  error?: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
  disabled,
  error,
  className,
  onKeyDown,
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (inputRef?.current?.value && maxLen && isExpire) {
      let value = inputRef.current.value.replace(/\//g, '');
      if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      inputRef.current.value = value;
    }
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div className={styles.Input + ' ' + className} style={{ maxWidth: maxWidth }}>
      <label htmlFor={name} className={`${error ? 'text-red-400' : ''}`}>
        {required ? '*' : ''} {label}
      </label>
      <input
        disabled={disabled}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
        type={typeValue}
        id={name}
        name={name}
        maxLength={maxLen && maxLen + (isExpire ? 1 : 0)}
        value={defaultValue}
        placeholder={error}
        className={`${disabled ? 'opacity-30' : ''} ${error ? 'text-red-600 !font-[gilroy-light-italic] !italic !border-red-500' : ''} placeholder:text-red-600`}
      />
      {typeValue === 'password' && (
        <span onClick={handleShowPassword} className='input-icon'>
          {showPassword ? <OpenEye /> : <CloseEye />}
        </span>
      )}
    </div>
  );
};

export default Input;
