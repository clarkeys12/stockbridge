import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page__hero">
        <div className="home-page__grid">
          <figure className="home-page__figure home-page__figure--tall">
            <img
              className="home-page__img"
              src="/images/ss26-hero-1.jpg"
              alt="SS26 — full look, sage cargo and cream knit"
              loading="eager"
            />
          </figure>
          <figure className="home-page__figure home-page__figure--detail">
            <img
              className="home-page__img"
              src="/images/ss26-hero-2.jpg"
              alt="SS26 — detail, herringbone vest and earth"
              loading="eager"
            />
          </figure>
          <figure className="home-page__figure home-page__figure--portrait">
            <img
              className="home-page__img"
              src="/images/ss26-hero-3.jpg"
              alt="SS26 — portrait, dark denim chore coat"
              loading="eager"
            />
          </figure>
        </div>

        <div className="home-page__cta">
          <p className="home-page__season">SS26</p>
          <Link to="/shop" className="home-page__shop-btn">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
