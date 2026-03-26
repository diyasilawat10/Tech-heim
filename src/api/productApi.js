import { BASE_URL, getAuthHeaders } from './apiConfig';

const BASE = `${BASE_URL}/products`;

export const getProducts = async () => {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product (${res.status})`);
  return res.json();
};

export const createProduct = async (data) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to create product (${res.status})`);
  }
  return res.json();
};

export const updateProduct = async (id, data) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to update product (${res.status})`);
  }
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to delete product (${res.status})`);
  }
  return res.ok;
};
