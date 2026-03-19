import './StatusModal.css';

function SuccessIcon() {
    return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
            <path
                d="M60 110C87.6142 110 110 87.6142 110 60C110 32.3858 87.6142 10 60 10C32.3858 10 10 32.3858 10 60C10 87.6142 32.3858 110 60 110Z"
                opacity="0"
            />
            <path
                d="M40.5 60.5L53.5 73.5L80 47"
                stroke="#22A861"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ErrorIcon() {
    return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
            <path
                d="M60 110C87.6142 110 110 87.6142 110 60C110 32.3858 87.6142 10 60 10C32.3858 10 10 32.3858 10 60C10 87.6142 32.3858 110 60 110Z"
                opacity="0"
            />
            <path
                d="M42 42L78 78"
                stroke="#C91433"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M78 42L42 78"
                stroke="#C91433"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const MODAL_COPY = {
    success: {
        title: 'Well done',
        message: 'Congratulation your account has been successfully created.',
    },
    error: {
        title: 'Oops.',
        message: 'Unfortunately, there was a problem during creating your account. try again later.',
    },
};

function StatusModal({ type = 'success', onClose }) {
    const isSuccess = type === 'success';
    const { title, message } = MODAL_COPY[isSuccess ? 'success' : 'error'];

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="status-modal-backdrop" onClick={handleBackdropClick}>
            <div
                className={`status-modal status-modal--${type}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="status-modal-title"
            >
                <div className="status-icon-shell">
                    <div className="status-icon">
                        {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
                    </div>
                </div>

                <h2 id="status-modal-title" className="status-title">
                    {title}
                </h2>

                <p className="status-message">{message}</p>
            </div>
        </div>
    );
}

export default StatusModal;
