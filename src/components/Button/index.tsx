import styles from './styles.module.scss';
interface ButtonProps {
  children: string;
  onClick: () => void;
  isPrimary?: boolean;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, onClick, isPrimary, icon, className, loading } = props;

  return (
    <div className={styles.Button}>
      <div
        onClick={loading ? () => {} : onClick}
        className={
          'button ' + (isPrimary ? ' --primary ' : '') + className + (loading ? ' disable ' : '')
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
