import React, { useState, useEffect, useRef } from 'react';
import './AuthModal.css';
import { signUp, login } from '../../../api/auth';

const TAB = {
    LOGIN: 'login',
    REGISTER: 'register',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function UserIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 11.25C9.38 11.25 7.25 9.12 7.25 6.5C7.25 3.88 9.38 1.75 12 1.75C14.62 1.75 16.75 3.88 16.75 6.5C16.75 9.12 14.62 11.25 12 11.25Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.41 22.25C4.41 18.83 7.8 16.25 12 16.25C16.2 16.25 19.59 18.83 19.59 22.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function KeyIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M7 10V8C7 4.69 8 2 12 2C16 2 17 4.69 17 8V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 18.5C13.38 18.5 14.5 17.38 14.5 16C14.5 14.62 13.38 13.5 12 13.5C10.62 13.5 9.5 14.62 9.5 16C9.5 17.38 10.62 18.5 12 18.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function EyeSlashIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M14.53 9.47L9.47 14.53C8.82 13.84 8.42 12.97 8.42 12C8.42 10.02 10.02 8.42 12 8.42C12.97 8.42 13.84 8.82 14.53 9.47Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73C8.47 3.73 5.18 5.81 2.89 9.41C1.99 10.82 1.99 13.19 2.89 14.6C3.68 15.84 4.6 16.91 5.6 17.77"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.42 19.53C9.56 20.01 10.77 20.27 12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.4C20.78 8.88 20.42 8.39 20.05 7.93"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.51 12.7C15.25 14.11 14.11 15.25 12.7 15.51"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.47 14.53L2 22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22 2L14.53 9.47"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42 13.98 8.42 12C8.42 10.02 10.02 8.42 12 8.42C13.98 8.42 15.58 10.02 15.58 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.4C18.82 5.81 15.53 3.73 12 3.73C8.47 3.73 5.18 5.81 2.89 9.4C1.99 10.81 1.99 13.18 2.89 14.59C5.18 18.19 8.47 20.27 12 20.27Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function CloseCircleIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.17 14.83L14.83 9.17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.83 14.83L9.17 9.17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function TickSquareIcon({ checked }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke={checked ? '#0C68F4' : '#505050'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {checked ? (
                <path
                    d="M7.75 12L10.58 14.83L16.25 9.17"
                    stroke="#0C68F4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ) : null}
        </svg>
    );
}

function GoogleIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22.0002 12.2273C22.0002 11.5182 21.9366 10.8364 21.8184 10.1818H12.0002V14.05H17.382C17.1502 15.3 16.4411 16.3591 15.382 17.0682V19.5773H18.6148C20.5057 17.8364 21.5966 15.2727 21.5966 12.2273H22.0002Z" fill="#4285F4" />
            <path d="M12.0001 22C14.7001 22 16.9647 21.1046 18.6147 19.5773L15.3819 17.0682C14.4865 17.6682 13.341 18.0227 12.0001 18.0227C9.39557 18.0227 7.19098 16.2637 6.40553 13.9H3.06462V16.4909C4.70553 19.75 8.07735 22 12.0001 22Z" fill="#34A853" />
            <path d="M6.4057 13.9C6.2057 13.3 6.09161 12.6546 6.09161 12C6.09161 11.3455 6.2057 10.7 6.4057 10.1V7.50909H3.06479C2.38752 8.85909 2 10.3818 2 12C2 13.6182 2.38752 15.1409 3.06479 16.4909L6.4057 13.9Z" fill="#FBBC05" />
            <path d="M12.0001 5.97727C13.4637 5.97727 14.7773 6.48182 15.8092 7.47273L18.6874 4.59546C16.9601 2.99091 14.6956 2 12.0001 2C8.07735 2 4.70553 4.25 3.06462 7.50909L6.40553 10.1C7.19098 7.73636 9.39557 5.97727 12.0001 5.97727Z" fill="#EA4335" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="#0C68F4" />
            <path
                d="M13.5001 20V12.8H15.9001L16.2601 10H13.5001V8.21539C13.5001 7.40462 13.7255 6.85154 14.8893 6.85154H16.357V4.34769C15.6432 4.27298 14.9261 4.23754 14.2085 4.24154C12.0801 4.24154 10.6201 5.54154 10.6201 7.93077V10H8.22009V12.8H10.6201V20H13.5001Z"
                fill="white"
            />
        </svg>
    );
}

function isValidEmail(value) {
    return EMAIL_PATTERN.test(value.trim());
}

function AuthField({
    id,
    type,
    value,
    onChange,
    placeholder,
    autoComplete,
    icon,
    trailing,
    label,
    hasError = false,
    supportingText = '',
    clearable = false,
    onClear,
    disabled = false,
    inputRef,
}) {
    const trailingContent = trailing || (hasError && clearable ? (
        <button
            type="button"
            className="auth-field-action-button"
            aria-label={`Clear ${label || placeholder}`}
            onClick={onClear}
            disabled={disabled}
        >
            <CloseCircleIcon />
        </button>
    ) : null);

    return (
        <div className={`auth-field ${hasError ? 'auth-field--error' : ''}`}>
            <label className="auth-field-shell" htmlFor={id}>
                {label ? (
                    <span className="auth-field-label">
                        <span className="auth-field-label-chip">
                            <span className="auth-field-label-required">*</span>
                            <span>{label}</span>
                        </span>
                        <span className="auth-field-label-line" />
                    </span>
                ) : null}
                <span className="auth-field-icon">{icon}</span>
                <input
                    id={id}
                    className="auth-field-input"
                    type={type}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={hasError || undefined}
                    disabled={disabled}
                    ref={inputRef}
                />
            </label>
            <span className={`auth-field-trailing ${trailingContent ? '' : 'is-hidden'}`}>
                {trailingContent}
            </span>
            {hasError && supportingText ? (
                <span className="auth-field-supporting-text">{supportingText}</span>
            ) : null}
        </div>
    );
}

function AuthModal({ onClose, onLoginSuccess, onRegisterSuccess, onRegisterError, isOpen, modalType }) {
    const [activeTab, setActiveTab] = useState(TAB.LOGIN);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [loginSubmitted, setLoginSubmitted] = useState(false);
    const [loginEmailDirty, setLoginEmailDirty] = useState(false);
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [registerSubmitted, setRegisterSubmitted] = useState(false);
    const [registerEmailDirty, setRegisterEmailDirty] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    const emailInputRef = useRef(null);

    useEffect(() => {
        if (isOpen && (modalType === 'login' || modalType === 'create')) {
            setTimeout(() => {
                emailInputRef.current?.focus();
            }, 100);
        }
    }, [isOpen, modalType]);

    const isRegister = activeTab === TAB.REGISTER;
    const showRegisterNameError = isRegister && registerSubmitted && !registerName.trim();
    const showRegisterEmailError =
        isRegister &&
        ((registerSubmitted || registerEmailDirty) && !isValidEmail(registerEmail));
    const showRegisterPasswordError = isRegister && registerSubmitted && !registerPassword.trim();

    const showLoginEmailError =
        !isRegister &&
        ((loginSubmitted || loginEmailDirty) && !isValidEmail(loginEmail));
    const showLoginPasswordError = !isRegister && loginSubmitted && !loginPassword.trim();

    const isRegisterSubmitDisabled = isRegister && (!agreeToTerms || isSubmitting);

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleTabChange = (nextTab) => {
        setActiveTab(nextTab);
        setIsSubmitting(false);
        setApiError('');
        setRegisterSubmitted(false);
        setRegisterEmailDirty(false);
        setLoginSubmitted(false);
        setLoginEmailDirty(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setApiError('');

        if (isRegister) {
            const hasNameError = !registerName.trim();
            const hasEmailError = !isValidEmail(registerEmail);
            const hasPasswordError = !registerPassword.trim();

            setRegisterSubmitted(true);

            if (hasNameError || hasEmailError || hasPasswordError) {
                onRegisterError('Please fill in all required fields correctly.');
                return;
            }

            setIsSubmitting(true);
            try {
                await signUp({
                    name: registerName.trim(),
                    email: registerEmail.trim(),
                    password: registerPassword,
                });
                onRegisterSuccess();
            } catch (error) {
                console.error('Registration Error:', error);
                const message = error.response?.data?.message || error.message || 'Registration failed';
                setApiError(message);
                onRegisterError();
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        const hasEmailError = !isValidEmail(loginEmail);
        const hasPasswordError = !loginPassword.trim();

        setLoginSubmitted(true);

        if (hasEmailError || hasPasswordError) {
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await login({
                email: loginEmail.trim(),
                password: loginPassword,
            });

            // Robust token extraction
            const token = res?.data?.token || res?.token || res?.accessToken || res?.access_token || res?.data?.access_token;
            if (token) {
                localStorage.setItem("token", token);
            }

            onLoginSuccess();
        } catch (error) {
            console.error('Login Error:', error);
            const message = error.message === 'Unauthorized' ? 'Invalid email or password' : error.message;
            setApiError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-modal-backdrop" onClick={handleBackdropClick}>
            <div
                className={[
                    'auth-modal',
                    `auth-modal--${activeTab}`,
                    activeTab === TAB.REGISTER && showRegisterEmailError ? 'auth-modal--register-email-error' : '',
                    activeTab === TAB.LOGIN && showLoginEmailError ? 'auth-modal--login-email-error' : '',
                ].filter(Boolean).join(' ')}
                role="dialog"
                aria-modal="true"
                aria-labelledby="auth-modal-title"
            >
                <div className="auth-tabs">
                    <button
                        type="button"
                        className={`auth-tab ${!isRegister ? 'active' : ''}`}
                        onClick={() => handleTabChange(TAB.LOGIN)}
                        disabled={isSubmitting}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        className={`auth-tab ${isRegister ? 'active' : ''}`}
                        onClick={() => handleTabChange(TAB.REGISTER)}
                        disabled={isSubmitting}
                    >
                        Create Account
                    </button>
                </div>

                <h2 id="auth-modal-title" className="auth-title">
                    {isRegister ? 'Create your account' : 'Log in to Tech Heim'}
                </h2>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <div className="auth-fields">
                        {apiError && (
                            <div className="auth-api-error">
                                {apiError}
                            </div>
                        )}
                        {isRegister ? (
                            <AuthField
                                id="register-name"
                                type="text"
                                value={registerName}
                                onChange={setRegisterName}
                                placeholder="Full Name"
                                autoComplete="name"
                                icon={<UserIcon />}
                                label="Name"
                                hasError={showRegisterNameError}
                                disabled={isSubmitting}
                            />
                        ) : null}

                        <AuthField
                            id={isRegister ? 'register-email' : 'login-email'}
                            type="email"
                            value={isRegister ? registerEmail : loginEmail}
                            onChange={isRegister ? (value) => {
                                setRegisterEmail(value);
                                setRegisterEmailDirty(true);
                            } : (value) => {
                                setLoginEmail(value);
                                setLoginEmailDirty(true);
                            }}
                            placeholder="E-mail"
                            autoComplete="email"
                            icon={<MailIcon />}
                            label="Email"
                            hasError={isRegister ? showRegisterEmailError : showLoginEmailError}
                            supportingText={(isRegister ? showRegisterEmailError : showLoginEmailError) ? 'Invalid email' : ''}
                            clearable={true}
                            onClear={() => {
                                if (isRegister) {
                                    setRegisterEmail('');
                                    setRegisterEmailDirty(false);
                                    setRegisterSubmitted(false);
                                } else {
                                    setLoginEmail('');
                                    setLoginEmailDirty(false);
                                    setLoginSubmitted(false);
                                }
                            }}
                            disabled={isSubmitting}
                            inputRef={emailInputRef}
                        />

                        <AuthField
                            id={isRegister ? 'register-password' : 'login-password'}
                            type={
                                isRegister
                                    ? (showRegisterPassword ? 'text' : 'password')
                                    : (showLoginPassword ? 'text' : 'password')
                            }
                            value={isRegister ? registerPassword : loginPassword}
                            onChange={isRegister ? setRegisterPassword : setLoginPassword}
                            placeholder="Password"
                            autoComplete={isRegister ? 'new-password' : 'current-password'}
                            icon={<KeyIcon />}
                            label="Password"
                            hasError={isRegister ? showRegisterPasswordError : showLoginPasswordError}
                            disabled={isSubmitting}
                            trailing={(
                                <button
                                    type="button"
                                    className="auth-field-action-button"
                                    aria-label={
                                        isRegister
                                            ? (showRegisterPassword ? 'Hide password' : 'Show password')
                                            : (showLoginPassword ? 'Hide password' : 'Show password')
                                    }
                                    onClick={() => {
                                        if (isRegister) {
                                            setShowRegisterPassword((value) => !value);
                                            return;
                                        }

                                        setShowLoginPassword((value) => !value);
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isRegister
                                        ? (showRegisterPassword ? <EyeIcon /> : <EyeSlashIcon />)
                                        : (showLoginPassword ? <EyeIcon /> : <EyeSlashIcon />)}
                                </button>
                            )}
                        />
                    </div>

                    {!isRegister ? (
                        <button type="button" className="auth-forgot-link" disabled={isSubmitting}>
                            Forgot Password ?
                        </button>
                    ) : null}

                    <label
                        className={`auth-checkbox-row ${isRegister ? 'auth-checkbox-row--register' : 'auth-checkbox-row--login'
                            }`}
                    >
                        <input
                            className="auth-checkbox-input"
                            type="checkbox"
                            checked={isRegister ? agreeToTerms : keepLoggedIn}
                            disabled={isSubmitting}
                            onChange={(event) => {
                                if (isRegister) {
                                    setAgreeToTerms(event.target.checked);
                                    return;
                                }

                                setKeepLoggedIn(event.target.checked);
                            }}
                        />
                        <span className="auth-checkbox-box">
                            <TickSquareIcon checked={isRegister ? agreeToTerms : keepLoggedIn} />
                        </span>
                        <span className="auth-checkbox-text">
                            {isRegister ? (
                                <>
                                    I agree to all <button type="button" className="auth-link-blue">Terms & Conditions</button>
                                </>
                            ) : 'Keep me logged in'}
                        </span>
                    </label>

                    <button
                        type="submit"
                        className={`auth-submit-button ${isRegisterSubmitDisabled ? 'is-disabled' : ''}`}
                        disabled={isSubmitting || isRegisterSubmitDisabled}
                    >
                        {isSubmitting
                            ? (isRegister ? 'Creating Account...' : 'Logging In...')
                            : (isRegister ? 'Create Account' : 'Log In')}
                    </button>

                    <div className="auth-divider">
                        <span>{isRegister ? 'Or Sign Up with' : 'Or Log In with'}</span>
                    </div>

                    <div className="auth-social-row">
                        <button type="button" className="auth-social-button" disabled={isSubmitting}>
                            <GoogleIcon />
                            <span>Google</span>
                        </button>
                        <button type="button" className="auth-social-button" disabled={isSubmitting}>
                            <FacebookIcon />
                            <span>Facebook</span>
                        </button>
                    </div>

                    {isRegister ? (
                        <div className="auth-switch-row">
                            <span className="auth-switch-text">Already have an account ?</span>
                            <button
                                type="button"
                                className="auth-switch-link"
                                onClick={() => handleTabChange(TAB.LOGIN)}
                            >
                                Sign In
                            </button>
                        </div>
                    ) : (
                        <div className="auth-switch-row">
                            <span className="auth-switch-text">Don’t have an account ?</span>
                            <button
                                type="button"
                                className="auth-switch-link"
                                onClick={() => handleTabChange(TAB.REGISTER)}
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AuthModal;
