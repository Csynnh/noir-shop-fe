import Logo from '@components/Icons/Logo';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@components/Button';
import Ring from '@components/Icons/Ring';
import AccountAdmin from '@components/Icons/AccountAdmin';
import { useNavigate } from 'react-router-dom';

enum Routes {
  ManageProduct = '',
  ManageOder = 'manage-oder',
  AnalyzeRevenue = 'analyze-revenue',
}

const HeaderAdmin = () => {
  const nav = useNavigate();
  const [currentRoute, setCurrentRoute] = useState<Routes>(Routes.ManageProduct);

  useEffect(() => {
    const path = window.location.pathname as Routes;
    if (Object.values(Routes).includes(path)) {
      setCurrentRoute(path);
    }
  }, []);

  const handleSignOut = () => {
    console.log('signout');
  };

  const handleRoute = (route: Routes) => {
    setCurrentRoute(route);
    nav(route);
  };
  return (
    <div className='w-full mb-14'>
      <div className=''>
        <div className='flex items-end justify-end gap-6 text-sm px-16 py-8'>
          <span onClick={handleSignOut} className='cursor-pointer'>
            Sign out
          </span>
          <Link to={'http://ui.noir-shop.online/'} className='cursor-pointer'>
            Website &gt;
          </Link>
        </div>
        <div className='border-y border-[#c9c5c9] px-16 flex items-center justify-between'>
          <span className=''>
            <Logo></Logo>
          </span>
          <div className='flex-[0_0_50%] flex justify-end'>
            <div className='flex items-center gap-4 flex-1'>
              <div className='max-w-[180px] w-full'>
                <Button
                  isPrimary={currentRoute == Routes.ManageProduct}
                  onClick={() => handleRoute(Routes.ManageProduct)}
                >
                  Manage Product
                </Button>
              </div>
              <div className='max-w-[180px] w-full'>
                <Button
                  isPrimary={currentRoute == Routes.ManageOder}
                  onClick={() => handleRoute(Routes.ManageOder)}
                >
                  Manage Oder
                </Button>
              </div>
              <div className='max-w-[180px] w-full'>
                <Button
                  isPrimary={currentRoute == Routes.AnalyzeRevenue}
                  onClick={() => handleRoute(Routes.AnalyzeRevenue)}
                >
                  Analyze Revenue
                </Button>
              </div>
            </div>
            <div className='p-5 border-x border-[#c9c5c9]'>
              <Ring></Ring>
            </div>
            <div className='p-5 border-r border-[#c9c5c9]'>
              <AccountAdmin></AccountAdmin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
