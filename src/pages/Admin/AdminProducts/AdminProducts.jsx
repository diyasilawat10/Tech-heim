import React, { useEffect, useRef, useState } from 'react';
import './AdminProducts.css';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import AdminProductCard from '../../../components/Admin/AdminProductCard/AdminProductCard';
import AdminModal from '../../../components/Admin/AdminModal/AdminModal';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../../api/productApi';

const getEmptyFormData = () => ({
  name: '',
  description: '',
  price: '',
  stock: '',
  discount: '',
  image: '',
  category: ''
});

const getProductId = (product) => product?.id ?? product?._id ?? '';

const getProductImage = (product) => {
  if (!product) return '';

  if (typeof product.image === 'string') return product.image;
  if (Array.isArray(product.image)) return product.image[0] ?? '';
  if (Array.isArray(product.images)) {
    const firstImage = product.images[0];
    if (typeof firstImage === 'string') return firstImage;
    return firstImage?.url ?? firstImage?.secure_url ?? '';
  }
  if (typeof product.thumbnail === 'string') return product.thumbnail;

  return '';
};

const getCategoryId = (product) => {
  const category = product?.categoryId ?? product?.category;

  if (typeof category === 'string' || typeof category === 'number') {
    return String(category);
  }

  return category?._id ?? category?.id ?? '';
};

const normalizeProduct = (product) => ({
  ...product,
  id: getProductId(product),
  title: product?.title ?? product?.name ?? '',
  description: product?.description ?? '',
  price: product?.price ?? '',
  stock: product?.stock ?? '',
  discount: product?.discount ?? '',
  image: getProductImage(product),
  categoryId: getCategoryId(product)
});

const extractProducts = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data?.products)) return data.data.products;
  if (Array.isArray(data?.data?.items)) return data.data.items;

  return [];
};

const buildProductPayload = (formData, modalType) => {
  const trimmedCategory = formData.category.trim();
  const payload = {
    title: formData.name.trim(),
    description: formData.description.trim(),
    price: Number(formData.price),
    stock: Number(formData.stock),
    discount: formData.discount === '' ? 0 : Number(formData.discount),
    image: formData.image.trim()
  };

  if (modalType === 'add' && trimmedCategory) {
    payload.categoryId = /^\d+$/.test(trimmedCategory)
      ? Number(trimmedCategory)
      : trimmedCategory;
  }

  return payload;
};

const getAuthErrorMessage = (action) => `Admin login required to ${action} products.`;

const hasAuthToken = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return Boolean(localStorage.getItem('token'));
};

const getApiErrorMessage = (error, fallbackMessage) => (
  error?.code === 'ECONNABORTED'
    ? 'Product server took too long to respond. Try again in a moment.'
    : error?.message === 'Network Error'
      ? 'Product server is unreachable right now. Try again in a moment.'
      : error?.response?.status === 401 || error?.response?.status === 403
        ? 'Admin login required for this action.'
      : error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        fallbackMessage
);

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState(getEmptyFormData());
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pageError, setPageError] = useState('');
  const [modalError, setModalError] = useState('');
  const hasFetchedOnMount = useRef(false);
  const canMutateProducts = hasAuthToken();

  const fetchProducts = async () => {
    setIsLoading(true);
    setPageError('');

    try {
      const res = await getProducts();
      console.log(res.data);
      setProducts(extractProducts(res.data).map(normalizeProduct));
    } catch (err) {
      console.log(err);
      setProducts([]);
      setPageError(getApiErrorMessage(err, 'Failed to load products.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetchedOnMount.current) {
      return;
    }

    hasFetchedOnMount.current = true;
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    setCurrentProduct(null);
    setFormData(getEmptyFormData());
    setErrors({});
    setModalError(canMutateProducts ? '' : getAuthErrorMessage('add'));
    setModalType('add');
  };

  const handleOpenEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.title ?? product.name ?? '',
      description: product.description ?? '',
      price: product.price?.toString() ?? '',
      stock: product.stock?.toString() ?? '',
      discount: product.discount?.toString() ?? '',
      image: product.image ?? '',
      category: product.categoryId ?? product.category ?? ''
    });
    setErrors({});
    setModalError(canMutateProducts ? '' : getAuthErrorMessage('edit'));
    setModalType('edit');
  };

  const handleOpenDelete = (product) => {
    setCurrentProduct(product);
    setModalError(canMutateProducts ? '' : getAuthErrorMessage('delete'));
    setModalType('delete');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.price === '' || Number.isNaN(Number(formData.price))) {
      newErrors.price = 'Valid price is required';
    }
    if (formData.stock === '' || Number.isNaN(Number(formData.stock))) {
      newErrors.stock = 'Valid stock is required';
    }
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    if (!canMutateProducts) {
      setModalError(getAuthErrorMessage(modalType === 'add' ? 'add' : 'edit'));
      return;
    }

    setIsSaving(true);
    setModalError('');

    try {
      const payload = buildProductPayload(formData, modalType);

      if (modalType === 'add') {
        await createProduct(payload);
      } else {
        await updateProduct(getProductId(currentProduct), payload);
      }

      await fetchProducts();
      setModalType(null);
      setCurrentProduct(null);
      setFormData(getEmptyFormData());
    } catch (err) {
      console.log(err);
      setModalError(getApiErrorMessage(err, 'Failed to save product.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentProduct) return;
    if (!canMutateProducts) {
      setModalError(getAuthErrorMessage('delete'));
      return;
    }

    setIsDeleting(true);
    setModalError('');

    try {
      await deleteProduct(getProductId(currentProduct));
      await fetchProducts();
      setModalType(null);
      setCurrentProduct(null);
    } catch (err) {
      console.log(err);
      setModalError(getApiErrorMessage(err, 'Failed to delete product.'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <AdminLayout
        pageClassName="admin-products-page"
        profileName="Jimmy Smith"
      >
        <section className="admin-products-content products-section">
          <header className="section-header">
            <div className="section-heading">
              <h2 className="section-title">Products</h2>
              <p className="section-subtitle">Manage your store products</p>
            </div>
            <button className="add-product-btn" onClick={handleOpenAdd}>
              + Add Product
            </button>
          </header>
          
          {pageError && (
            <div className="products-status-block">
              <p className="products-feedback products-feedback-error">{pageError}</p>
              <button className="products-retry-btn" onClick={fetchProducts}>
                Retry
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="products-status-block">
              <p className="products-feedback">Loading products...</p>
              <p className="products-feedback">If the server is waking up, this can take a few seconds.</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <AdminProductCard 
                  key={product.id} 
                  product={product} 
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenDelete}
                />
              ))}
            </div>
          )}

          {!isLoading && !pageError && products.length === 0 && (
            <div className="products-empty-state">
              <h3 className="products-empty-title">No products</h3>
            </div>
          )}
        </section>
      </AdminLayout>

      {/* Add / Edit Modal */}
      {(modalType === 'add' || modalType === 'edit') && (
        <AdminModal
          isOpen={true}
          onClose={() => setModalType(null)}
          onSave={handleSave}
          saveDisabled={isSaving || !canMutateProducts}
          saveText={isSaving ? 'Saving...' : 'save'}
          title={modalType === 'add' ? 'Add New Product' : 'Edit Product'}
        >
          {modalError && <p className="products-modal-error">{modalError}</p>}
          <AdminModal.Input
            label="Product Name"
            value={formData.name}
            error={errors.name}
            onChange={(val) => handleInputChange('name', val)}
            placeholder="e.g. iPhone 15 Pro"
          />
          <AdminModal.Input
            label="Description"
            value={formData.description}
            error={errors.description}
            onChange={(val) => handleInputChange('description', val)}
            placeholder="Write a short product description"
          />
          <AdminModal.Input
            label="Price ($)"
            type="number"
            value={formData.price}
            error={errors.price}
            onChange={(val) => handleInputChange('price', val)}
            placeholder="0.00"
          />
          <AdminModal.Input
            label="Stock"
            type="number"
            value={formData.stock}
            error={errors.stock}
            onChange={(val) => handleInputChange('stock', val)}
            placeholder="0"
          />
          <AdminModal.Input
            label="Discount"
            type="number"
            value={formData.discount}
            error={errors.discount}
            onChange={(val) => handleInputChange('discount', val)}
            placeholder="0"
          />
          <AdminModal.Input
            label="Image URL"
            value={formData.image}
            error={errors.image}
            onChange={(val) => handleInputChange('image', val)}
            placeholder="https://example.com/image.jpg"
          />
          <AdminModal.FileUpload
            label="Or Upload Local Image"
            value={formData.image}
            error={errors.image}
            onChange={(val) => handleInputChange('image', val)}
          />
          {modalType === 'add' && (
            <AdminModal.Input
              label="Category ID"
              value={formData.category}
              error={errors.category}
              onChange={(val) => handleInputChange('category', val)}
              placeholder="e.g. 1"
            />
          )}
        </AdminModal>
      )}

      {/* Delete Confirmation Modal */}
      {modalType === 'delete' && (
        <AdminModal
          isOpen={true}
          onClose={() => setModalType(null)}
          onSave={handleDelete}
          title="Delete Product"
          saveText={isDeleting ? 'Deleting...' : 'Delete'}
          saveDisabled={isDeleting || !canMutateProducts}
          variant="delete"
        >
          {modalError && <p className="products-modal-error products-modal-error-delete">{modalError}</p>}
          <p style={{ 
            fontFamily: 'Inter', 
            fontSize: '16px', 
            color: '#717171', 
            margin: '0',
            textAlign: 'center',
            padding: '20px 24px'
          }}>
            Are you sure you want to delete <strong>{currentProduct?.title ?? currentProduct?.name}</strong>? This action cannot be undone.
          </p>
        </AdminModal>
      )}
    </>
  );
};

export default AdminProducts;
