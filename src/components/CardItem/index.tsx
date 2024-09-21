import Right from '@icons/Right';
import styles from './styles.module.scss';

export interface CardItemProps {
  name: string;
  price: number;
  color: string[];
  img_url: string;
}
// @ts-ignore
const CardItem = (prop: CardItemProps) => {
  const { name, price, color, img_url } = prop;
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
                <li key={index} className={`card-color-item --${item}`}></li>
              ))}
            </ul>
          </div>
          <div className='card-footer'>
            <span className='card-footer-title'>Shopping Now</span>
            <span className='card-footer-btn'>
              <Right></Right>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
