import { BASE_URL, getAuthHeaders } from './apiConfig';

const BASE = `${BASE_URL}/orders`;

// Utility function for handling API responses
const handleApiResponse = async (response, operation) => {
  if (!response.ok) {
    let errorMessage = `Failed to ${operation} (${response.status})`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (e) {
      // If we can't parse the error response, use the default message
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }

  const rawText = await response.text();
  if (!rawText) {
    return null;
  }

  return JSON.parse(rawText);
};

// Utility function for making authenticated requests
const makeAuthenticatedRequest = async (url, options = {}) => {
  const defaultOptions = {
    headers: getAuthHeaders(),
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  return fetch(url, finalOptions);
};

export const getAllOrders = async () => {
  try {
    const response = await makeAuthenticatedRequest(BASE);
    return await handleApiResponse(response, 'fetch orders');
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

export const getOrdersByUser = async (userId) => {
  if (!userId) throw new Error('User ID is required');

  try {
    const response = await makeAuthenticatedRequest(`${BASE}/user/${userId}`);
    return await handleApiResponse(response, 'fetch orders for user');
  } catch (error) {
    console.error(`Error fetching orders for user ${userId}:`, error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  if (!id) throw new Error('Order ID is required');

  try {
    const response = await makeAuthenticatedRequest(`${BASE}/${id}`);
    return await handleApiResponse(response, 'fetch order');
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    throw error;
  }
};

export const createOrder = async (userId, orderData = {}) => {
  if (!userId) throw new Error('User ID is required');

  const normalizedItems = Array.isArray(orderData.items)
    ? orderData.items
        .map((item) => {
          const productId = item?.productId ?? item?.id ?? item?.product?.id ?? item?.product?.productId ?? item?.product;
          const quantity = Number(item?.quantity ?? item?.qty ?? 1) || 1;

          if (!productId) return null;

          return {
            productId: Number(productId),
            quantity,
          };
        })
        .filter(Boolean)
    : [];

  if (normalizedItems.length === 0) {
    throw new Error('Add at least one valid product before creating the order.');
  }

  const payload = {
    status: orderData.status || 'placed',
    items: normalizedItems.map(({ productId, quantity }) => ({
      productId,
      quantity,
    })),
  };

  try {
    const response = await makeAuthenticatedRequest(`${BASE}/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return await handleApiResponse(response, 'create order');
  } catch (error) {
    if (error.message?.includes('404')) {
      throw new Error('Order creation endpoint was not found on the server.');
    }
    console.error(`Error creating order for user ${userId}:`, error);
    throw error;
  }
};
 
export const updateOrderStatus = async (id, status) => {
  if (!id) throw new Error('Order ID is required');
  if (!status) throw new Error('Status is required');
 
  const validStatuses = ['placed', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }
 
  try {
    const requestConfigs = [
      { url: `${BASE}/${id}/status`, method: 'PATCH', body: { status } },
      { url: `${BASE}/${id}`, method: 'PATCH', body: { status } },
      { url: `${BASE}/${id}/status`, method: 'PATCH', body: { orderStatus: status } },
      { url: `${BASE}/${id}`, method: 'PATCH', body: { orderStatus: status } },
      { url: `${BASE}/${id}/status`, method: 'PUT', body: { status } },
      { url: `${BASE}/${id}`, method: 'PUT', body: { status } },
    ];
 
    let lastError = null;
 
    for (const config of requestConfigs) {
      try {
        const response = await makeAuthenticatedRequest(config.url, {
          method: config.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(config.body),
        });
 
        return await handleApiResponse(response, 'update order status');
      } catch (error) {
        lastError = error;
      }
    }
 
    throw lastError || new Error('Failed to update order status');
  } catch (error) {
    console.error(`Error updating order ${id} status to ${status}:`, error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  if (!id) throw new Error('Order ID is required');

  try {
    const response = await makeAuthenticatedRequest(`${BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      await handleApiResponse(response, 'delete order');
    }
    return true; // DELETE requests typically don't return data
  } catch (error) {
    console.error(`Error deleting order ${id}:`, error);
    throw error;
  }
};

// Additional utility functions for better API integration
export const getOrderStats = async () => {
  try {
    const orders = await getAllOrders();
    const stats = {
      total: orders.length,
      placed: orders.filter(order => order.status === 'placed').length,
      shipped: orders.filter(order => order.status === 'shipped').length,
      delivered: orders.filter(order => order.status === 'delivered').length,
      cancelled: orders.filter(order => order.status === 'cancelled').length,
    };
    return stats;
  } catch (error) {
    console.error('Error calculating order stats:', error);
    throw error;
  }
};

export const searchOrders = async (query) => {
  try {
    const orders = await getAllOrders();
    if (!query) return orders;

    const searchTerm = query.toLowerCase();
    return orders.filter(order =>
      String(order.id).toLowerCase().includes(searchTerm) ||
      String(order.status).toLowerCase().includes(searchTerm) ||
      (order.user?.name && order.user.name.toLowerCase().includes(searchTerm)) ||
      (order.user?.email && order.user.email.toLowerCase().includes(searchTerm))
    );
  } catch (error) {
    console.error('Error searching orders:', error);
    throw error;
  }
};
