import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <Link to='#'>
      <svg
        width='17'
        height='16'
        viewBox='0 0 17 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1 1H3.72727L5.55455 9.92667C5.61689 10.2336 5.78766 10.5093 6.03696 10.7055C6.28626 10.9018 6.5982 11.006 6.91818 11H13.5455C13.8654 11.006 14.1774 10.9018 14.4267 10.7055C14.676 10.5093 14.8467 10.2336 14.9091 9.92667L16 4.33333H4.40909M7.13636 14.3333C7.13636 14.7015 6.8311 15 6.45455 15C6.07799 15 5.77273 14.7015 5.77273 14.3333C5.77273 13.9651 6.07799 13.6667 6.45455 13.6667C6.8311 13.6667 7.13636 13.9651 7.13636 14.3333ZM14.6364 14.3333C14.6364 14.7015 14.3311 15 13.9545 15C13.578 15 13.2727 14.7015 13.2727 14.3333C13.2727 13.9651 13.578 13.6667 13.9545 13.6667C14.3311 13.6667 14.6364 13.9651 14.6364 14.3333Z'
          stroke='#1E1E1E'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Link>
  );
};

export default Cart;
