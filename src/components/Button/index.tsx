import styles from './styles.module.scss';
interface ButtonProps {
  children: string;
  onClick: () => void;
  isPrimary?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, onClick, isPrimary } = props;

  return (
    <div onClick={onClick} className={styles.Button}>
      <div className={'button' + (isPrimary ? ' --primary' : '')}>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Button;
