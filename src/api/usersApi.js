import { BASE_URL, getAuthHeaders } from './apiConfig';

const BASE = `${BASE_URL}/users`;

export const getUsers = async () => {
  const res = await fetch(BASE, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch users (${res.status})`);
  return res.json();
};

export const updateUser = async (id, data) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to update user (${res.status})`);
  }
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to delete user (${res.status})`);
  }
  return res.ok;
};
