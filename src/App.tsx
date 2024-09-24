import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from '@components/Header';
import Home from '@pages/Home';
import GiftCard from '@pages/GiftCard';
import Contact from '@pages/Contact';
import About from '@pages/About';
import Footer from '@components/Footer';
import Item from '@pages/Item';
import ScrollToTop from '@components/ScrollToTop';

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
          </Routes>
          <Footer></Footer>
        </ScrollToTop>
      </>
    </Router>
  );
}

export default App;
