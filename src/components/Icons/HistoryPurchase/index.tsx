export interface IconProps {
  isActive?: boolean;
}

const HistoryPurchase = ({ isActive }: IconProps) => {
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
        d='M15 14.5H27M15 18.5H27M15 22.5H27M15 26.5H27'
        className={`${isActive ? 'stroke-white' : 'group-hover:stroke-white '}`}
        stroke='#1B352A'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default HistoryPurchase;
