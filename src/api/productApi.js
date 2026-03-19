import axios from 'axios';

const productApi = axios.create({
  baseURL: '/api',
  timeout: 20000
});

const getAuthToken = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  return localStorage.getItem('token') || '';
};

productApi.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
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
