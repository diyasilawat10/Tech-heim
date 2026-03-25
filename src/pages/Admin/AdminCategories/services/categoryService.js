const BASE = ""; // Use relative proxy from package.json

export const getCategories = async () => {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) throw new Error(`Failed to fetch categories (${res.status})`);
  return res.json();
};

export const createCategory = async (data) => {
  const token = localStorage.getItem('token');
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}/categories`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to create category (${res.status})`);
  }
  return res.json();
};

export const updateCategory = async (id, data) => {
  const token = localStorage.getItem('token');
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}/categories/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to update category (${res.status})`);
  }
  return res.json();
};

export const deleteCategory = async (id) => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}/categories/${id}`, {
    method: "DELETE",
    headers
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to delete category (${res.status})`);
  }
  return res.ok;
};
