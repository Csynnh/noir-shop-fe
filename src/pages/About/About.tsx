import In from '@components/Icons/In';
import styles from './About.module.scss';
import Fb from '@components/Icons/Fb';
import Insta from '@components/Icons/Insta';
const About = () => {
  return (
    <div className={styles.About}>
      <div className='About-container'>
        <h1 className='About-header'>
          <span>About us</span>
          <span>(5)</span>
        </h1>
        <div className='About-content'>
          <div className='About-Story'>
            <p className='tittle'>Our Story</p>
            <span className='brand'>Noir</span>
            <span>
              was founded on a passion for timeless elegance and exquisite craftsmanship. Our
              meticulously crafted bags are more than accessories; they are wearable works of art,
              designed to elevate your style and become cherished heirlooms.
            </span>
          </div>
          <div className='About-Commitment'>
            <p className='tittle'>Our Commitment</p>
            <span>At </span>
            <span className='brand'>Noir</span>
            <span>
              , we are dedicated to crafting bags that are both stylish and practical. We use only
              the highest quality materials and employ skilled artisans to ensure that each piece is
              built to last. Our commitment to sustainability drives us to source eco-friendly
              materials and minimize our environmental impact.
            </span>
          </div>
          <div className='About-Values'>
            <p className='tittle'>Our Values</p>
            <span>
              <ul>
                <li>
                  Quality: We prioritize exceptional craftsmanship and attention to detail in every
                  product we create.
                </li>
                <li>
                  Sustainability: We strive to reduce our environmental footprint by using
                  sustainable materials and practices.
                </li>
                <li>
                  Innovation: We continuously explore new designs and technologies to offer unique
                  and innovative products.
                </li>
                <li>
                  Customer Satisfaction: We are committed to providing exceptional customer service
                  and ensuring your complete satisfaction.
                </li>
              </ul>
            </span>
          </div>
          <div className='About-Community'>
            <p className='tittle'>Join the Community</p>
            <span>
              Discover the perfect bag to complement your lifestyle. Explore our collection and
              experience the difference of Noir.
            </span>
            <div className='About-social'>
              <span className='About-icon icon'>
                <In></In>
              </span>
              <span className='About-icon icon'>
                <Fb></Fb>
              </span>
              <span className='About-icon icon'>
                <Insta></Insta>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
