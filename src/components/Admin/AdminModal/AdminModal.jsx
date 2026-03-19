import React from 'react';
import './AdminModal.css';

const ModalInput = ({ label, value, onChange, placeholder, type = 'text', error, supportingText }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const isFilled = !!value;

  return (
    <div className={`modal-input-group ${isFocused ? 'focused' : ''} ${isFilled ? 'filled' : ''} ${error ? 'error' : ''}`}>
      <div className="modal-label-container">
        <span className="modal-label-segment left"></span>
        <label className="modal-input-label">
          {label}
        </label>
        <span className="modal-label-segment fill"></span>
      </div>
      <div className="modal-input-wrapper">
        <div className="modal-focus-shadow"></div>
        <input
          type={type}
          className="modal-field-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || label}
        />
        {value && isFocused && (
          <span 
            className="modal-clear-icon" 
            onMouseDown={(e) => {
              e.preventDefault();
              onChange('');
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.17 14.83l5.66-5.66M14.83 14.83L9.17 9.17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
      {supportingText && <p className="modal-supporting-text">{supportingText}</p>}
    </div>
  );
};

const FileUpload = ({ label, value, onChange, error }) => {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`modal-input-group file-upload ${error ? 'error' : ''}`}>
      <div className="modal-label-container filled">
        <span className="modal-label-segment left"></span>
        <label className="modal-input-label">{label}</label>
        <span className="modal-label-segment fill"></span>
      </div>
      <div className="modal-input-wrapper file-wrapper">
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="file-display" onClick={() => fileInputRef.current.click()}>
          {value && value.startsWith('data:') ? (
            <div className="file-preview-mini" style={{ backgroundImage: `url(${value})` }}></div>
          ) : (
            <div className="upload-placeholder">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 17V11L7 13" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11L11 13" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{value ? 'Change local image' : 'Click to or drag to upload image'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  children,
  saveText = 'save',
  variant = 'default',
  saveDisabled = false
}) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${variant}`} onClick={onClose}>
      <div className={`admin-modal-container ${variant === 'delete' ? 'delete-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M15 27.5c6.904 0 12.5-5.596 12.5-12.5S21.904 2.5 15 2.5 2.5 8.096 2.5 15 8.096 27.5 15 27.5z" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.46 18.54l7.08-7.08M18.54 18.54l-7.08-7.08" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>

        <div className="modal-footer">
          <button className="modal-save-btn" onClick={onSave} disabled={saveDisabled}>
            {saveText}
          </button>
        </div>
      </div>
    </div>
  );
};

AdminModal.Input = ModalInput;
AdminModal.FileUpload = FileUpload;

export default AdminModal;
