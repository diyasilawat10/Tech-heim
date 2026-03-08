import './Navbar.css';
import logoImg from '../../../assets/icons/logo.png';
import searchIcon from '../../../assets/icons/search-normal.png';
import bagIcon from '../../../assets/icons/bag.png';
import userIcon from '../../../assets/icons/user.png';

function Navbar() {
  return (
    <header className="header">
      <div className="container header-inner">

        <div className="logo">
          <img src={logoImg} alt="Logo" />
        </div>

        <nav className="navbar">
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Blog</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          </ul>
        </nav>

        <div className="nav-icons">
          <img src={searchIcon} alt="Search" />
          <img src={bagIcon} alt="Cart" />
          <img src={userIcon} alt="User" />
        </div>

      </div>
    </header>
  );
}

export default Navbar;
