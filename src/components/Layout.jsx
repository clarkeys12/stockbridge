import { Outlet } from 'react-router-dom';
import ShippingBanner from './ShippingBanner';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="layout">
      <ShippingBanner />
      <Sidebar />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
