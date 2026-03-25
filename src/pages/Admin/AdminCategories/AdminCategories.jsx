import React, { useEffect, useState, useCallback } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import AdminModal from '../../../components/Admin/AdminModal/AdminModal';
import { getCategories, createCategory as apiCreate, deleteCategory as apiDelete } from '../../../api/categoriesApi';
import './AdminCategories.css';

/* ── Sub-Components ── */

const CategoryCard = ({ category, onDelete }) => (
  <div className="admin-category-card">
    <div className="category-info">
      <h3 className="category-name">
        <span style={{ color: '#0c68f4', marginRight: '8px' }}>#{category?.id}</span>
        {category?.name}
      </h3>
      <p className="category-products-count">
        {category?.products?.length || 0} Products
      </p>
    </div>
    <div className="category-actions">
      <button
        className="category-action-btn delete-btn"
        onClick={() => onDelete(category?.id)}
        aria-label={`Delete ${category?.name}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.85 9.14L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.33 16.5H13.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 12.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  </div>
);

const CategoryModal = ({ isOpen, onClose, onSubmit, categories }) => {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setErrorText('');
    }
  }, [isOpen]);

  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed) return setErrorText('Category name is required');
    if (categories.some(c => c.name?.toLowerCase() === trimmed.toLowerCase())) {
      return setErrorText('This category name already exists');
    }

    setSubmitting(true);
    try {
      await onSubmit({ name: trimmed });
      onClose();
    } catch (err) {
      setErrorText(err.message || 'Failed to create category');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      title="Create Category"
      saveText={submitting ? 'Creating...' : 'Create'}
      saveDisabled={submitting}
      className="category-modal-compact"
    >
      <AdminModal.Input
        label="Category Name"
        value={name}
        onChange={(v) => { setName(v); setErrorText(''); }}
        placeholder="e.g. Laptops, Smartphones"
        error={!!errorText}
        supportingText={errorText || 'Enter a unique category name.'}
      />
    </AdminModal>
  );
};

const DeleteCategoryModal = ({ categoryId, isOpen, onClose, onConfirm }) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setDeleting(true);
    setError('');
    try {
      await onConfirm(categoryId);
      onClose();
    } catch (err) {
       // Check if it's likely a constraint error (Category has products)
       const msg = err.message || '';
       if (msg.includes('500') || msg.toLowerCase().includes('internal server error')) {
         setError('Cannot delete category: It might have products linked to it. Delete or move those products first.');
       } else {
         setError(msg || 'Failed to delete category');
       }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleConfirm}
      title="Delete Category"
      variant="delete"
      saveText={deleting ? 'Deleting...' : 'Delete'}
      saveDisabled={deleting}
    >
      <div style={{ padding: '0 16px', color: '#717171' }}>
        <p>Are you sure you want to delete this category? This action cannot be undone.</p>
        {error && <p style={{ marginTop: '1rem', color: '#ff4d4f', fontWeight: '500' }}>{error}</p>}
      </div>
    </AdminModal>
  );
};

/* ── Main Component ── */

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getCategories();
      setCategories(res.data || []);
    } catch (err) {
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const handleCreate = async (data) => {
    try {
      await apiCreate(data);
      await fetchCategories();
    } catch (err) {
      throw new Error(err?.response?.data?.message || 'Failed to create category');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiDelete(id);
      await fetchCategories();
    } catch (err) {
      throw err; // Caught by DeleteModal
    }
  };

  return (
    <AdminLayout
      pageClassName="admin-categories-page"
      profileName={JSON.parse(localStorage.getItem('user') || '{}').name}
    >
      <section className="admin-categories-content-wrapper">
        <header className="categories-section-header">
          <div className="title-block">
            <h2 className="categories-title">Categories</h2>
            <p className="categories-subtitle">Manage product categories</p>
          </div>
          <button className="admin-btn-primary add-category-btn" onClick={() => setIsModalOpen(true)}>
            + Add Category
          </button>
        </header>

        {error && <div className="admin-error-banner">{error}</div>}

        <div className="admin-categories-list-container">
          {loading ? (
            <div className="admin-loading-state">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="admin-empty-state">
              <p className="empty-primary">No categories found</p>
              <p className="empty-secondary">Click "+ Add Category" to get started.</p>
            </div>
          ) : (
            <div className="admin-categories-grid">
              {categories.map(cat => (
                <CategoryCard key={cat.id} category={cat} onDelete={setDeleteId} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        categories={categories}
      />

      <DeleteCategoryModal
        categoryId={deleteId}
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </AdminLayout>
  );
};

export default AdminCategories;
