import { useEffect, useState } from 'react';
import './Navbar.css';
import logoImg from '../../../assets/icons/logo.svg';
import searchIcon from '../../../assets/icons/search-normal.svg';
import bagIcon from '../../../assets/icons/basket.svg';
import userIcon from '../../../assets/icons/profile.svg';
import { navLinks } from '../../../constants/mockData';
import AuthModal from '../AuthModal/AuthModal';
import StatusModal from '../AuthModal/StatusModal';

// Modal states
const MODAL = { NONE: 'none', AUTH: 'auth', SUCCESS: 'success', ERROR: 'error' };

function Navbar() {
  const [modal, setModal] = useState(MODAL.NONE);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    setIsAuthenticated(true);
    setModal(MODAL.NONE);
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
    setModal(MODAL.SUCCESS);
  };

  const handleRegisterError = () => {
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

          <div className={`nav-icons ${isAuthenticated ? 'nav-icons--authenticated' : 'nav-icons--before-login'}`}>
            <button type="button" className="icon-btn" aria-label="Search">
              <img src={searchIcon} alt="" className="icon-search" />
            </button>
            <button type="button" className="icon-btn" aria-label="Cart">
              <img src={bagIcon} alt="" className="icon-basket" />
            </button>
            {isAuthenticated ? (
              <button
                type="button"
                className="icon-btn"
                aria-label="User profile"
              >
                <img src={userIcon} alt="" className="icon-user" />
              </button>
            ) : (
              <button
                type="button"
                className="auth-trigger-btn"
                onClick={() => setModal(MODAL.AUTH)}
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {modal === MODAL.AUTH && (
        <AuthModal
          onClose={() => setModal(MODAL.NONE)}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
          onRegisterError={handleRegisterError}
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

