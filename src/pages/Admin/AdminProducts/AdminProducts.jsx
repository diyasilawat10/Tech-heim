import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './AdminProducts.css';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import AdminProductCard from '../../../components/Admin/AdminProductCard/AdminProductCard';
import AdminModal from '../../../components/Admin/AdminModal/AdminModal';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../../api/productApi';
import { getCategories } from '../../../api/categoriesApi';

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOrderMode = searchParams.get('mode') === 'select-for-order';
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete'
  const [current, setCurrent] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [pageError, setPageError] = useState('');
  const [modalError, setModalError] = useState('');
  
  const [draftOrder, setDraftOrder] = useState(null);

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

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => { 
    fetchProducts(); 
    fetchCategories();
    
    if (isOrderMode) {
      const saved = localStorage.getItem('techheim_draft_order');
      if (saved) setDraftOrder(JSON.parse(saved));
    }
  }, [isOrderMode]);

  /* ── Order Selection Mode Logic ── */
  const handleAddToOrder = (product) => {
    if (!draftOrder) return;
    const productId = getId(product);
    const existingIndex = draftOrder.items.findIndex(it => String(it.id) === String(productId));
    
    let newItems = [...draftOrder.items];
    if (existingIndex > -1) {
      // Remove if already added (toggle behavior)
      newItems.splice(existingIndex, 1);
    } else {
      newItems.push({
        id: productId,
        name: product.title || product.name,
        price: product.price,
        quantity: 1
      });
    }
    
    const newDraft = { ...draftOrder, items: newItems };
    setDraftOrder(newDraft);
    localStorage.setItem('techheim_draft_order', JSON.stringify(newDraft));
  };

  const handleAdjustOrderQuantity = (product, delta) => {
    if (!draftOrder) return;
    const productId = getId(product);
    const existingItem = draftOrder.items.find((item) => String(item.id) === String(productId));

    if (!existingItem) {
      if (delta > 0) handleAddToOrder(product);
      return;
    }

    const nextQuantity = (Number(existingItem.quantity) || 1) + delta;
    const nextItems =
      nextQuantity <= 0
        ? draftOrder.items.filter((item) => String(item.id) !== String(productId))
        : draftOrder.items.map((item) =>
            String(item.id) === String(productId) ? { ...item, quantity: nextQuantity } : item
          );

    const newDraft = { ...draftOrder, items: nextItems };
    setDraftOrder(newDraft);
    localStorage.setItem('techheim_draft_order', JSON.stringify(newDraft));
  };

  const cancelSelection = () => {
    localStorage.removeItem('techheim_draft_order');
    navigate('/admin/orders');
  };

  const finishSelection = () => {
    navigate('/admin/orders?action=finalize');
  };

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
      category: String(product.category?.id ?? product.categoryId ?? product.category ?? '')
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
    const trimmedName = form.name.trim();

    if (!trimmedName) {
      e.name = 'Product name is required';
    } else {
      const exists = products.find(
        (p) =>
          (p.title?.toLowerCase() === trimmedName.toLowerCase() ||
           p.name?.toLowerCase() === trimmedName.toLowerCase()) &&
          getId(p) !== getId(current)
      );
      if (exists) e.name = 'This product name already exists';
    }

    if (!form.description.trim()) e.description = 'Description is required';

    const priceNum = Number(form.price);
    if (form.price === '' || isNaN(priceNum) || priceNum <= 0) {
      e.price = 'Price must be greater than 0';
    }

    const stockNum = Number(form.stock);
    if (form.stock === '' || isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
      e.stock = 'Stock must be a whole number (0 or higher)';
    }

    if (form.discount !== '') {
      const discountNum = Number(form.discount);
      if (isNaN(discountNum) || discountNum < 0 || discountNum > 100) {
        e.discount = 'Discount must be between 0 and 100';
      }
    }

    if (!form.image.trim()) {
      e.image = 'Image URL is required';
    } else if (!form.image.startsWith('http') && !form.image.startsWith('/')) {
      e.image = 'Use a full URL (http/https) or /root-path';
    }

    if (modalType === 'add' && !form.category) {
      e.category = 'Please select a category';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Save ── */
  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setModalError('');

    const payload = {
      title: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      stock: parseInt(form.stock, 10),
      image: form.image.trim(),
      discount: form.discount === '' ? 0 : Number(form.discount),
      categoryId: parseInt(form.category, 10),
    };

    if (modalType === 'edit') delete payload.categoryId;

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

  return (
    <>
      <AdminLayout 
        pageClassName="admin-products-page"
      >
        <section className={`admin-products-content products-section ${isOrderMode ? 'selection-mode-active' : ''}`}>
          <header className="section-header">
            <div className="section-heading">
              <h2 className="section-title">
                {isOrderMode ? 'Select Products for Order' : 'Products'}
              </h2>
              <p className="section-subtitle">
                {isOrderMode ? `Choosing items for ${draftOrder?.user?.name || draftOrder?.user?.fullName}` : 'Manage your store products'}
              </p>
            </div>
            {!isOrderMode && (
              <div className="section-header-actions">
                <button className="add-product-btn" onClick={openAdd}>+ Add Product</button>
              </div>
            )}
          </header>

          {pageError && (
            <div className="products-status-block">
              <p className="products-feedback products-feedback-error">{pageError}</p>
              <button className="products-retry-btn" onClick={fetchProducts}>Retry</button>
            </div>
          )}

          {loading && !pageError && (
            <div className="products-status-block">
              <p className="products-feedback">Loading products…</p>
            </div>
          )}

          {!loading && !pageError && products.length > 0 && (
            <div className="products-grid" style={{ paddingBottom: isOrderMode ? '100px' : '0' }}>
              {products.map((p) => {
                const isAdded = draftOrder?.items?.some(it => String(it.id) === String(getId(p)));
                const orderQuantity = draftOrder?.items?.find(it => String(it.id) === String(getId(p)))?.quantity ?? 0;
                return (
                  <AdminProductCard 
                    key={getId(p)} 
                    product={p} 
                    onEdit={openEdit} 
                    onDelete={openDelete} 
                    isOrderMode={isOrderMode}
                    onAddToOrder={handleAddToOrder}
                    onAdjustOrderQuantity={handleAdjustOrderQuantity}
                    isAdded={isAdded}
                    orderQuantity={orderQuantity}
                  />
                );
              })}
            </div>
          )}

          {!loading && !pageError && products.length === 0 && (
            <div className="products-empty-state">
              <h3 className="products-empty-title">No products yet</h3>
              <p className="products-empty-subtitle">Click "+ Add Product" to get started.</p>
            </div>
          )}
        </section>
      </AdminLayout>

      {/* Floating Selection Bar */}
      {isOrderMode && draftOrder && (
        <div className="order-selection-bar">
          <div className="selection-bar-content">
            <div className="selection-info">
              <p className="selection-user">Creating order for <strong>{draftOrder.user.name || draftOrder.user.fullName}</strong></p>
              <p className="selection-count">{draftOrder.items.length} product(s) selected</p>
            </div>
            <div className="selection-actions">
              <button className="cancel-selection-btn" onClick={cancelSelection}>Cancel</button>
              <button 
                className="finish-selection-btn" 
                onClick={finishSelection}
                disabled={draftOrder.items.length === 0}
              >
                Finish Selection & Review →
              </button>
            </div>
          </div>
        </div>
      )}

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
          
          <AdminModal.FileUpload 
            label="Product Image" 
            value={form.image} 
            error={errors.image} 
            onChange={(v) => onChange('image', v)} 
          />
          
          <AdminModal.Select
            label="Category"
            value={form.category}
            options={categories.map(c => ({ id: c.id, name: c.name }))}
            error={errors.category}
            onChange={(v) => onChange('category', v)}
            supportingText="Select the category this product belongs to."
          />
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
