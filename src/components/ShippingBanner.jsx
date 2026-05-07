import CartDrawer from './CartDrawer';
import './ShippingBanner.css';

export default function ShippingBanner() {
  return (
    <div className="shipping-banner">
      <div className="shipping-banner__track">
        <span>Free Shipping on orders over $250</span>
        <span>Free Shipping on orders over $250</span>
      </div>
      <CartDrawer />
    </div>
  );
}
