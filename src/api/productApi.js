const BASE = "";  // CRA proxy forwards to https://tech-heim-indj.onrender.com

export const getProducts = async () => {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product (${res.status})`);
  return res.json();
};

export const createProduct = async (data) => {
  const token = localStorage.getItem('token');
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}/products`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to create product (${res.status})`);
  }
  return res.json();
};

export const updateProduct = async (id, data) => {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to update product (${res.status})`);
  }
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to delete product (${res.status})`);
  }
  return res.ok;
};
