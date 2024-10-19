import { IconProps } from '../HistoryPurchase';

const Returning = ({ isActive }: IconProps) => {
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
        d='M13.5 12.5018V17.1887H14.0456M14.0456 17.1887C14.668 15.6496 15.7835 14.3605 17.2172 13.5234C18.651 12.6863 20.322 12.3484 21.9684 12.5628C23.6148 12.7772 25.1436 13.5318 26.315 14.7082C27.4865 15.8846 28.2345 17.4164 28.4419 19.0635M14.0456 17.1887H18.1875M28.5 27.5V22.8131H27.9553M27.9553 22.8131C27.3321 24.3512 26.2163 25.6393 24.7827 26.4757C23.349 27.3121 21.6785 27.6495 20.0326 27.4352C18.3867 27.2209 16.8583 26.4669 15.6868 25.2913C14.5152 24.1156 13.7666 22.5847 13.5581 20.9383M27.9553 22.8131H23.8125'
        stroke='black'
        stroke-width='0.75'
        stroke-linecap='round'
        stroke-linejoin='round'
        className={`${isActive ? 'stroke-white' : 'group-hover:stroke-white '}`}
      />
    </svg>
  );
};

export default Returning;
