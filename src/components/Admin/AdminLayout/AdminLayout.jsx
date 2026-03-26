import React from 'react';
import AdminBreadcrumbs from '../AdminBreadcrumbs/AdminBreadcrumbs';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { useCurrentUser } from '../../../context/CurrentUserContext';
import './AdminLayout.css';

const AdminLayout = ({
  children,
  pageClassName = '',
  profileName = 'Jimmy Smith',
  showSidebar = true
}) => {
  const { currentUser } = useCurrentUser();
  const rootClassName = ['admin-layout-page', pageClassName].filter(Boolean).join(' ');
  const mainClassName = ['admin-layout-main', showSidebar ? '' : 'admin-layout-main--standalone']
    .filter(Boolean)
    .join(' ');
  const resolvedProfileName = profileName || currentUser?.name || 'Jimmy Smith';

  return (
    <div className={rootClassName}>
      <div className="admin-layout-container">
        <AdminBreadcrumbs />

        {showSidebar ? (
          <div className="admin-layout-shell">
            <AdminSidebar profileName={resolvedProfileName} />
            <main className={mainClassName}>{children}</main>
          </div>
        ) : (
          <main className={mainClassName}>{children}</main>
        )}
      </div>
    </div>
  );
};

export default AdminLayout;
