import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="mobile-header__toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
        <NavLink to="/" className="mobile-header__logo">
          <img src="/stockbridge_logo.png" alt="Stockbridge" />
        </NavLink>
      </div>

      {/* Sidebar / Mobile Menu */}
      <nav className={`sidebar ${menuOpen ? 'is-open' : ''}`}>
        <NavLink to="/" className="sidebar__logo" onClick={() => setMenuOpen(false)}>
          <img src="/stockbridge_logo.png" alt="Stockbridge" className="sidebar__logo-img" />
        </NavLink>

        <ul className="sidebar__nav">
          <li><NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink></li>
          <li><NavLink to="/garment-care" onClick={() => setMenuOpen(false)}>Garment Care</NavLink></li>
          <li><NavLink to="/archive" onClick={() => setMenuOpen(false)}>Archive</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
        </ul>
      </nav>

      {/* Overlay */}
      {menuOpen && <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
