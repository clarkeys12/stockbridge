import { createContext, useContext, useState, useEffect } from 'react';
import { createCart, addCartLines } from '../lib/shopify';

const CartContext = createContext();

// Shopify returns checkoutUrl using the store's primary domain (stockbridge.us)
// but that domain now points to Vercel (React app), not Shopify.
// Replace it with the .myshopify.com domain so checkout actually reaches Shopify.
function fixCheckoutUrl(url) {
  if (!url) return url;
  return url.replace('stockbridge.us', 'stockbridge-6607.myshopify.com');
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const initCart = async () => {
      try {
        const newCart = await createCart();
        setCart(newCart);
      } catch (err) {
        console.error('Shopify cart init error:', err);
      }
    };
    initCart();
  }, []);

  const updateCount = (cartData) => {
    const items = cartData.lines?.edges || [];
    setCartCount(items.reduce((sum, edge) => sum + edge.node.quantity, 0));
  };

  const addToCart = async (variantId, quantity = 1) => {
    if (!cart) return;
    try {
      const updated = await addCartLines(cart.id, [{ merchandiseId: variantId, quantity }]);
      setCart(updated);
      updateCount(updated);
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  const goToCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = fixCheckoutUrl(cart.checkoutUrl);
    }
  };

  const checkoutUrl = fixCheckoutUrl(cart?.checkoutUrl);

  const lineItems = (cart?.lines?.edges || []).map((edge) => {
    const node = edge.node;
    const merch = node.merchandise;
    return {
      id: node.id,
      title: merch.product?.title || merch.title,
      quantity: node.quantity,
      variant: {
        id: merch.id,
        title: merch.title,
        price: merch.price,
        image: merch.image ? { src: merch.image.url } : null,
      },
    };
  });
  const totalPrice = cart?.cost?.totalAmount?.amount || '0';

  return (
    <CartContext.Provider
      value={{ cart, cartCount, lineItems, totalPrice, addToCart, goToCheckout, checkoutUrl }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
