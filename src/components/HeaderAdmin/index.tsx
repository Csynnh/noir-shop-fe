import Logo from '@components/Icons/Logo';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@components/Button';
import AccountAdmin from '@components/Icons/AccountAdmin';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useAuth } from '@contexts/AuthContext';
import Notification from '@components/Notification';

enum Routes {
  ManageProduct = '/admin',
  ManageOder = '/admin/manage-oder',
  AnalyzeRevenue = '/admin/analyze',
  ManagementEmployee='/admin/manage-employee'
}

const HeaderAdmin = () => {
  const nav = useNavigate();
  const { removeToken } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<Routes>(Routes.ManageProduct);
  const [isModelOpen, setIsModelOpen] = useState(false);
  useEffect(() => {
    const path = window.location.pathname as Routes;
    if (Object.values(Routes).includes(path)) {
      setCurrentRoute(path);
    }
  }, []);

  const handleSignOut = () => {
    setIsModelOpen(true);
  };

  const handleRoute = (route: Routes) => {
    setCurrentRoute(route);
    nav(route);
  };

  const handleCancel = () => {
    setIsModelOpen(false);
  };

  const handleLogout = () => {
    removeToken();
    setIsModelOpen(false);
    nav('/sign-in', {
      state: {
        from: { pathname: '/admin' },
      },
    });
  };

  return (
    <div className='w-full mb-14'>
      <div className=''>
        <div className='flex items-end justify-end gap-6 text-sm px-16 py-8'>
          <span onClick={handleSignOut} className='cursor-pointer'>
            Sign out
          </span>
          <Link to={'/'} className='cursor-pointer'>
            Website &gt;
          </Link>
        </div>
        <div className='border-y border-[#c9c5c9] px-16 flex items-center justify-between'>
          <span className=''>
            <Logo path='/admin'></Logo>
          </span>
          <div className='flex-[0_0_75%] flex justify-end '>
            <div className='flex items-center gap-4 flex-1 mr-[20px]'>
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
              <div className='max-w-[180px] w-full'>
                <Button
                  isPrimary={currentRoute == Routes.ManagementEmployee}
                  onClick={() => handleRoute(Routes.ManagementEmployee)}
                >
                  Manage Employees
                </Button>
              </div>
            </div>
            <Notification></Notification>
            <div className='p-5 border-r border-[#c9c5c9]'>
              <AccountAdmin></AccountAdmin>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModelOpen}
        onOk={handleLogout}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancle
          </Button>,
          <Button key='submit' isPrimary onClick={handleLogout}>
            Sign Out
          </Button>,
        ]}
      >
        <div className=''>
          <h4 className='text-xl text-left mb-4'>Please confirm</h4>
          <p className='text-sm mb-5'>Are you sure you want to sign out?</p>
        </div>
      </Modal>
    </div>
  );
};

export default HeaderAdmin;
