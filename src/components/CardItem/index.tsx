import Right from '@components/Icons/Right';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export interface CardItemProps {
  id: string;
  name: string;
  price: number;
  color: string[];
  img_url: string;
}
// @ts-ignore
const CardItem = (prop: CardItemProps) => {
  const { id, name, price, color, img_url } = prop;
  return (
    <div className={styles.Card}>
      <div className='card-wrapper'>
        <div className='card-container'>
          <div className='card-image'>
            <img src={img_url} alt='Card Image' />
          </div>
          <div className='card-content'>
            <h3 className='card-name'>{name}</h3>
            <p className='card-price'>${price}</p>
            <ul className='card-color'>
              {color.map((item, index) => (
                <li key={index} className={`card-color-item`} style={{
                  backgroundColor: item,
                }}></li>
              ))}
            </ul>
          </div>
          <div className='card-footer'>
            <span className='card-footer-title'>Shopping Now</span>
            <span className='card-footer-btn'>
              <Link to={`/products/${name}`} state={{ id: id }}>
                <Right></Right>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
