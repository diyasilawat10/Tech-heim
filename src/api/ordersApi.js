import { BASE_URL, getAuthHeaders } from './apiConfig';

const BASE = `${BASE_URL}/orders`;

const parseJsonResponse = async (response) => {
  const text = await response.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const request = async (path = '') => {
  const response = await fetch(`${BASE}${path}`, {
    headers: getAuthHeaders(),
  });

  const payload = await parseJsonResponse(response);

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.error ||
      `Failed to fetch orders (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};

export const extractOrders = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.orders)) return payload.orders;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

export const getAllOrders = async () => {
  const payload = await request();
  return extractOrders(payload);
};

export const getOrderById = async (orderId) => {
  if (!orderId) throw new Error('Order id is required');

  try {
    const orders = await getAllOrders();
    return (
      orders.find(
        (order) => String(order?.id ?? order?._id ?? order?.orderId) === String(orderId)
      ) ?? null
    );
  } catch (error) {
    if (error?.status !== 404) throw error;

    const payload = await request(`/${orderId}`);

    if (payload?.data && !Array.isArray(payload.data)) return payload.data;
    if (payload?.order && !Array.isArray(payload.order)) return payload.order;
    if (!Array.isArray(payload)) return payload;

    return payload.find((order) => String(order?.id ?? order?._id ?? order?.orderId) === String(orderId)) ?? null;
  }
};
