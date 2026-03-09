import { useState, useEffect } from 'react';
import './Navbar.css';
import logoImg from '../../../assets/icons/logo.svg';
import searchIcon from '../../../assets/icons/search-normal.svg';
import bagIcon from '../../../assets/icons/basket.svg';
import userIcon from '../../../assets/icons/profile.svg';
import { navLinks } from '../../../constants/mockData';
import AuthModal from '../AuthModal/AuthModal';
import StatusModal from '../AuthModal/StatusModal';

// Modal states
const MODAL = { NONE: 'none', LOGIN: 'login', SUCCESS: 'success', ERROR: 'error' };

function Navbar() {
  const [modal, setModal] = useState(MODAL.NONE);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setModal(MODAL.NONE);
    };
    if (modal !== MODAL.NONE) {
      document.addEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [modal]);

  const handleLoginSuccess = () => {
    setModal(MODAL.SUCCESS);
  };

  const handleLoginError = () => {
    setModal(MODAL.ERROR);
  };

  return (
    <>
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
            <button
              type="button"
              className="icon-btn"
              aria-label="User profile"
              onClick={() => setModal(MODAL.LOGIN)}
            >
              <img src={userIcon} alt="" className="icon-user" />
            </button>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {modal === MODAL.LOGIN && (
        <AuthModal
          onClose={() => setModal(MODAL.NONE)}
          onLoginSuccess={handleLoginSuccess}
          onLoginError={handleLoginError}
        />
      )}

      {/* Success Modal */}
      {modal === MODAL.SUCCESS && (
        <StatusModal
          type="success"
          onClose={() => setModal(MODAL.NONE)}
        />
      )}

      {/* Error Modal (for future use) */}
      {modal === MODAL.ERROR && (
        <StatusModal
          type="error"
          onClose={() => setModal(MODAL.NONE)}
        />
      )}
    </>
  );
}

export default Navbar;

