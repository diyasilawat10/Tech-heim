import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAdminMenuItem } from '../../../constants/adminNavigation';
import './AdminBreadcrumbs.css';

const AdminBreadcrumbs = () => {
  const location = useLocation();
  const currentItem = getAdminMenuItem(location.pathname);

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const fallbackItems = location.pathname
    .split('/')
    .filter((segment) => segment)
    .map((segment, index, pathnames) => ({
      label: segment === 'admin' ? 'Account' : capitalize(segment.replace(/-/g, ' ')),
      to: `/${pathnames.slice(0, index + 1).join('/')}`,
      isActive: index === pathnames.length - 1
    }));

  let breadcrumbItems = [{ label: 'Home', to: '/' }];

  if (currentItem) {
    if (location.pathname === '/logout') {
      breadcrumbItems.push({ label: currentItem.name, isActive: true });
    } else if (location.pathname === '/admin') {
      breadcrumbItems.push({ label: 'Account' });
      breadcrumbItems.push({ label: currentItem.name, isActive: true });
    } else {
      breadcrumbItems.push({ label: 'Account', to: '/admin' });
      breadcrumbItems.push({ label: currentItem.name, isActive: true });
    }
  } else {
    breadcrumbItems = [
      { label: 'Home', to: '/' },
      ...fallbackItems
    ];
  }

  return (
    <nav className="admin-breadcrumbs">
      {breadcrumbItems.map((item, index) => {
        return (
          <React.Fragment key={`${item.label}-${item.to || index}`}>
            {index > 0 ? (
              <span className="breadcrumb-separator">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.07996" stroke="#717171" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            ) : null}
            {item.isActive ? (
              <span className="breadcrumb-item active">{item.label}</span>
            ) : item.to ? (
              <Link to={item.to} className="breadcrumb-item">{item.label}</Link>
            ) : (
              <span className="breadcrumb-item">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default AdminBreadcrumbs;
