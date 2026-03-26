import React, { useEffect, useState } from 'react';
import './AdminUsers.css';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import AdminUserCard from '../../../components/Admin/AdminUserCard/AdminUserCard';
import AdminModal from '../../../components/Admin/AdminModal/AdminModal';
import { getUsers, updateUser, deleteUser } from '../../../api/usersApi';

const emptyForm = () => ({
  name: '',
  email: '',
  phone: '',
  address: '',
  role: 'user',
});

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [modalType, setModalType] = useState(null); // 'edit' | 'delete'
  const [current, setCurrent] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [pageError, setPageError] = useState('');
  const [modalError, setModalError] = useState('');

  /* ── Fetch users ── */
  const fetchUsers = async () => {
    setLoading(true);
    setPageError('');
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setPageError(err.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  /* ── Open modals ── */
  const openEdit = (user) => {
    setCurrent(user);
    setForm({
      name: user.name ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
      address: user.address ?? '',
      role: user.role ?? 'user',
    });
    setErrors({});
    setModalError('');
    setModalType('edit');
  };

  const openDelete = (user) => {
    setCurrent(user);
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
    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Enter a valid email address';
    }
    if (!form.role) e.role = 'Role is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Save (edit only) ── */
  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setModalError('');

    // Build payload — no password field
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      address: form.address.trim() || null,
      role: form.role,
    };

    try {
      await updateUser(current.id, payload);
      await fetchUsers();
      closeModal();
    } catch (err) {
      setModalError(err.message || 'Failed to update user. The API may have returned an error.');
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
      await deleteUser(current.id);
      await fetchUsers();
      closeModal();
    } catch (err) {
      setModalError(err.message || 'Failed to delete user.');
    } finally {
      setDeleting(false);
    }
  };

  /* ── Render ── */
  return (
    <>
      <AdminLayout
        pageClassName="admin-users-page"
      >
        <section className="admin-users-content">
          <header className="section-header">
            <div className="section-heading">
              <h2 className="section-title">Users</h2>
              <p className="section-subtitle">Manage your store users</p>
            </div>
          </header>

          {/* Error state */}
          {pageError && (
            <div className="users-status-block">
              <p className="users-feedback users-feedback-error">{pageError}</p>
              <button className="users-retry-btn" onClick={fetchUsers}>Retry</button>
            </div>
          )}

          {/* Loading state */}
          {loading && !pageError && (
            <div className="users-status-block">
              <p className="users-feedback">Loading users…</p>
            </div>
          )}

          {/* Users grid */}
          {!loading && !pageError && users.length > 0 && (
            <div className="users-grid">
              {users.map((u) => (
                <AdminUserCard
                  key={u.id}
                  user={u}
                  onEdit={openEdit}
                  onDelete={openDelete}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !pageError && users.length === 0 && (
            <div className="users-empty-state">
              <h3 className="users-empty-title">No users found</h3>
              <p className="users-empty-subtitle">There are no registered users yet.</p>
            </div>
          )}
        </section>
      </AdminLayout>

      {/* Edit Modal */}
      {modalType === 'edit' && (
        <AdminModal
          isOpen
          onClose={closeModal}
          onSave={handleSave}
          saveDisabled={saving}
          saveText={saving ? 'Saving…' : 'Save'}
          title="Edit User"
        >
          {modalError && <p className="users-modal-error">{modalError}</p>}
          <AdminModal.Input
            label="Name"
            value={form.name}
            error={errors.name}
            onChange={(v) => onChange('name', v)}
            placeholder="e.g. John Doe"
          />
          <AdminModal.Input
            label="Email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={(v) => onChange('email', v)}
            placeholder="e.g. john@example.com"
          />
          <AdminModal.Input
            label="Phone"
            value={form.phone}
            onChange={(v) => onChange('phone', v)}
            placeholder="e.g. +1 555 000 0000"
          />
          <AdminModal.Input
            label="Address"
            value={form.address}
            onChange={(v) => onChange('address', v)}
            placeholder="e.g. 123 Main St, City"
          />
          {/* Role dropdown — exactly "user" and "admin" */}
          <AdminModal.Select
            label="Role"
            value={form.role}
            error={errors.role}
            onChange={(v) => onChange('role', v)}
            options={[
              { id: 'user', name: 'User' },
              { id: 'admin', name: 'Admin' },
            ]}
          />
        </AdminModal>
      )}

      {/* Delete Modal */}
      {modalType === 'delete' && (
        <AdminModal
          isOpen
          onClose={closeModal}
          onSave={handleDelete}
          title="Delete User"
          saveText={deleting ? 'Deleting…' : 'Delete'}
          saveDisabled={deleting}
          variant="delete"
        >
          {modalError && <p className="users-modal-error users-modal-error-delete">{modalError}</p>}
          <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: '24px', color: '#717171', margin: 0, textAlign: 'center', padding: '0 8px' }}>
            Are you sure you want to delete <strong>{current?.name}</strong>? This action cannot be undone.
          </p>
        </AdminModal>
      )}
    </>
  );
};

export default AdminUsers;
