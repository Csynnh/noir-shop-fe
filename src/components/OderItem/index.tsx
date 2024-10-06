import { useState } from 'react';
import styles from './styles.module.scss';
import Minus from '@components/Icons/Minus';
import Plus from '@components/Icons/Plus';

const OderItem = () => {
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
            src='https://s3-alpha-sig.figma.com/img/5707/f754/be3d7e359dfb321151b7d77eb9b74fac?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A5AdDuKuoce-vA3L00APSNyeIhy0ubEaEfwPPtSnjIdDGwmBVDrR3W6iXhc9BuAZ1fqLpnq7FdFxFrCXOpqybZurvssrEx~99pkr0ZLv1MwdKmBLAcPTZ2hptTYL6LDmA6V7-FJM~6b~GbhXN6DYGRufrc6dzBeVFcCLhxIp3EfkQmte2kRRj7Yip-IgEjyLkHAe3CESv5MiFatIvCtckTQqXmM~vYaXuHnyh7L3DlYa-Xi7-ySpyBRoYfivzjtF8Miw7ETLHE8cNShZ5X~rL0oCrDJGKuLJ5QO1MsE90NPUjsfpQlM8KJOhGdU5FaAXPAx4VO-DgSyrT62rlVk4WA__'
            alt='oder item'
          />
        </div>
        <div className='oder-item-info'>
          <div className='oder-item-name'>Celestial</div>
          <div className='oder-item-price'>
            Prices: <span>${price.toFixed(2)}</span>
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
