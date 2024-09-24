import styles from './About.module.scss';
const About = () => {
  return (
    <div className={styles.About}>
      <div className='About-container'>
        <h1 className='About-header'>
          <span>About us</span>
          <span>(5)</span>
        </h1>
      </div>
    </div>
  );
};

export default About;
