import styles from './styles.module.scss';
interface ButtonProps {
  children: any;
  onClick: () => void;
  isPrimary?: boolean;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, onClick, isPrimary, icon, className, loading, disabled } = props;

  return (
    <div className={styles.Button}>
      <div
        onClick={loading || disabled ? () => {} : onClick}
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
    </div>
  );
};

export default Button;
