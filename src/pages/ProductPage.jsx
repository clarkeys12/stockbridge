import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductByHandle } from '../lib/shopify';
import { useCart } from '../context/CartContext';
import { getProductBySlug } from '../data/products';
import './ProductPage.css';

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetched = await fetchProductByHandle(slug);
        if (fetched) {
          // Normalize Shopify product to our shape
          const variants = fetched.variants.edges.map((e) => e.node);
          const sizeOption = fetched.options?.find(
            (o) => o.name.toLowerCase() === 'size'
          );
          const colorOption = fetched.options?.find(
            (o) => o.name.toLowerCase() === 'color'
          );

          setProduct({
            _shopify: fetched,
            slug: fetched.handle,
            name: fetched.title,
            price: variants[0]?.price?.amount || '0',
            images: fetched.images.edges.map((e) => e.node.src),
            details: fetched.descriptionHtml
              ? parseDetails(fetched.descriptionHtml)
              : [],
            fit: '',
            colors: colorOption
              ? colorOption.values.map((v) => ({
                  name: v,
                  hex: colorToHex(v),
                }))
              : [],
            sizes: sizeOption ? sizeOption.values : [],
            variants,
          });
        } else {
          const local = getProductBySlug(slug);
          if (local) setProduct({ ...local, _shopify: null, variants: [] });
        }
      } catch (err) {
        console.error('Shopify product fetch error:', err);
        const local = getProductBySlug(slug);
        if (local) setProduct({ ...local, _shopify: null, variants: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="product-page" style={{ padding: '80px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page" style={{ padding: '80px' }}>
        <p>Product not found.</p>
      </div>
    );
  }

  const scrollTo = (index) => {
    const next = Math.max(0, Math.min(index, product.images.length - 1));
    setCurrentImage(next);
    if (trackRef.current) {
      const child = trackRef.current.children[next];
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  };

  const handleAddToCart = async () => {
    if (!product._shopify || !selectedSize) return;

    // Find the matching variant
    const selectedColorName = product.colors[selectedColor]?.name;
    const variant = product.variants.find((v) => {
      const opts = v.selectedOptions || [];
      const sizeMatch = opts.find(
        (o) => o.name.toLowerCase() === 'size' && o.value === selectedSize
      );
      const colorMatch =
        !selectedColorName ||
        opts.find(
          (o) => o.name.toLowerCase() === 'color' && o.value === selectedColorName
        );
      return sizeMatch && colorMatch;
    });

    if (variant) {
      setAdding(true);
      await addToCart(variant.id);
      setAdding(false);
    }
  };

  return (
    <div className="product-page">
      {/* Image Column */}
      <div className="product-page__images">
        <div className="product-page__image-track" ref={trackRef}>
          {product.images.map((src, i) => (
            <div className="product-page__image-wrap" key={i}>
              <img
                src={src}
                alt={`${product.name} — view ${i + 1}`}
                className="product-page__image"
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        {product.images.length > 1 && (
          <div className="product-page__image-nav">
            <button
              className="product-page__image-arrow"
              onClick={() => scrollTo(currentImage - 1)}
              disabled={currentImage === 0}
            >
              ←
            </button>
            <div className="product-page__image-dots">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  className={`product-page__image-dot ${currentImage === i ? 'is-active' : ''}`}
                  onClick={() => scrollTo(i)}
                />
              ))}
            </div>
            <button
              className="product-page__image-arrow"
              onClick={() => scrollTo(currentImage + 1)}
              disabled={currentImage === product.images.length - 1}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Details Column */}
      <div className="product-page__details">
        {/* Title + Price */}
        <div className="product-page__title-block">
          <h1 className="product-page__title">{product.name}</h1>
          <span className="product-page__price">${Math.round(Number(product.price))}</span>
        </div>

        {/* Purchase Row */}
        <div className="product-page__purchase">
          <div className="product-page__options-col">
            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="product-page__size-row">
                <span className="product-page__option-label">Size</span>
                <div className="product-page__sizes">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`product-page__size ${selectedSize === size ? 'is-active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="product-page__color-row">
                <span className="product-page__option-label">Color</span>
                <div className="product-page__colors">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      className={`product-page__color-swatch ${selectedColor === i ? 'is-active' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(i)}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <button
            className="product-page__add-to-cart"
            onClick={handleAddToCart}
            disabled={adding || !selectedSize}
          >
            {adding ? 'Adding...' : selectedSize ? 'Add to Cart' : 'Select Size'}
          </button>
        </div>

        {/* Accordions */}
        {product.details.length > 0 && (
          <div className="product-page__accordions">
            <div className="product-page__accordion">
              <button
                className="product-page__accordion-toggle"
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                <span>Details</span>
                <span>{detailsOpen ? '−' : '+'}</span>
              </button>
              {detailsOpen && (
                <div className="product-page__accordion-body">
                  <ul className="product-page__specs">
                    {product.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                  {product.fit && (
                    <p className="product-page__fit">{product.fit}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Care */}
        <div className="product-page__care">
          Machine wash cold, hang dry
        </div>
      </div>
    </div>
  );
}

/* Parse Shopify HTML description into detail lines */
function parseDetails(html) {
  // Strip tags, split on newlines/list items
  const text = html
    .replace(/<li>/gi, '\n• ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .trim();
  return text
    .split('\n')
    .map((line) => line.replace(/^•\s*/, '').trim())
    .filter(Boolean);
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
