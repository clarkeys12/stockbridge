import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ShopPage from './pages/ShopPage';
import GarmentCarePage from './pages/GarmentCarePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ArchivePage from './pages/ArchivePage';
import './styles/global.css';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/garment-care" element={<GarmentCarePage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

// trigger deploy v2
