import productApi from './productApi';

/**
 * Register a new user
 * @param {Object} data - { name, email, password }
 * @returns {Promise<Object>} - Response data
 */
export const signUp = async (data) => {
  // Trying common endpoints: /auth/signup, /signup, /auth/register, /register
  const endpoints = ['/auth/signup', '/signup', '/auth/register', '/register'];
  
  for (const endpoint of endpoints) {
    try {
      const response = await productApi.post(endpoint, data);
      return response.data;
    } catch (error) {
      // Only continue to next endpoint if it's a 404
      if (!error.response || error.response.status !== 404) {
        const msg = error.response?.data?.message || error.message || 'Registration failed';
        throw new Error(msg);
      }
      // If it's the last endpoint and still 404, throw error
      if (endpoint === endpoints[endpoints.length - 1]) {
        throw new Error('Registration endpoint not found');
      }
    }
  }
};

/**
 * Login a user
 * @param {Object} data - { email, password }
 * @returns {Promise<Object>} - Response data (includes token)
 */
export const login = async (data) => {
  // Trying common endpoints: /auth/login, /login, /auth/signin, /signin
  const endpoints = ['/auth/login', '/login', '/auth/signin', '/signin'];
  
  for (const endpoint of endpoints) {
    try {
      const response = await productApi.post(endpoint, data);
      return response.data;
    } catch (error) {
      // Only continue to next endpoint if it's a 404
      if (!error.response || error.response.status !== 404) {
        const msg = error.response?.data?.message || error.message || 'Login failed';
        throw new Error(msg);
      }
      // If it's the last endpoint and still 404, throw error
      if (endpoint === endpoints[endpoints.length - 1]) {
        throw new Error('Login endpoint not found');
      }
    }
  }
};
