import { NavLink } from 'react-router-dom';
import logoImg from '../../../assets/icons/logo.svg';
import searchIcon from '../../../assets/icons/search-normal.svg';
import bagIcon from '../../../assets/icons/basket.svg';
import userIcon from '../../../assets/icons/profile.svg';
import { navLinks } from '../../../constants/mockData';
import './Navbar.css';

function Navbar() {

  return (
    <header className="header">
      <div className="header-inner">

        <div className="logo" aria-label="Tech Heim logo">
          <NavLink to="/">
            <img src={logoImg} alt="Logo" />
          </NavLink>
        </div>

        <nav className="navbar">
          <ul>
            {navLinks.map((link) => (
              <li key={link}>
                <NavLink 
                  to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(/\s+/g, '-')}`} 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''} ${link === 'Products' && isActive ? 'active-products' : ''}`
                  }
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-icons">
          <button type="button" className="icon-btn" aria-label="Search">
            <img src={searchIcon} alt="" className="icon-search" />
          </button>
          <button type="button" className="icon-btn" aria-label="Cart">
            <img src={bagIcon} alt="" className="icon-basket" />
          </button>
          <button type="button" className="icon-btn" aria-label="User profile">
            <img src={userIcon} alt="" className="icon-user" />
          </button>
        </div>
      </div>

      <div className="header-mobile">
        <div className="header-mobile-top">
          <button type="button" className="mobile-menu-btn" aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>

          <div className="mobile-logo-text">Tech Heim</div>

          <div className="mobile-icons">
            <button type="button" className="icon-btn mobile-icon-btn" aria-label="Cart">
              <img src={bagIcon} alt="" className="icon-basket" />
            </button>
            <button type="button" className="icon-btn mobile-icon-btn" aria-label="User profile">
              <img src={userIcon} alt="" className="icon-user" />
            </button>
          </div>
        </div>

        <button type="button" className="mobile-search" aria-label="Search products">
          <span className="mobile-search-placeholder">What can we help you to find ?</span>
          <img src={searchIcon} alt="" className="mobile-search-icon" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
