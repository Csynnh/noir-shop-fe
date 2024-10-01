import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from '@components/Header';
import Home from '@pages/Home';
import GiftCard from '@pages/GiftCard';
import Contact from '@pages/Contact/Contact';
import About from '@pages/About/About';
import Footer from '@components/Footer';
import Item from '@pages/Item';
import ScrollToTop from '@components/ScrollToTop';
import PrivatePolicy from '@pages/Policy/PrivatePolicy';
import ShippingPolicy from '@pages/Policy/ShippingPolicy';
import MembershipPolicy from '@pages/Policy/MembershipPolicy';
import NewCollection from '@pages/NewConllection';
import { Sign } from 'crypto';
import SignIn from '@pages/SignIn/SignIn';

function App() {
  return (
    <Router>
      <>
        <ScrollToTop>
          <Header></Header>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/gift-card' element={<GiftCard />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/item/:item_id' element={<Item />} />
            <Route path='/private-policy' element={<PrivatePolicy />} />
            <Route path='/shipping-and-return-policy' element={<ShippingPolicy />} />
            <Route path='/membership-policy' element={<MembershipPolicy />} />
            <Route path='/Sign-in' element={<SignIn />} />
          </Routes>
          <Footer></Footer>
        </ScrollToTop>
      </>
    </Router>
  );
}

export default App;
