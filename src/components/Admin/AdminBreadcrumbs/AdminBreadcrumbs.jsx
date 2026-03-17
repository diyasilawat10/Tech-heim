import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminBreadcrumbs.css';

const AdminBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <nav className="admin-breadcrumbs">
      <Link to="/" className="breadcrumb-item">Home</Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        
        // Map 'admin' to 'Account' to match screenshot
        const displayValue = value === 'admin' ? 'Account' : capitalize(value.replace(/-/g, ' '));
        
        return (
          <React.Fragment key={to}>
            <span className="breadcrumb-separator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.07996" stroke="#717171" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {last ? (
              <span className="breadcrumb-item active">{displayValue}</span>
            ) : (
              <Link to={to} className="breadcrumb-item">{displayValue}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default AdminBreadcrumbs;
