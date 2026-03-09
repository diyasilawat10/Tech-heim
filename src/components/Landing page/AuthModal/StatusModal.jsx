import './StatusModal.css';

function StatusModal({ type = 'success', onClose }) {
    const isSuccess = type === 'success';

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="status-modal-backdrop" onClick={handleBackdropClick}>
            <div className="status-modal" role="dialog" aria-modal="true">

                {/* Icon circle */}
                <div className={`status-icon-circle ${isSuccess ? 'success' : 'error'}`}>
                    {isSuccess ? (
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13l4 4L19 7" stroke="#22A861" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6l12 12M18 6L6 18" stroke="#E03131" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>

                {/* Heading */}
                <h2 className={`status-heading ${isSuccess ? 'success' : 'error'}`}>
                    {isSuccess ? 'Well done' : 'Oops.'}
                </h2>

                {/* Message */}
                <p className="status-message">
                    {isSuccess
                        ? 'Congratulation your account has been successfully created.'
                        : 'Unfortunately, there was a problem during creating your account. try again later.'}
                </p>

                {/* Close / OK button */}
                <button
                    className={`status-close-btn ${isSuccess ? 'success' : 'error'}`}
                    onClick={onClose}
                >
                    {isSuccess ? 'Continue' : 'Try Again'}
                </button>
            </div>
        </div>
    );
}

export default StatusModal;
