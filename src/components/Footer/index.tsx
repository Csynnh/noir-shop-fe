import Address from '@components/Icons/Address';
import Fb from '@components/Icons/Fb';
import In from '@components/Icons/In';
import Insta from '@components/Icons/Insta';
import Mail from '@components/Icons/Mail';
import Phone from '@components/Icons/Phone';
import Up from '@components/Icons/Up';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className='footer-wrapper'>
        <div className='footer-container'>
          <div className='footer-contact'>
            <h5>Contact us</h5>
            <div className='footer-contact-item'>
              <div className='footer-item-title'>
                <div className='footer-item-icon'>
                  <span>
                    <Mail></Mail>
                  </span>
                </div>
                <span>Email:</span>
              </div>
              <div className='footer-item-content'>
                <span>support@noir.com</span>
              </div>
            </div>
            <div className='footer-contact-item'>
              <div className='footer-item-title'>
                <div className='footer-item-icon'>
                  <span>
                    <Address></Address>
                  </span>
                </div>
                <span>Address:</span>
              </div>
              <div className='footer-item-content'>
                <span>Ho Chi Minh City, Viet Nam</span>
              </div>
            </div>
            <div className='footer-contact-item'>
              <div className='footer-item-title'>
                <div className='footer-item-icon'>
                  <span>
                    <Phone></Phone>
                  </span>
                </div>
                <span>Phone:</span>
              </div>
              <div className='footer-item-content'>
                <span>+(84) 28 366 400 874</span>
              </div>
            </div>
          </div>
          <div className='footer-policy'>
            <h5>Policy</h5>
            <div className='footer-item-content'>
              <Link to={'/private-policy'}>Private Policy</Link>
            </div>
            <div className='footer-item-content'>
              <Link to={'/shipping-and-return-policy'}>Shipping and Return Policy</Link>
            </div>
            <div className='footer-item-content'>
              <Link to={'/membership-policy'}>Membership Policy</Link>
            </div>
          </div>
        </div>
        <div className='footer-container'>
          <div className='footer-shortcut'>
            <span>Shopping Now</span>
            <span>
              <Up></Up>
            </span>
          </div>
          <div className='footer-meta'>
            <span className='footer-meta-item'>
              <In></In>
            </span>
            <span className='footer-meta-item'>
              <Fb></Fb>
            </span>
            <span className='footer-meta-item'>
              <Insta></Insta>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
