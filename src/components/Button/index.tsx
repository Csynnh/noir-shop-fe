import styles from './styles.module.scss';
interface ButtonProps {
  children: string;
  onClick: () => void;
  isPrimary?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { children, onClick, isPrimary, icon, className } = props;

  return (
    <div onClick={onClick} className={styles.Button}>
      <div className={'button ' + (isPrimary ? ' --primary ' : '') + className}>
        {icon}
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Button;
