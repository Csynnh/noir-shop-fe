import { IconProps } from '../HistoryPurchase';

const Canceled = ({ isActive }: IconProps) => {
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
        strokeWidth='0.5'
      />
      <path
        d='M19.2222 22.2778L21 20.5M21 20.5L22.7778 18.7222M21 20.5L19.2222 18.7222M21 20.5L22.7778 22.2778M29 20.5C29 21.5506 28.7931 22.5909 28.391 23.5615C27.989 24.5321 27.3997 25.414 26.6569 26.1569C25.914 26.8997 25.0321 27.489 24.0615 27.891C23.0909 28.2931 22.0506 28.5 21 28.5C19.9494 28.5 18.9091 28.2931 17.9385 27.891C16.9679 27.489 16.086 26.8997 15.3431 26.1569C14.6003 25.414 14.011 24.5321 13.609 23.5615C13.2069 22.5909 13 21.5506 13 20.5C13 18.3783 13.8429 16.3434 15.3431 14.8431C16.8434 13.3429 18.8783 12.5 21 12.5C23.1217 12.5 25.1566 13.3429 26.6569 14.8431C28.1571 16.3434 29 18.3783 29 20.5Z'
        stroke='#1B352A'
        strokeWidth='0.75'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={`${isActive ? 'stroke-white' : 'group-hover:stroke-white '}`}
      />
    </svg>
  );
};

export default Canceled;
