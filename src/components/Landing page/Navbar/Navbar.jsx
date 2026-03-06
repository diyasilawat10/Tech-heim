import './Navbar.css';
import logoImg from '../../../assets/icons/logo.svg';
import searchIcon from '../../../assets/icons/search-normal.svg';
import bagIcon from '../../../assets/icons/basket.svg';
import userIcon from '../../../assets/icons/profile.svg';

function Navbar() {
  const navLinks = ['Home', 'Products', 'Blog', 'FAQ', 'Contact Us'];

  return (
    <header className="header">
      <div className="header-inner">

        <div className="logo" aria-label="Tech Heim logo">
          <img src={logoImg} alt="Logo" />
        </div>

        <nav className="navbar">
          <ul>
            {navLinks.map((link) => (
              <li key={link}>
                <button type="button" className="nav-link">{link}</button>
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
    </header>
  );
}

export default Navbar;
