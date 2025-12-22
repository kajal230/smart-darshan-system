import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Temples from './pages/Temples';
import TempleDetails from './pages/TempleDetails';
import Booking from './pages/Booking';
import Admin from './pages/Admin';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/temples" element={<Temples />} />
        <Route path="/temple/:id" element={<TempleDetails />} />
        <Route path="/booking/:slotId" element={<Booking />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
