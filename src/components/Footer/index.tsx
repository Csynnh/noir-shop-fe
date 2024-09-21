import Address from '@icons/Address';
import Fb from '@icons/Fb';
import In from '@icons/In';
import Insta from '@icons/Insta';
import Mail from '@icons/Mail';
import Phone from '@icons/Phone';
import Up from '@icons/Up';
import styles from './styles.module.scss';

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
              <span>Private Policy</span>
            </div>
            <div className='footer-item-content'>
              <span>Shipping and Return Policy</span>
            </div>
            <div className='footer-item-content'>
              <span>Membership Policy</span>
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
