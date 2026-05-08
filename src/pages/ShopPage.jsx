import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../lib/shopify';
import products from '../data/products';
import './ShopPage.css';

export default function ShopPage() {
  const [shopifyProducts, setShopifyProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

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

  const displayProducts = shopifyProducts
    ? shopifyProducts.map((p) => ({
        slug: p.handle,
        name: p.title,
        price: p.variants.edges[0]?.node.price?.amount || '0',
        images: p.images.edges.map((e) => e.node.src),
        colors: p.options
          ?.find((opt) => opt.name.toLowerCase() === 'color')
          ?.values?.map((v) => ({ name: v, hex: colorToHex(v) })) || [],
        productType: p.productType || '',
        createdAt: p.createdAt || '',
      }))
    : products;

  const productTypes = ['All', ...new Set(
    displayProducts.map((p) => p.productType).filter(Boolean)
  )];

  let filtered = activeFilter === 'All'
    ? displayProducts
    : displayProducts.filter((p) => p.productType === activeFilter);

  if (sortBy === 'newest') {
    filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
  }

  if (loading) {
    return (
      <div className="shop-page">
        <div className="shop-page__loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="shop-page__toolbar">
        <div className="shop-page__filters">
          {productTypes.map((type) => (
            <button
              key={type}
              className={`shop-page__filter ${activeFilter === type ? 'is-active' : ''}`}
              onClick={() => setActiveFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <select
          className="shop-page__sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <div className="shop-page__grid">
        {filtered.map((product) => (
          <Link
            to={`/product/${product.slug}`}
            className="shop-page__card"
            key={product.slug}
          >
            <div className="shop-page__image-wrap">
              <img
                src={product.images[0] || '/images/placeholder.svg'}
                alt={product.name}
                className="shop-page__image shop-page__image--primary"
              />
              {product.images[1] && (
                <img
                  src={product.images[1]}
                  alt={`${product.name} — alternate`}
                  className="shop-page__image shop-page__image--hover"
                />
              )}
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
