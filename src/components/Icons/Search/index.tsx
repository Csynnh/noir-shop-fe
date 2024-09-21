import { Link } from 'react-router-dom';

const Search = () => {
  return (
    <Link to='#'>
      <svg
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1 13L3.9 10.1M2.33333 6.33333C2.33333 9.27885 4.72115 11.6667 7.66667 11.6667C10.6122 11.6667 13 9.27885 13 6.33333C13 3.38781 10.6122 1 7.66667 1C4.72115 1 2.33333 3.38781 2.33333 6.33333Z'
          stroke='#1E1E1E'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Link>
  );
};

export default Search;
