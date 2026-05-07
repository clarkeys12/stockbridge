import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__content">
          <div className="footer__address">
            <p>117 Grattan St</p>
            <p>Brooklyn NY</p>
          </div>

          <div className="footer__links">
            <Link to="/stockist">Stockist</Link>
            <Link to="/shipping">Shipping & Returns</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer__mark">
          <img src="/slogo.png" alt="Stockbridge" />
        </div>
      </div>
    </footer>
  );
}
