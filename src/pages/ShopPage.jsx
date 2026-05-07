import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../lib/shopify';
import products from '../data/products';
import './ShopPage.css';

export default function ShopPage() {
  const [shopifyProducts, setShopifyProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetched = await fetchAllProducts();
        setShopifyProducts(fetched);
      } catch (err) {
        console.error('Shopify fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Use Shopify products if available, fall back to local data
  const displayProducts = shopifyProducts
    ? shopifyProducts.map((p) => ({
        slug: p.handle,
        name: p.title,
        price: p.variants.edges[0]?.node.price?.amount || '0',
        images: p.images.edges.map((e) => e.node.src),
        colors: p.options
          ?.find((opt) => opt.name.toLowerCase() === 'color')
          ?.values?.map((v) => ({ name: v, hex: colorToHex(v) })) || [],
      }))
    : products;

  if (loading) {
    return (
      <div className="shop-page">
        <div className="shop-page__loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="shop-page__grid">
        {displayProducts.map((product) => (
          <Link
            to={`/product/${product.slug}`}
            className="shop-page__card"
            key={product.slug}
          >
            <div className="shop-page__image-wrap">
              <img
                src={product.images[0] || '/images/placeholder.svg'}
                alt={product.name}
                className="shop-page__image"
              />
            </div>
            <div className="shop-page__info">
              <span className="shop-page__name">{product.name}</span>
              <span className="shop-page__price">${Math.round(Number(product.price))}</span>
            </div>
            {product.colors.length > 0 && (
              <div className="shop-page__colors">
                {product.colors.map((color, i) => (
                  <span
                    key={i}
                    className="shop-page__swatch"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* Map common color names to hex — extend as needed */
function colorToHex(name) {
  const map = {
    brown: '#A2845E',
    sage: '#A1CE9E',
    stone: '#D4C5B2',
    cream: '#F5F0EB',
    black: '#000000',
    white: '#FFFFFF',
    pink: '#E8A0BF',
  };
  return map[name.toLowerCase()] || '#CCCCCC';
}
