export const BASE_URL = "https://tech-heim-indj.onrender.com";

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};
