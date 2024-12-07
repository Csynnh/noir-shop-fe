import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from '@components/Header';
import Home from '@pages/Home';
import GiftCard from '@pages/GiftCard';
import Contact from '@pages/Contact/Contact';
import About from '@pages/About/About';
import Footer from '@components/Footer';
import ProductDetails from '@pages/ProductDetails';
import ScrollToTop from '@components/ScrollToTop';
import PrivatePolicy from '@pages/Policy/PrivatePolicy';
import ShippingPolicy from '@pages/Policy/ShippingPolicy';
import MembershipPolicy from '@pages/Policy/MembershipPolicy';
import SignIn from '@pages/SignIn/SignIn';
import SignUp from '@pages/SignUp';
import Checkout from '@pages/Checkout';
import Account from '@pages/Account';
import HeaderAdmin from '@components/HeaderAdmin';
import FooterAdmin from '@components/FooterAdmin';
import ManagementProduct from '@pages/ManagementProduct';
import ManagementOder from '@pages/ManagementOder';
import SearchingResult from '@pages/SearchingResult';
import { Navigate } from 'react-router-dom';
import AnalyzeRevenue from '@pages/Analyze';
import { JwtPayload, ROLE } from '@constant/Api';
import ManagementEmployee from '@pages/ManagementEmployee';

function App() {
  return (
    <Router>
      <>
        <ScrollToTop>
          <Routes>
            <Route
              path='/admin/*'
              element={
                <Routes>
                  <Route
                    element={
                      <ProtectedRoute>
                        <div className='flex flex-col'>
                          <HeaderAdmin />
                          <Outlet />
                          <FooterAdmin />
                        </div>
                      </ProtectedRoute>
                    }
                  >
                    <Route path='/' element={<ManagementProduct />} />
                    <Route path='/manage-oder' element={<ManagementOder />} />
                    <Route path='/analyze-revenue' element={<ManagementProduct />} />
                    <Route path='/analyze' element={<AnalyzeRevenue />} />
                    <Route path='/manage-employee' element={<ManagementEmployee />} />
                  </Route>
                  <Route path='/sign-in' element={<SignIn />} />
                </Routes>
              }
            />
            <Route
              path='/*'
              element={
                <div className='flex flex-col min-h-screen'>
                  <Header />
                  <div className='flex-1'>
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/gift-card' element={<GiftCard />} />
                      <Route path='/contact' element={<Contact />} />
                      <Route path='/about' element={<About />} />
                      <Route path='/products/:name' element={<ProductDetails />} />
                      <Route path='/private-policy' element={<PrivatePolicy />} />
                      <Route path='/shipping-and-return-policy' element={<ShippingPolicy />} />
                      <Route path='/membership-policy' element={<MembershipPolicy />} />
                      <Route path='/sign-in' element={<SignIn />} />
                      <Route path='/sign-up' element={<SignUp />} />
                      <Route path='/checkout' element={<Checkout />} />
                      <Route path='/account' element={<Account />} />
                      <Route path='/search/:name' element={<SearchingResult />} />
                    </Routes>
                  </div>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </ScrollToTop>
      </>
    </Router>
  );
}

function ProtectedRoute({ children }: any) {
  const token = JSON.parse(localStorage.getItem('user') ?? '{}')?.token;

  const decodedToken: JwtPayload = token ? JSON.parse(atob(token?.split('.')[1])) : {};
  if (decodedToken[ROLE] === 'Admin') {
    return children;
  }
  return (
    <Navigate
      to='/admin/sign-in'
      state={{
        from: {
          pathname: window.location.pathname,
        },
      }}
    />
  );
}

export default App;
