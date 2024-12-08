import styles from './styles.module.scss';
interface ButtonProps {
  children: any;
  onClick?: () => void;
  isPrimary?: boolean;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, onClick, isPrimary, icon, className, loading, disabled } = props;

  return (
    <button
      className={styles.Button + ' p-0'}
      type='submit'
      onClick={loading || disabled ? () => {} : onClick}
    >
      <div
        className={
          'button ' +
          (isPrimary ? ' --primary ' : '') +
          className +
          (loading ? ' disable ' : '') +
          (disabled ? ' disable ' : '')
        }
      >
        {loading ? (
          <div className='loading'></div>
        ) : (
          <>
            {icon}
            <span>{children}</span>
          </>
        )}
      </div>
    </button>
  );
};

export default Button;
