import './Navbar.css';
import logoImg from '../../../assets/icons/logo.png';
import searchIcon from '../../../assets/icons/search-normal.png';
import bagIcon from '../../../assets/icons/bag.png';
import userIcon from '../../../assets/icons/user.png';

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
            <img src={searchIcon} alt="" />
          </button>
          <button type="button" className="icon-btn" aria-label="Cart">
            <img src={bagIcon} alt="" />
          </button>
          <button type="button" className="icon-btn" aria-label="User profile">
            <img src={userIcon} alt="" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
