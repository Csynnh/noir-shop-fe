import banner1 from '@images/banner_1.png';
import banner2 from '@images//banner_2.png';
import banner3 from '@images//banner_3.png';
import banner4 from '@images//banner_4.png';
import styles from './styles.module.scss';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className='banner-image-container'>
        <div className='banner-image-item'>
          <img src={banner1} alt='banner-image' />
        </div>
        <div className='banner-image-item'>
          <img src={banner2} alt='banner-image' />
        </div>
        <div className='banner-image-item'>
          <img src={banner3} alt='banner-image' />
        </div>
        <div className='banner-image-item'>
          <img src={banner4} alt='banner-image' />
        </div>
      </div>
    </div>
  );
};

export default Banner;
