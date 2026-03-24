import axios from 'axios';

const productApi = axios.create({
  baseURL: '/',
  timeout: 60000
});

const getAuthToken = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  return localStorage.getItem('token') || '';
};

productApi.interceptors.request.use(
  (config) => {
    // Skip Authorization header for auth endpoints to avoid CORS/preflight issues on public routes
    const isAuthEndpoint = config.url.includes('/auth/login') || 
                           config.url.includes('/auth/signup') || 
                           config.url.includes('/login') || 
                           config.url.includes('/signup') ||
                           config.url.includes('/register') ||
                           config.url.includes('/signin');

    if (typeof window !== 'undefined' && !isAuthEndpoint) {
      const token = getAuthToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const getProducts = () => productApi.get('/products');

export const createProduct = (payload) => productApi.post('/products', payload);

export const updateProduct = (id, payload) => productApi.put(`/products/${id}`, payload);

export const deleteProduct = (id) => productApi.delete(`/products/${id}`);

export default productApi;
