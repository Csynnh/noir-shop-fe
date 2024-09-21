import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Link to='/'>
      <svg
        width='15'
        height='17'
        viewBox='0 0 15 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5.2 15.5V8.5H9.4V15.5M1 6.4L7.3 1.5L13.6 6.4V14.1C13.6 14.4713 13.4525 14.8274 13.19 15.0899C12.9274 15.3525 12.5713 15.5 12.2 15.5H2.4C2.0287 15.5 1.6726 15.3525 1.41005 15.0899C1.1475 14.8274 1 14.4713 1 14.1V6.4Z'
          stroke='#1E1E1E'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Link>
  );
};

export default Home;
