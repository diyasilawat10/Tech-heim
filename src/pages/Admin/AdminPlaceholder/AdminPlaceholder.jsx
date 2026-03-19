import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import { getAdminMenuItem } from '../../../constants/adminNavigation';
import './AdminPlaceholder.css';

const AdminPlaceholder = () => {
  const location = useLocation();
  const currentItem = getAdminMenuItem(location.pathname);
  const isAdminRoute = location.pathname.startsWith('/admin');
  const sectionName = currentItem?.name || 'Admin Section';
  const sectionDescription = currentItem?.description || 'This section will be available here.';

  return (
    <AdminLayout
      pageClassName="admin-placeholder-page"
      profileName="Jimmy Smith"
      showSidebar={isAdminRoute}
    >
      {isAdminRoute ? (
        <section className="admin-placeholder-content admin-placeholder-section">
          <header className="admin-placeholder-header">
            <h2 className="admin-placeholder-title">{sectionName}</h2>
            <p className="admin-placeholder-subtitle">{sectionDescription}</p>
          </header>

          <section className="admin-placeholder-card">
            <p className="admin-placeholder-copy">
              Content for {sectionName} will appear here.
            </p>
          </section>
        </section>
      ) : (
        <section className="admin-placeholder-content admin-placeholder-card standalone">
          <h2 className="admin-placeholder-title">
            {currentItem?.name || 'Logout'}
          </h2>
          <p className="admin-placeholder-subtitle">
            {sectionDescription}
          </p>
        </section>
      )}
    </AdminLayout>
  );
};

export default AdminPlaceholder;
