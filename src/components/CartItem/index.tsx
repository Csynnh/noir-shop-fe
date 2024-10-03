import React, { useState } from 'react';
import styles from './styles.module.scss';
import Minus from '@components/Icons/Minus';
import Plus from '@components/Icons/Plus';
interface CartItemProps {
  // image: string;
  count: number;
  name: string;
  price: string;
  color: string;
}

const CartItem: React.FC<CartItemProps> = ({ count, name, price, color }) => {
  const [Count, setCount] = useState(count);
  const handleIncreseCount = () => {
    setCount(Count + 1);
  };
  const handleDecreseCount = () => {
    if (Count == 1) {
      return;
    }
    setCount(Count - 1);
  };

  return (
    <div className={styles.CartItem}>
      <div className='CartItem-content'>
        <img
          src='https://images.unsplash.com/photo-1727619949691-f12d6ea1a8ed?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt={name}
        />
        <div className='CartItem-info'>
          <p>{name}</p>
          <div className='CartItem-price'>
            <span>Price: </span>
            <p>{price}</p>
          </div>
          <div className='CartItem-color'>
            <span>Color: </span>
            <span>{color}</span>
          </div>
        </div>
      </div>
      <div className='CartItem-quanlity'>
        <span onClick={handleDecreseCount}>
          <Minus></Minus>
        </span>
        <p>{Count}</p>
        <span onClick={handleIncreseCount}>
          <Plus></Plus>
        </span>
      </div>
    </div>
  );
};

export default CartItem;
