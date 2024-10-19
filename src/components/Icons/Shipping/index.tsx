import { IconProps } from '../HistoryPurchase';

const Shipping = ({ isActive }: IconProps) => {
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
        d='M18.9091 25H18.5341V25.375C18.5341 26.0074 18.3197 26.532 17.8865 26.9709C17.4535 27.4097 16.938 27.625 16.3182 27.625C15.6984 27.625 15.1829 27.4097 14.7498 26.9709C14.3166 26.532 14.1023 26.0074 14.1023 25.375V25H13.7273H12.375V15.75C12.375 15.3674 12.5052 15.0501 12.7743 14.7775C13.0432 14.5051 13.3541 14.375 13.7273 14.375H25.4432V17.5V17.875H25.8182H28.2201L30.625 21.1237V25H29.2727H28.8977V25.375C28.8977 26.0074 28.6834 26.532 28.2502 26.9709C27.8171 27.4097 27.3016 27.625 26.6818 27.625C26.062 27.625 25.5465 27.4097 25.1135 26.9709C24.6803 26.532 24.4659 26.0074 24.4659 25.375V25H24.0909H18.9091Z'
        stroke='#1B352A'
        stroke-width='0.75'
        className={`${isActive ? 'stroke-white' : 'group-hover:stroke-white '}`}
      />
    </svg>
  );
};

export default Shipping;
