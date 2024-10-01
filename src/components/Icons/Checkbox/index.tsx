import styles from './styles.module.scss';

const Checkbox = () => {
  return (
    <div className={styles.Checkbox}>
      <label htmlFor='checkboxId'>Checkboxs</label>
      <input type='checkbox' id='checkboxId' />
    </div>
  );
};

export default Checkbox;
