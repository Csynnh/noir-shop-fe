import Fb from '@components/Icons/Fb';
import In from '@components/Icons/In';
import Insta from '@components/Icons/Insta';
import ItemDetails from '@images/item-primary.png';
import styles from './Gift.module.scss';
import { Mail, Phone } from 'lucide-react';
import Address from '@components/Icons/Address';
const GiftCard = () => {
  return (
    <div className={styles.Gift}>
      <div className='Gift-container'>
        <div className='Gift-top'>
          <h1 className='Gift-heading'>Gift Card (4)</h1>
          <span>
            Our Noir Gift Cards offer the ultimate flexibility. Whether your recipient is a fashion
            enthusiast or simply appreciates a thoughtful gift, they can choose the perfect handbag
            to suit their style. From everyday essentials to statement pieces, our collection has
            something for everyone.
          </span>
        </div>
        <div className='Gift-terms'>
          <div className='Gift-item'>
            <p>General Terms and Conditions</p>
            <ul>
              <li>
                <span>
                  <span className='bold'>Validity: </span>
                  Gift cards are valid for 1 years from the date of purchase.
                </span>
              </li>
              <li>
                <span>
                  <span className='bold'>Non-Refundable: </span>
                  Gift cards are non-refundable and cannot be exchanged for cash.
                </span>
              </li>
              <li>
                <span>
                  <span className='bold'>No Cash Back: </span>
                  Any remaining balance on a gift card cannot be redeemed for cash.
                </span>
              </li>
              <li>
                <span>
                  <span className='bold'>Lost or Stolen Cards: </span>
                  Replacement cards may be issued for lost or stolen gift cards, subject to a fee.
                </span>
              </li>
              <li>
                <span>
                  <span className='bold'>Online Purchases: </span>
                  Gift cards can be used for online purchases on our website.
                </span>
              </li>
              <li>
                <span>
                  <span className='bold'>In-Store Purchases: </span>
                  Gift cards can be used for in-store purchases at our authorized retailers. Sales
                </span>
              </li>
              <li>
                <span>
                  <span className='bold'>Tax: </span>
                  Sales tax may apply to purchases made with a gift card, depending on local laws.
                </span>
              </li>
            </ul>
          </div>
          <div className='Gift-item'>
            <p>General Terms and Conditions</p>
            <ul>
              <li>
                <span>
                  <span className='bold'>Promotional Offers: </span>
                  Gift cards may not be combined with other promotions or discounts.
                </span>
              </li>
              <li>
                <span>
                  <span className='bold'>Damaged Cards: </span>
                  If a gift card is damaged, please contact our customer support for assistance.
                </span>
              </li>
              <li>
                <span>
                  <span className='bold'>Fraudulent Activity: </span>
                  We reserve the right to investigate and take appropriate action in case of
                  fraudulent activity involving gift cards.
                </span>
              </li>
            </ul>
          </div>
          <div className='Gift-support'>
            <p>Customer Support</p>
            <ul>
              <li>
                <span>
                  For any questions or concerns regarding gift cards, please contact our customer
                  support at:
                </span>
              </li>
              <li className='group'>
                <Mail></Mail>

                <span>
                  <span className='bold'>Email: </span>
                  support@noir.com
                </span>
              </li>
              <li className='group'>
                <Address></Address>
                <span>
                  <span className='bold'>Address: </span>
                  Ho Chi Minh City, Vietnam
                </span>
              </li>
              <li className='group'>
                <Phone></Phone>
                <span>
                  <span className='bold'>Phone: </span>
                  +(84) 28 366 400 874
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
