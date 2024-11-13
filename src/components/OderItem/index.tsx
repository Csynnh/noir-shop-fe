import { useState } from 'react';
import styles from './styles.module.scss';
import Minus from '@components/Icons/Minus';
import Plus from '@components/Icons/Plus';
import { ProductCheckoutType } from '@pages/Checkout';
interface OderItemProps {
  data?: ProductCheckoutType;
}
const OderItem = ({ data }: OderItemProps) => {
  console.log('data', data)
  const [price] = useState(120);
  const [count, setCount] = useState(2);
  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <div className={styles.OderItem}>
      <div className='oder-item'>
        <div className='oder-item-image'>
          <img
            src={data?.variants?.[0].image}
            alt='oder item'
          />
        </div>
        <div className='oder-item-info'>
          <div className='oder-item-name'>{data?.name}</div>
          <div className='oder-item-price'>
            Prices: <span>${data?.price?.toFixed(2)}</span>
          </div>
          <div className='oder-item-colors'>
            <p>Colors:</p>
            <div className='oder-item-color-list'>
              <div className='oder-item-color --red'></div>
              <div className='oder-item-color --blue'></div>
            </div>
          </div>
        </div>
        <div className='oder-item-count'>
          <div className='oder-item-btn' onClick={handleDecrease}>
            <Minus></Minus>
          </div>
          <div className='oder-item-count-number'>{count}</div>
          <div className='oder-item-btn' onClick={handleIncrease}>
            <Plus></Plus>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OderItem;
