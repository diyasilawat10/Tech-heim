import React, { useEffect, useState } from 'react';
import './AdminProducts.css';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import AdminProductCard from '../../../components/Admin/AdminProductCard/AdminProductCard';
import AdminModal from '../../../components/Admin/AdminModal/AdminModal';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../../api/productApi';

const emptyForm = () => ({
  name: '',
  description: '',
  price: '',
  stock: '',
  discount: '',
  image: '',
  category: ''
});

const getId = (p) => p?.id ?? p?._id ?? '';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete'
  const [current, setCurrent] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [pageError, setPageError] = useState('');
  const [modalError, setModalError] = useState('');

  /* ── Fetch products ── */
  const fetchProducts = async () => {
    setLoading(true);
    setPageError('');
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setPageError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  /* ── Open modals ── */
  const openAdd = () => {
    setCurrent(null);
    setForm(emptyForm());
    setErrors({});
    setModalError('');
    setModalType('add');
  };

  const openEdit = (product) => {
    setCurrent(product);
    setForm({
      name: product.title ?? product.name ?? '',
      description: product.description ?? '',
      price: String(product.price ?? ''),
      stock: String(product.stock ?? ''),
      discount: String(product.discount ?? ''),
      image: product.image ?? '',
      category: String(product.categoryId ?? product.category ?? '')
    });
    setErrors({});
    setModalError('');
    setModalType('edit');
  };

  const openDelete = (product) => {
    setCurrent(product);
    setModalError('');
    setModalType('delete');
  };

  const closeModal = () => setModalType(null);

  /* ── Form helpers ── */
  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (form.price === '' || isNaN(Number(form.price))) e.price = 'Valid price is required';
    if (form.stock === '' || isNaN(Number(form.stock))) e.stock = 'Valid stock is required';
    if (!form.image.trim()) e.image = 'Image URL is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Save (add / edit) ── */
  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setModalError('');

    const payload = {
      title: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      discount: form.discount === '' ? 0 : Number(form.discount),
      image: form.image.trim()
    };

    if (modalType === 'add' && form.category.trim()) {
      const cat = form.category.trim();
      payload.categoryId = /^\d+$/.test(cat) ? Number(cat) : cat;
    }

    try {
      if (modalType === 'add') {
        await createProduct(payload);
      } else {
        await updateProduct(getId(current), payload);
      }
      await fetchProducts();
      closeModal();
    } catch (err) {
      setModalError(err.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete ── */
  const handleDelete = async () => {
    if (!current) return;
    setDeleting(true);
    setModalError('');
    try {
      await deleteProduct(getId(current));
      await fetchProducts();
      closeModal();
    } catch (err) {
      setModalError(err.message || 'Failed to delete product.');
    } finally {
      setDeleting(false);
    }
  };

  /* ── Render ── */
  return (
    <>
      <AdminLayout pageClassName="admin-products-page" profileName="Jimmy Smith">
        <section className="admin-products-content products-section">
          <header className="section-header">
            <div className="section-heading">
              <h2 className="section-title">Products</h2>
              <p className="section-subtitle">Manage your store products</p>
            </div>
            <div className="section-header-actions">
              <button className="add-product-btn" onClick={openAdd}>+ Add Product</button>
            </div>
          </header>

          {/* Error state */}
          {pageError && (
            <div className="products-status-block">
              <p className="products-feedback products-feedback-error">{pageError}</p>
              <button className="products-retry-btn" onClick={fetchProducts}>Retry</button>
            </div>
          )}

          {/* Loading state */}
          {loading && !pageError && (
            <div className="products-status-block">
              <p className="products-feedback">Loading products…</p>
            </div>
          )}

          {/* Product grid */}
          {!loading && !pageError && products.length > 0 && (
            <div className="products-grid">
              {products.map((p) => (
                <AdminProductCard key={getId(p)} product={p} onEdit={openEdit} onDelete={openDelete} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !pageError && products.length === 0 && (
            <div className="products-empty-state">
              <h3 className="products-empty-title">No products yet</h3>
              <p className="products-empty-subtitle">Click "+ Add Product" to get started.</p>
            </div>
          )}
        </section>
      </AdminLayout>

      {/* Add / Edit Modal */}
      {(modalType === 'add' || modalType === 'edit') && (
        <AdminModal
          isOpen
          onClose={closeModal}
          onSave={handleSave}
          saveDisabled={saving}
          saveText={saving ? 'Saving…' : 'Save'}
          title={modalType === 'add' ? 'Add New Product' : 'Edit Product'}
        >
          {modalError && <p className="products-modal-error">{modalError}</p>}
          <AdminModal.Input label="Product Name" value={form.name} error={errors.name} onChange={(v) => onChange('name', v)} placeholder="e.g. iPhone 15 Pro" />
          <AdminModal.Input label="Description" value={form.description} error={errors.description} onChange={(v) => onChange('description', v)} placeholder="Write a short product description" />
          <AdminModal.Input label="Price ($)" type="number" value={form.price} error={errors.price} onChange={(v) => onChange('price', v)} placeholder="0.00" />
          <AdminModal.Input label="Stock" type="number" value={form.stock} error={errors.stock} onChange={(v) => onChange('stock', v)} placeholder="0" />
          <AdminModal.Input label="Discount" type="number" value={form.discount} error={errors.discount} onChange={(v) => onChange('discount', v)} placeholder="0" />
          <AdminModal.Input label="Image URL" value={form.image} error={errors.image} onChange={(v) => onChange('image', v)} placeholder="https://example.com/image.jpg" />
          {modalType === 'add' && (
            <AdminModal.Input label="Category ID" value={form.category} error={errors.category} onChange={(v) => onChange('category', v)} placeholder="e.g. 1" />
          )}
        </AdminModal>
      )}

      {/* Delete Modal */}
      {modalType === 'delete' && (
        <AdminModal
          isOpen
          onClose={closeModal}
          onSave={handleDelete}
          title="Delete Product"
          saveText={deleting ? 'Deleting…' : 'Delete'}
          saveDisabled={deleting}
          variant="delete"
        >
          {modalError && <p className="products-modal-error products-modal-error-delete">{modalError}</p>}
          <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: '24px', color: '#717171', margin: 0, textAlign: 'center', padding: '0 8px' }}>
            Are you sure you want to delete <strong>{current?.title ?? current?.name}</strong>? This action cannot be undone.
          </p>
        </AdminModal>
      )}
    </>
  );
};

export default AdminProducts;
