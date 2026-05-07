import { useState } from 'react';
import './ArchivePage.css';

const collections = [
  {
    id: 'fw24',
    season: 'FW24',
    name: 'Volume I',
    description: 'Brooklyn stillness. Garment-dyed essentials cut for movement and rest.',
    images: [
      { src: '/images/Stockbridge_FW24Shoot_Char-013_1.jpg', alt: 'FW24 lookbook — layered outerwear', span: 'tall' },
      { src: '/images/Stockbridge_FW24Shoot_CharlieSelects-31.jpg', alt: 'FW24 lookbook — detail shot', span: 'wide' },
      { src: '/images/Colbo and Stockbridge 13.jpg', alt: 'FW24 lookbook — editorial', span: 'normal' },
      { src: '/images/Colbo and Stockbridge 4.jpg', alt: 'FW24 lookbook — studio', span: 'normal' },
      { src: '/images/Colbo and Stockbridge 5.jpg', alt: 'FW24 lookbook — environment', span: 'tall' },
      { src: '/images/Colbo and Stockbridge 15.jpg', alt: 'FW24 lookbook — close up', span: 'normal' },
    ],
  },
  {
    id: 'stills',
    season: 'SS25',
    name: 'Stills',
    description: 'Quiet frames from the studio and the street.',
    images: [
      { src: '/images/Stockbridge_MLJ_Still 2025-09-30 100631_1.8.1.jpg', alt: 'SS25 still — 1', span: 'wide' },
      { src: '/images/Stockbridge_MLJ_Still 2025-09-30 100631_1.40.1.jpg', alt: 'SS25 still — 2', span: 'normal' },
      { src: '/images/Stockbridge_MLJ_Still 2025-09-30 100631_1.48.1.jpg', alt: 'SS25 still — 3', span: 'normal' },
      { src: '/images/Stockbridge_MLJ_Still 2025-09-30 100631_1.50.1.jpg', alt: 'SS25 still — 4', span: 'tall' },
    ],
  },
];

export default function ArchivePage() {
  const [activeCollection, setActiveCollection] = useState(collections[0].id);
  const current = collections.find((c) => c.id === activeCollection);

  return (
    <div className="archive">
      <header className="archive__header">
        <h1 className="archive__title">Archive</h1>
        <nav className="archive__nav">
          {collections.map((col) => (
            <button
              key={col.id}
              className={`archive__tab ${activeCollection === col.id ? 'archive__tab--active' : ''}`}
              onClick={() => setActiveCollection(col.id)}
            >
              {col.season} — {col.name}
            </button>
          ))}
        </nav>
      </header>

      {current && (
        <>
          <p className="archive__description">{current.description}</p>

          <div className="archive__grid">
            {current.images.map((img, i) => (
              <figure
                className={`archive__figure archive__figure--${img.span}`}
                key={`${current.id}-${i}`}
              >
                <img
                  className="archive__img"
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
