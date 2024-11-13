import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './styles.module.scss';
import Minus from '@components/Icons/Minus';
import Plus from '@components/Icons/Plus';
import { CartItemData } from '@components/MyCartTab';
interface CartItemProps {
  id: string;
  image: string;
  count: number;
  name: string;
  price: number;
  color: string;
  onChange: Dispatch<SetStateAction<CartItemData[]>>;
}

const CartItem: React.FC<CartItemProps> = ({ id, count, name, price, color, image, onChange }) => {
  const handleIncreseCount = () => {
    onChange((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item)),
    );
  };
  const handleDecreseCount = () => {
    onChange((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, count: count - 1 };
        }
        return item;
      });
      return updatedItems.filter((item) => item.count);
    });
  };

  return (
    <div className={styles.CartItem}>
      <div className='CartItem-content'>
        <img src={image} alt={name} />
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
        <p>{count}</p>
        <span onClick={handleIncreseCount}>
          <Plus></Plus>
        </span>
      </div>
    </div>
  );
};

export default CartItem;
