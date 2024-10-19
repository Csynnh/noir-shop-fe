import { IconProps } from '../HistoryPurchase';

const Preparing = ({ isActive }: IconProps) => {
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
        d='M12 13H14.9091L16.8582 22.5643C16.9247 22.8931 17.1068 23.1885 17.3728 23.3988C17.6387 23.609 17.9714 23.7207 18.3127 23.7143H25.3818C25.7231 23.7207 26.0559 23.609 26.3218 23.3988C26.5877 23.1885 26.7699 22.8931 26.8364 22.5643L28 16.5714H15.6364M18.5455 27.2857C18.5455 27.6802 18.2198 28 17.8182 28C17.4165 28 17.0909 27.6802 17.0909 27.2857C17.0909 26.8912 17.4165 26.5714 17.8182 26.5714C18.2198 26.5714 18.5455 26.8912 18.5455 27.2857ZM26.5455 27.2857C26.5455 27.6802 26.2198 28 25.8182 28C25.4165 28 25.0909 27.6802 25.0909 27.2857C25.0909 26.8912 25.4165 26.5714 25.8182 26.5714C26.2198 26.5714 26.5455 26.8912 26.5455 27.2857Z'
        stroke='#1B352A'
        stroke-linecap='round'
        stroke-linejoin='round'
        className={`${isActive ? 'stroke-white' : 'group-hover:stroke-white '}`}
      />
    </svg>
  );
};

export default Preparing;
