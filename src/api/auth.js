import axios from 'axios';

const BACKEND_URL = '';

const authApi = axios.create({
  baseURL: BACKEND_URL,
  timeout: 30000
});

/**
 * Log in with email and password.
 */
export const login = (email, password) =>
  authApi.post('/auth/login', { email, password });

/**
 * Register a new user.
 */
export const register = (payload) =>
  authApi.post('/auth/signup', payload);

/**
 * Save a JWT token to localStorage.
 */
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Retrieve the stored JWT token.
 */
export const getToken = () => localStorage.getItem('token') || '';

/**
 * Remove the stored JWT token (logout).
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * Return true if a token is currently stored.
 */
export const isLoggedIn = () => Boolean(getToken());

/**
 * Decode the JWT payload without verifying the signature.
 */
export const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const padded = payload + '='.repeat((4 - payload.length % 4) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

/**
 * Return true if the stored token belongs to an admin.
 */
export const isAdmin = () => {
  const token = getToken();
  if (!token) return false;
  const decoded = decodeToken(token);
  return decoded?.role === 'admin';
};

export default authApi;
