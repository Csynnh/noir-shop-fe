import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from '@components/Header';
import Home from '@pages/Home';
import NewCollection from '@pages/NewConllection';
import GiftCard from '@pages/GiftCard';
import Contact from '@pages/Contact';
import About from '@pages/About';
import Footer from '@components/Footer';

function App() {
  return (
    <Router>
      <>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new-collection' element={<NewCollection />} />
          <Route path='/gift-card' element={<GiftCard />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer></Footer>
      </>
    </Router>
  );
}

export default App;
