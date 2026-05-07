import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page__hero">
        <img
          className="home-page__img"
          src="/images/ss26-hero-2.jpg"
          alt="SS26 — detail, herringbone vest and earth"
          loading="eager"
        />

        <div className="home-page__overlay">
          <p className="home-page__season">SS26</p>
          <Link to="/shop" className="home-page__shop-btn">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
