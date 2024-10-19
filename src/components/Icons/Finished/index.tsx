import { IconProps } from '../HistoryPurchase';

const Finished = ({ isActive }: IconProps) => {
  return (
    <svg
      width='42'
      height='41'
      viewBox='0 0 42 41'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`group ${isActive ? 'fill-black' : 'hover:fill-black cursor-pointer'}`}
    >
      <rect
        x='0.75'
        y='0.25'
        width='40.5'
        height='40.5'
        rx='20.25'
        stroke='#1B352A'
        stroke-width='0.5'
      />
      <path
        d='M19.0326 20L20.8103 21.7778L24.3659 18.2222M29.6992 20C29.6992 21.0506 29.4923 22.0909 29.0903 23.0615C28.6882 24.0321 28.0989 24.914 27.3561 25.6569C26.6132 26.3997 25.7313 26.989 24.7607 27.391C23.7901 27.7931 22.7498 28 21.6992 28C20.6486 28 19.6084 27.7931 18.6378 27.391C17.6671 26.989 16.7852 26.3997 16.0424 25.6569C15.2995 24.914 14.7102 24.0321 14.3082 23.0615C13.9061 22.0909 13.6992 21.0506 13.6992 20C13.6992 17.8783 14.5421 15.8434 16.0424 14.3431C17.5427 12.8429 19.5775 12 21.6992 12C23.821 12 25.8558 12.8429 27.3561 14.3431C28.8564 15.8434 29.6992 17.8783 29.6992 20Z'
        stroke='#1B352A'
        stroke-width='0.75'
        stroke-linecap='round'
        stroke-linejoin='round'
        className={`${isActive ? 'stroke-white' : 'group-hover:stroke-white '}`}
      />
    </svg>
  );
};

export default Finished;
