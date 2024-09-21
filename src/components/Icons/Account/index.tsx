import { Link } from 'react-router-dom';

const Account = () => {
  return (
    <Link to='#'>
      <svg
        width='15'
        height='16'
        viewBox='0 0 15 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1.00006 15C1.00006 15 0.999832 12.9031 1.00025 10.6251C1.00061 8.68055 14 8.68054 14 10.625V15M10.4546 3.91667C10.4546 5.5275 9.13177 6.83333 7.50003 6.83333C5.86829 6.83333 4.5455 5.5275 4.5455 3.91667C4.5455 2.30584 5.86829 1 7.50003 1C9.13177 1 10.4546 2.30584 10.4546 3.91667Z'
          stroke='black'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </svg>
    </Link>
  );
};

export default Account;
