import Banner from '@components/Banner';
import styles from './styles.module.scss';
import Down from '@icons/Down';
import Collection from '@components/Collection';

const Home = () => {
  return (
    <div className={styles.home}>
      <Banner></Banner>
      <div className='home-banner-container'>
        <div className='home-banner-content'>
          Indulge in opulence with <span className='home-banner-content-logo'>Noir</span>. Our
          meticulously crafted bags are a testament to timeless elegance and exquisite
          craftsmanship. Each piece is a masterpiece, designed to elevate your style and become a
          cherished heirloom. Experience luxury redefined.
        </div>
        <div className='home-banner-button'>
          <h3>Shopping Now</h3>
          <span>
            <Down></Down>
          </span>
        </div>
      </div>
      <Collection type={'New Collection'}></Collection>
      <Collection type={'Bag'}></Collection>
      <Collection type={'Jacket'}></Collection>
    </div>
  );
};

export default Home;
