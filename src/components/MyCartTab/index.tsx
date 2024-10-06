import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import EmptyCard from '@components/Icons/EmptyCard';
import Right from '@components/Icons/Right';
import Button from '@components/Button';
import CartItem from '@components/CartItem';

interface CartItemData {
  name: string;
  price: string;
  color: string;
  count: number;
}

interface myCartProp {
  isOpen: boolean;
  toggleCart: () => void;
}
const MyCartTab: React.FC<myCartProp> = ({ isOpen, toggleCart }) => {
  const [cartItemList, setCartItemList] = useState<CartItemData[]>([]);
  const [subtotal] = useState(0);

  const data = [
    { name: 'Item 1', price: '$10', color: 'Red', count: 2 },
    { name: 'Item 2', price: '$20', color: 'Blue', count: 1 },
    { name: 'Item 3', price: '$15', color: 'Green', count: 3 },
    { name: 'Item 4', price: '$25', color: 'Yellow', count: 1 },
    { name: 'Item 5', price: '$25', color: 'Yellow', count: 1 },
  ];
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (data.length > 0) {
      setIsEmpty(false);
      setCartItemList(data);
    }
  }, []);

  return (
    <div className={`${styles.MyCart}`}>
      <>
        <div className={`MyCart-overlay  ${isOpen ? 'open' : ''}`} onClick={toggleCart}></div>
        <div className={`MyCart-container  ${isOpen ? 'open' : ''}`}>
          <div className='MyCart-header'>
            <p>My card</p>
            <div className='MyCart-count'>
              <span>Summary</span>
              <p> 0 </p>
              <span>items</span>
            </div>
          </div>
          {isEmpty && (
            <div className='MyCart-empty'>
              <EmptyCard></EmptyCard>
              <span>Your shopping cart is currently empty.</span>
              <div className='MyCart-shopping'>
                <p>Shop Now</p>
                <Right></Right>
              </div>
            </div>
          )}
          {!isEmpty && (
            <div className='MyCart-list'>
              <div className='MyCart-items'>
                {cartItemList.map((item) => (
                  <CartItem
                    color={item.color}
                    name={item.name}
                    price={item.price}
                    count={item.count}
                  />
                ))}
              </div>
              <div className='MyCart-total'>
                <div className='MyCart-subTotal'>
                  <p>Subtotal :</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className='MyCart-subTotal'>
                  <p>Shipping: </p>
                  <p>Free</p>
                </div>
                <hr />
                <div className='MyCart-subTotal'>
                  <p className='total'>Total :</p>
                  <p className='total'>$360.00</p>
                </div>
                <Button className='btn_submitContact' onClick={() => {}} isPrimary>
                  Buy now
                </Button>
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default MyCartTab;
