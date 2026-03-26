import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../../../assets/icons/logo.svg';
import userIcon from '../../../assets/icons/profile.svg';
import { navLinks } from '../../../constants/mockData';
import AuthModal from '../AuthModal/AuthModal';
import StatusModal from '../AuthModal/StatusModal';

// Modal states
const MODAL = { NONE: 'none', AUTH: 'auth', SUCCESS: 'success', ERROR: 'error' };

function Navbar() {
  const [modal, setModal] = useState(MODAL.NONE);
  const [registerError, setRegisterError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

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

  const handleRegisterError = (msg) => {
    setRegisterError(msg || '');
    setModal(MODAL.ERROR);
  };

  return (
    <>
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

          <div className={`nav-icons ${isAuthenticated ? 'nav-icons--authenticated' : 'nav-icons--before-login'}`}>
            {isAuthenticated ? (
              <Link to="/admin" className="icon-btn" aria-label="User profile">
                <img src={userIcon} alt="" className="icon-user" />
              </Link>
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

        <div className="header-mobile">
          <div className="header-mobile-top">
            <button type="button" className="mobile-menu-btn" aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>

            <div className="mobile-logo-text">Tech Heim</div>

            <div className="mobile-icons">
              {isAuthenticated ? (
                <Link to="/admin" className="icon-btn mobile-icon-btn" aria-label="User profile">
                  <img src={userIcon} alt="" className="icon-user" />
                </Link>
              ) : (
                <button
                  type="button"
                  className="icon-btn mobile-icon-btn"
                  aria-label="Login / Register"
                  onClick={() => setModal(MODAL.AUTH)}
                >
                  <img src={userIcon} alt="" className="icon-user" />
                </button>
              )}
            </div>
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
          message={registerError}
          onClose={() => setModal(MODAL.NONE)}
        />
      )}
    </>
  );
}

export default Navbar;
