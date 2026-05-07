import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { lineItems, cartCount, totalPrice, goToCheckout } = useCart();

  return (
    <>
      <button className="cart-toggle" onClick={() => setIsOpen(true)}>
        <span className="cart-toggle__label">Cart</span>
        <span className="cart-toggle__count">({cartCount})</span>
      </button>

      {isOpen && (
        <div className="cart-overlay" onClick={() => setIsOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer__header">
              <span>Cart ({cartCount})</span>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>

            <div className="cart-drawer__body">
              {lineItems.length === 0 ? (
                <p className="cart-drawer__empty">Your cart is empty</p>
              ) : (
                <ul className="cart-drawer__items">
                  {lineItems.map((item) => (
                    <li className="cart-drawer__item" key={item.id}>
                      {item.variant?.image?.src && (
                        <img
                          className="cart-drawer__item-image"
                          src={item.variant.image.src}
                          alt={item.title}
                        />
                      )}
                      <div className="cart-drawer__item-info">
                        <span className="cart-drawer__item-title">{item.title}</span>
                        <span className="cart-drawer__item-variant">
                          {item.variant?.title !== 'Default Title' && item.variant?.title}
                        </span>
                        <span className="cart-drawer__item-qty">Qty: {item.quantity}</span>
                      </div>
                      <span className="cart-drawer__item-price">
                        ${(parseFloat(item.variant?.price?.amount || item.variant?.price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lineItems.length > 0 && (
              <div className="cart-drawer__footer">
                <div className="cart-drawer__total">
                  <span>Total</span>
                  <span>
                    ${parseFloat(totalPrice).toFixed(2)}
                  </span>
                </div>
                <button className="cart-drawer__checkout" onClick={goToCheckout}>
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
