import React from 'react';
import AdminBreadcrumbs from '../../../components/Admin/AdminBreadcrumbs/AdminBreadcrumbs';
import AdminSidebar from '../../../components/Admin/AdminSidebar/AdminSidebar';
import AdminModal from '../../../components/Admin/AdminModal/AdminModal';
import { getAdminIcon } from '../../../constants/adminIcons';
import { fieldGroup1, fieldGroup2 } from '../../../constants/adminFields';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [focusedField, setFocusedField] = React.useState(null);
  const [errorFields, setErrorFields] = React.useState({});
  const [fieldData, setFieldData] = React.useState({
    'full-name': 'Jimmy Smith',
    'phone-number': '+12345678910',
    'address': 'HubSpot, 25 First Street, Cambridge...',
    'email': 'Jimmy.smith1996@gmail.com',
    'password': '*********',
    'postal-code': '',
  });
  const [modalConfig, setModalConfig] = React.useState({
    isOpen: false,
    title: '',
    fields: [], // { id, label, value }
  });

  const getFirstName = () => fieldData['full-name'].split(' ')[0] || '';
  const getLastName = () => fieldData['full-name'].split(' ').slice(1).join(' ') || '';



  const handleEdit = (id) => {
    if (id === 'full-name') {
      setModalConfig({
        isOpen: true,
        title: 'First name and Last name',
        fields: [
          { id: 'first', label: 'first name', value: getFirstName() },
          { id: 'last', label: 'last name', value: getLastName() }
        ]
      });
    } else {
      const field = [...fieldGroup1, ...fieldGroup2].find(f => f.id === id);
      setModalConfig({
        isOpen: true,
        title: field ? field.label : 'Edit Field',
        fields: [{ 
          id, 
          label: (field ? field.label : id).toLowerCase(), 
          value: fieldData[id],
          type: field?.type || 'text',
          error: false,
          supportingText: ''
        }]
      });
    }
  };

  const handleModalInputChange = (id, value) => {
    setModalConfig(prev => ({
      ...prev,
      fields: prev.fields.map(f => f.id === id ? { ...f, value, error: false, supportingText: '' } : f)
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleModalSave = () => {
    const updates = {};
    let hasError = false;
    const newFields = [...modalConfig.fields];

    const emailField = newFields.find(f => f.id === 'email');
    if (emailField && !validateEmail(emailField.value)) {
      emailField.error = true;
      emailField.supportingText = 'invalid e-mail address';
      hasError = true;
    }

    if (hasError) {
      setModalConfig(prev => ({ ...prev, fields: newFields }));
      return;
    }

    const isNameModal = modalConfig.fields.some(f => f.id === 'first' || f.id === 'last');

    if (isNameModal) {
      const first = modalConfig.fields.find(f => f.id === 'first')?.value || '';
      const last = modalConfig.fields.find(f => f.id === 'last')?.value || '';
      updates['full-name'] = `${first} ${last}`.trim();
    } else {
      modalConfig.fields.forEach(f => {
        updates[f.id] = f.value;
      });
    }

    setFieldData(prev => ({ ...prev, ...updates }));
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const renderField = (field) => {
    const value = fieldData[field.id];
    const isError = errorFields[field.id];
    const isFilled = !!value;
    const displayText = field.type === 'password' ? '*'.repeat(8) : (value || field.placeholder);

    return (
      <div
        key={field.id}
        className={`account-input-group ${focusedField === field.id ? 'focused' : ''} ${isError ? 'error' : ''} ${isFilled ? 'filled' : ''}`}
      >
        <div className="label-container">
          <span className="label-segment segment-left"></span>
          <label className="input-label" htmlFor={`input-${field.id}`}>
            {field.label}
          </label>
          <span className="label-segment segment-fill"></span>
        </div>

        <div className="account-input-container">
          <div className="shadow"></div>
          <div className="input-left">
            <span className="input-icon">{getAdminIcon(field.icon)}</span>
            <span className="field-display-text">{displayText}</span>
          </div>
          <div className="input-right">
            <button
              className="edit-btn"
              onClick={() => handleEdit(field.id)}
              aria-label={`Edit ${field.label}`}
            >
              {getAdminIcon('edit')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <AdminBreadcrumbs />

        <div className="admin-layout-wrapper">
          <AdminSidebar profileName={fieldData['full-name']} />

          <main className="admin-main-content">
            <section className="identification-section">
              <header className="section-header">
                <h2 className="section-title">Identification</h2>
                <p className="section-subtitle">Verify your identity</p>
              </header>

              <div className="identification-content-wrapper">
                <div className="identification-frame frame-1">
                  {fieldGroup1.map(renderField)}
                </div>

                <div className="identification-frame frame-2">
                  {fieldGroup2.map(renderField)}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <AdminModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        onSave={handleModalSave}
        title={modalConfig.title}
      >
        {modalConfig.fields.map((field) => (
          <AdminModal.Input
            key={field.id}
            label={field.label}
            value={field.value}
            type={field.type}
            error={field.error}
            supportingText={field.supportingText}
            onChange={(val) => handleModalInputChange(field.id, val)}
          />
        ))}
      </AdminModal>
    </div>
  );
};

export default AdminDashboard;
