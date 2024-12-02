import { useState } from 'react';
import styles from './styles.module.scss';
import Minus from '@components/Icons/Minus';
import Plus from '@components/Icons/Plus';
import { ProductCheckoutType, ProductOperation } from '@pages/Checkout';
interface OderItemProps {
  data?: ProductCheckoutType;
  onChange?: (method: ProductOperation, id: string, variant_id: string, quality: number) => void;
  variant?: {
    id?: string;
    color?: string;
    image?: string;
    count?: number;
  };
}
const OderItem = ({ data, onChange, variant }: OderItemProps) => {
  console.log(variant);
  const [count, setCount] = useState(
    data?.variants?.reduce((acc, item) => acc + item?.count!, 0) || 1,
  );
  const handleIncrease = () => {
    setCount(count + 1);
    onChange && onChange(ProductOperation.IN_CREASE, data?.id!, variant?.id!, count + 1);
  };
  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
      onChange && onChange(ProductOperation.DECREASE, data?.id!, variant?.id!, count - 1);
    }
  };
  return (
    <div className={styles.OderItem}>
      <div className='oder-item'>
        <div className='oder-item-image'>
          <img src={variant?.image || ''} alt='oder item' />
        </div>
        <div className='oder-item-info'>
          <div className='oder-item-name'>{data?.name}</div>
          <div className='oder-item-price'>
            Prices: <span>${data?.price?.toFixed(2)}</span>
          </div>
          <div className='oder-item-colors'>
            <p>Colors:</p>
            <div className='oder-item-color-list'>
              <div
                key={variant?.id}
                className='oder-item-color'
                style={{ backgroundColor: variant?.color }}
              ></div>
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
