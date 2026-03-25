import React from 'react';
import './AdminUserCard.css';

const AdminUserCard = ({ user, onEdit, onDelete }) => {
  const initials = (user.name || '?').charAt(0).toUpperCase();
  const phone = user.phone || 'N/A';
  const address = user.address || 'N/A';
  const role = (user.role || 'user').toLowerCase();

  return (
    <div className="admin-user-card">
      {/* Header: avatar + name + email + role badge */}
      <div className="user-card-header">
        <div className="user-avatar">{initials}</div>
        <div className="user-identity">
          <p className="user-name">{user.name}</p>
          <p className="user-email">{user.email}</p>
        </div>
        <span className={`user-role-badge ${role}`}>{role}</span>
      </div>

      <div className="user-card-divider" />

      {/* Info rows */}
      <div className="user-card-info">
        {/* Phone */}
        <div className="user-info-row">
          <svg className="user-info-icon" viewBox="0 0 24 24" fill="none">
            <path d="M17.45 22.75C16.32 22.75 15.13 22.48 13.9 21.95C12.65 21.41 11.4 20.64 10.22 19.66C9.04 18.67 7.94 17.55 6.95 16.34C5.97 15.12 5.2 13.87 4.67 12.65C4.12 11.38 3.85 10.16 3.85 9.02C3.85 8.25 3.99 7.51 4.26 6.83C4.54 6.12 4.98 5.47 5.61 4.91C6.38 4.19 7.24 3.84 8.15 3.84C8.47 3.84 8.8 3.91 9.09 4.05C9.41 4.2 9.69 4.43 9.9 4.75L12.36 8.18C12.57 8.47 12.72 8.76 12.82 9.03C12.93 9.31 12.99 9.58 12.99 9.84C12.99 10.17 12.9 10.5 12.73 10.81C12.57 11.11 12.35 11.41 12.07 11.69L11.27 12.52C11.27 12.52 11.25 12.55 11.25 12.57C11.38 12.86 11.59 13.2 11.88 13.58C12.18 13.97 12.5 14.35 12.85 14.71C13.22 15.07 13.58 15.4 13.95 15.69C14.34 15.97 14.67 16.16 14.97 16.27L14.97 16.27C14.99 16.27 15.01 16.26 15.03 16.25L15.87 15.38C16.16 15.08 16.47 14.85 16.78 14.7C17.07 14.54 17.39 14.45 17.73 14.45C17.98 14.45 18.24 14.5 18.52 14.61C18.8 14.72 19.07 14.88 19.35 15.1L22.82 17.61C23.15 17.84 23.38 18.12 23.51 18.44C23.63 18.75 23.67 19.07 23.67 19.38C23.67 19.8 23.57 20.22 23.38 20.6C23.19 20.99 22.93 21.34 22.59 21.66C22.03 22.26 21.42 22.68 20.72 22.93C20.04 23.14 19.27 22.75 18.53 22.75H17.45Z" fill="currentColor" fillOpacity="0.6"/>
          </svg>
          <span className={`user-info-text${phone === 'N/A' ? ' na' : ''}`}>{phone}</span>
        </div>

        {/* Address */}
        <div className="user-info-row">
          <svg className="user-info-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 13.43C13.7232 13.43 15.12 12.0332 15.12 10.31C15.12 8.58681 13.7232 7.19 12 7.19C10.2768 7.19 8.88 8.58681 8.88 10.31C8.88 12.0332 10.2768 13.43 12 13.43Z" fill="currentColor" fillOpacity="0.6"/>
            <path d="M3.62 8.49C5.59 -0.169997 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39 20.54C5.63 17.88 2.47 13.57 3.62 8.49Z" fill="currentColor" fillOpacity="0.6"/>
          </svg>
          <span className={`user-info-text${address === 'N/A' ? ' na' : ''}`}>{address}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="user-card-actions">
        <button className="user-edit-btn" onClick={() => onEdit(user)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M13.26 3.6L5.05 12.29C4.74 12.62 4.44 13.27 4.38 13.72L4.01 16.96C3.88 18.13 4.72 18.93 5.88 18.73L9.1 18.18C9.55 18.1 10.18 17.77 10.49 17.43L18.7 8.74C20.12 7.24 20.76 5.53 18.55 3.44C16.35 1.37 14.68 2.1 13.26 3.6Z" fill="currentColor"/>
            <path d="M11.89 5.05C12.16 7.81 14.42 9.93 17.2 10.05" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 22H21" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>

        <button className="user-delete-btn" onClick={() => onDelete(user)} aria-label="Delete user">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.33 16.5H13.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.5 12.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdminUserCard;
