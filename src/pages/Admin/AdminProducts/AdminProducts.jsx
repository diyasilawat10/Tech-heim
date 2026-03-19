import React, { useState } from 'react';
import './AdminProducts.css';
import AdminSidebar from '../../../components/Admin/AdminSidebar/AdminSidebar';
import AdminBreadcrumbs from '../../../components/Admin/AdminBreadcrumbs/AdminBreadcrumbs';
import AdminProductCard from '../../../components/Admin/AdminProductCard/AdminProductCard';
import AdminModal from '../../../components/Admin/AdminModal/AdminModal';
import { INITIAL_PRODUCTS } from '../../../constants/adminProductsData';

const AdminProducts = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: ''
  });
  const [errors, setErrors] = useState({});

  const handleOpenAdd = () => {
    setFormData({ name: '', price: '', image: '', category: '' });
    setErrors({});
    setModalType('add');
  };

  const handleOpenEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category
    });
    setErrors({});
    setModalType('edit');
  };

  const handleOpenDelete = (product) => {
    setCurrentProduct(product);
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
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid price is required';
    if (!formData.image) newErrors.image = 'Image URL is required';
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      id: modalType === 'add' ? Date.now() : currentProduct.id
    };

    if (modalType === 'add') {
      setProducts(prev => [productData, ...prev]);
    } else {
      setProducts(prev => prev.map(p => p.id === currentProduct.id ? productData : p));
    }
    setModalType(null);
  };

  const handleDelete = () => {
    setProducts(prev => prev.filter(p => p.id !== currentProduct.id));
    setModalType(null);
  };

  return (
    <div className="admin-products-page">
      <div className="admin-container">
        <AdminBreadcrumbs />
        
        <div className="admin-layout-wrapper">
          <AdminSidebar profileName="Jimmy smith" />
          
          <main className="admin-main-content">
            <header className="section-header">
              <div>
                <h2 className="section-title">Products</h2>
                <p className="section-subtitle">Manage your store products</p>
              </div>
              <button className="add-product-btn" onClick={handleOpenAdd}>
                + Add Product
              </button>
            </header>
            
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
          </main>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {(modalType === 'add' || modalType === 'edit') && (
        <AdminModal
          isOpen={true}
          onClose={() => setModalType(null)}
          onSave={handleSave}
          title={modalType === 'add' ? 'Add New Product' : 'Edit Product'}
        >
          <AdminModal.Input
            label="Product Name"
            value={formData.name}
            error={errors.name}
            onChange={(val) => handleInputChange('name', val)}
            placeholder="e.g. iPhone 15 Pro"
          />
          <AdminModal.Input
            label="Price ($)"
            value={formData.price}
            error={errors.price}
            onChange={(val) => handleInputChange('price', val)}
            placeholder="0.00"
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
          <AdminModal.Input
            label="Category"
            value={formData.category}
            error={errors.category}
            onChange={(val) => handleInputChange('category', val)}
            placeholder="e.g. Mobiles"
          />
        </AdminModal>
      )}

      {/* Delete Confirmation Modal */}
      {modalType === 'delete' && (
        <AdminModal
          isOpen={true}
          onClose={() => setModalType(null)}
          onSave={handleDelete}
          title="Delete Product"
          saveText="Delete"
          variant="delete"
        >
          <p style={{ 
            fontFamily: 'Inter', 
            fontSize: '16px', 
            color: '#717171', 
            margin: '0',
            textAlign: 'center',
            padding: '20px 24px'
          }}>
            Are you sure you want to delete <strong>{currentProduct?.name}</strong>? This action cannot be undone.
          </p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminProducts;
