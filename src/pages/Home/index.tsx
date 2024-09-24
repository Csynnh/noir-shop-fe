import Banner from '@components/Banner';
import styles from './styles.module.scss';
import Down from '@components/Icons/Down';
import Collection from '@components/Collection';
import { useRef } from 'react';

const Home = () => {
  const collectionRef = useRef<HTMLDivElement>(null);
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
            <Down to={collectionRef}></Down>
          </span>
        </div>
      </div>
      <Collection ref={collectionRef} type={'New Collection'}></Collection>
      <Collection type={'Bag'}></Collection>
      <Collection type={'Jacket'}></Collection>
    </div>
  );
};

export default Home;
