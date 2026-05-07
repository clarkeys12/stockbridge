// ================================
// PRODUCT DATA
// Swap out names, prices, details,
// and image paths as you go.
// ================================

const PLACEHOLDER = '/images/placeholder.svg';

const products = [
  {
    slug: 'raglan-shirt',
    name: 'Raglan Shirt',
    price: 428,
    images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
    details: [
      '10.75oz Stone Washed Brown Denim [Japan]',
      '100% cotton',
      'Dual access (top and side seam) front pockets',
      "Center 'kangaroo' easy access pocket",
      'Hidden key clip',
      'Exterior front patch pocket',
      'Flat felled and bound seam construction',
      '3-button half placket',
      'Brass tack buttons',
      'Raglan sleeve',
      'Convertible collar',
      'Button + loop closure on cuffs',
      'True to size, boxy fit.',
    ],
    fit: "Gene is 6'0\", 160lbs wearing size Medium paired with The Volume Trousers in Sage",
    colors: [
      { name: 'Brown', hex: '#A2845E' },
      { name: 'Sage', hex: '#A1CE9E' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'volume-trousers',
    name: 'Volume Trousers',
    price: 388,
    images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
    details: [
      'Heavyweight cotton twill',
      '100% cotton',
      'Wide leg silhouette',
      'Double pleat front',
      'Side seam pockets',
      'Back welt pockets',
      'Button fly closure',
      'True to size, relaxed fit.',
    ],
    fit: 'Model is 6\'0", 160lbs wearing size Medium',
    colors: [
      { name: 'Sage', hex: '#A1CE9E' },
      { name: 'Stone', hex: '#D4C5B2' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'camp-collar-shirt',
    name: 'Camp Collar Shirt',
    price: 348,
    images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
    details: [
      'Lightweight cotton poplin',
      '100% cotton',
      'Camp collar',
      'Chest patch pocket',
      'Full button front',
      'Box pleat back',
      'Relaxed fit.',
    ],
    fit: 'Model is 6\'0", 160lbs wearing size Medium',
    colors: [
      { name: 'Cream', hex: '#F5F0EB' },
      { name: 'Brown', hex: '#A2845E' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

export default products;

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}
