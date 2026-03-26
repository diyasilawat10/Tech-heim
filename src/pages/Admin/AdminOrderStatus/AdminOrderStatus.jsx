import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './AdminOrderStatus.css';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import { getOrderById } from '../../../api/ordersApi';
import { getDemoOrderById } from '../../../constants/demoOrders';

const normalizeText = (value, fallback = 'N/A') => {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return fallback;
};

const getOrderId = (order) => normalizeText(order?.id ?? order?._id ?? order?.orderId, 'N/A');

const getOrderStatus = (order) =>
  normalizeText(order?.status ?? order?.orderStatus ?? order?.order_status ?? order?.deliveryStatus, 'Pending');

const getCustomer = (order) =>
  order?.user ?? order?.customer ?? order?.customerInfo ?? order?.shippingAddress ?? {};

const getCustomerName = (order) =>
  normalizeText(
    getCustomer(order)?.name ??
      getCustomer(order)?.fullName ??
      [getCustomer(order)?.firstName, getCustomer(order)?.lastName].filter(Boolean).join(' '),
    'N/A'
  );

const getCustomerEmail = (order) =>
  normalizeText(getCustomer(order)?.email ?? order?.email ?? order?.contactEmail, 'N/A');

const getCustomerPhone = (order) =>
  normalizeText(
    getCustomer(order)?.phone ?? getCustomer(order)?.phoneNumber ?? order?.phone ?? order?.contactPhone,
    'N/A'
  );

const getAddress = (order) => {
  const customer = getCustomer(order);
  const address = order?.address ?? order?.shippingAddress ?? customer?.address ?? customer;

  if (typeof address === 'string') return normalizeText(address, 'N/A');

  return normalizeText(
    [
      address?.line1 ?? address?.street,
      address?.line2,
      address?.city,
      address?.state,
      address?.postalCode ?? address?.zip,
      address?.country,
    ]
      .filter(Boolean)
      .join(', '),
    'N/A'
  );
};

const getOrderItems = (order) => {
  if (Array.isArray(order?.items)) return order.items;
  if (Array.isArray(order?.orderItems)) return order.orderItems;
  if (Array.isArray(order?.products)) return order.products;
  return [];
};

const getProductFromItem = (item) => item?.product ?? item?.productId ?? item ?? {};

const getItemImage = (item) =>
  getProductFromItem(item)?.image ??
  getProductFromItem(item)?.thumbnail ??
  item?.image ??
  item?.productImage ??
  '';

const getItemName = (item) =>
  normalizeText(
    getProductFromItem(item)?.name ?? getProductFromItem(item)?.title ?? item?.name ?? item?.title,
    'N/A'
  );

const getItemSku = (item) =>
  normalizeText(getProductFromItem(item)?.sku ?? item?.sku ?? item?.code ?? item?.productCode, 'N/A');

const getItemQuantity = (item) => {
  const quantity = Number(item?.quantity ?? item?.qty ?? item?.count);
  return Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
};

const getItemPrice = (item) => {
  const product = getProductFromItem(item);
  const price = Number(item?.price ?? item?.unitPrice ?? product?.price);
  return Number.isFinite(price) ? price : 0;
};

const getOrderTotal = (order) => {
  const total = Number(order?.total ?? order?.totalAmount ?? order?.amount);

  if (Number.isFinite(total)) return total;

  return getOrderItems(order).reduce((sum, item) => sum + getItemPrice(item) * getItemQuantity(item), 0);
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

const formatDate = (value) => {
  if (!value) return 'N/A';

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return normalizeText(value, 'N/A');

  return parsed.toLocaleDateString('en-CA');
};

const getStatusTone = (status) => {
  const normalized = status.toLowerCase();

  if (normalized.includes('deliver')) return 'success';
  if (normalized.includes('cancel') || normalized.includes('fail') || normalized.includes('return')) return 'danger';
  if (normalized.includes('ship') || normalized.includes('way')) return 'info';
  return 'warning';
};

const getPaymentMethod = (order) =>
  normalizeText(
    order?.paymentMethod ?? order?.paymentType ?? order?.payment_type ?? order?.payment?.method,
    'N/A'
  );

const getPaymentStatus = (order) => {
  const rawStatus =
    order?.paymentStatus ?? order?.payment_status ?? order?.payment?.status ?? order?.payment?.paymentStatus;

  if (typeof rawStatus === 'string' && rawStatus.trim()) return rawStatus.trim();
  return getPaymentMethod(order) === 'N/A' ? 'N/A' : 'Paid';
};

const getTransactionId = (order) =>
  normalizeText(order?.transactionId ?? order?.transaction_id ?? order?.payment?.transactionId, 'N/A');

const AdminOrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);
      setError('');

      try {
        const orderDetails = await getOrderById(id);

        if (!orderDetails) {
          const demoOrder = getDemoOrderById(id);

          if (demoOrder) {
            setOrder(demoOrder);
            return;
          }

          setError('Order not found');
          return;
        }

        setOrder(orderDetails);
      } catch (loadError) {
        const demoOrder = getDemoOrderById(id);

        if (demoOrder) {
          setOrder(demoOrder);
        } else {
          setError(loadError.message || 'Failed to load order details');
        }
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  const items = useMemo(() => getOrderItems(order), [order]);
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + getItemQuantity(item), 0),
    [items]
  );
  const totalAmount = useMemo(() => getOrderTotal(order), [order]);
  const status = getOrderStatus(order);
  const statusTone = getStatusTone(status);
  const paymentStatus = getPaymentStatus(order);
  const paymentTone = getStatusTone(paymentStatus);

  return (
    <AdminLayout
      pageClassName="admin-order-detail-page"
    >
      <section className="admin-order-detail-content">
        <Link to="/admin/orders" className="admin-order-back-link">
          Back to Orders
        </Link>

        {loading && (
          <div className="order-detail-status-block">
            <p className="order-detail-feedback">Loading order details...</p>
          </div>
        )}

        {!loading && error && (
          <div className="order-detail-status-block">
            <p className="order-detail-feedback order-detail-feedback-error">{error}</p>
            <Link to="/admin/orders" className="orders-view-btn">
              Return to Orders
            </Link>
          </div>
        )}

        {!loading && !error && order && (
          <>
            <header className="order-detail-header">
              <div className="order-detail-heading-group">
                <p className="order-detail-page-title">Order Detail</p>
                <p className="order-detail-subtitle">Review customer, payment, shipping, and item data.</p>
                <h1 className="order-detail-title">Order #{getOrderId(order)}</h1>
              </div>

              <div className="order-detail-header-meta">
                <span className={`order-detail-badge order-detail-badge--${statusTone}`}>{status}</span>
                <span className="order-detail-date">
                  Placed {formatDate(order?.createdAt ?? order?.created_at ?? order?.date)}
                </span>
              </div>
            </header>

            <section className="order-overview-grid">
              <article className="order-overview-card">
                <span className="order-overview-label">Total Amount</span>
                <strong className="order-overview-value">{formatCurrency(totalAmount)}</strong>
              </article>
              <article className="order-overview-card">
                <span className="order-overview-label">Items</span>
                <strong className="order-overview-value">{totalItems}</strong>
              </article>
              <article className="order-overview-card">
                <span className="order-overview-label">Payment</span>
                <strong className="order-overview-value">{getPaymentMethod(order)}</strong>
              </article>
              <article className="order-overview-card">
                <span className="order-overview-label">Transaction ID</span>
                <strong className="order-overview-value order-overview-value--small">{getTransactionId(order)}</strong>
              </article>
            </section>

            <section className="order-detail-grid">
              <article className="order-detail-card">
                <div className="order-detail-card-header">
                  <h2 className="order-detail-card-title">Order Summary</h2>
                </div>
                <div className="order-detail-list">
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Order ID</span>
                    <span className="order-detail-list-value">#{getOrderId(order)}</span>
                  </div>
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Current status</span>
                    <span className={`order-detail-inline-badge order-detail-inline-badge--${statusTone}`}>
                      {status}
                    </span>
                  </div>
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Placed on</span>
                    <span className="order-detail-list-value">
                      {formatDate(order?.createdAt ?? order?.created_at ?? order?.date)}
                    </span>
                  </div>
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Items count</span>
                    <span className="order-detail-list-value">{totalItems}</span>
                  </div>
                </div>
              </article>

              <article className="order-detail-card">
                <div className="order-detail-card-header">
                  <h2 className="order-detail-card-title">Customer Details</h2>
                </div>
                <div className="order-detail-list">
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Customer name</span>
                    <span className="order-detail-list-value">{getCustomerName(order)}</span>
                  </div>
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Email</span>
                    <span className="order-detail-list-value">{getCustomerEmail(order)}</span>
                  </div>
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Phone</span>
                    <span className="order-detail-list-value">{getCustomerPhone(order)}</span>
                  </div>
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Shipping address</span>
                    <span className="order-detail-list-value">{getAddress(order)}</span>
                  </div>
                </div>
              </article>

              <article className="order-detail-card">
                <div className="order-detail-card-header">
                  <h2 className="order-detail-card-title">Payment Details</h2>
                </div>
                <div className="order-detail-list">
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Payment method</span>
                    <span className="order-detail-list-value">{getPaymentMethod(order)}</span>
                  </div>
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Payment status</span>
                    <span className={`order-detail-inline-badge order-detail-inline-badge--${paymentTone}`}>
                      {paymentStatus}
                    </span>
                  </div>
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Transaction ID</span>
                    <span className="order-detail-list-value">{getTransactionId(order)}</span>
                  </div>
                  <div className="order-detail-list-row">
                    <span className="order-detail-list-label">Collected amount</span>
                    <span className="order-detail-list-value">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </article>
            </section>

            <section className="order-items-card">
              <div className="order-detail-card-header">
                <div>
                  <h2 className="order-detail-card-title">Ordered Items</h2>
                  <p className="order-items-subtitle">Products included in this order.</p>
                </div>
              </div>

              <div className="order-items-table-wrap">
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Unit Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      const quantity = getItemQuantity(item);
                      const price = getItemPrice(item);
                      const itemImage = getItemImage(item);
                      const itemName = getItemName(item);

                      return (
                        <tr key={`${itemName}-${index}`}>
                          <td>
                            <div className="order-item-product">
                              {itemImage ? (
                                <img className="order-item-image" src={itemImage} alt={itemName} />
                              ) : (
                                <span className="order-item-image-fallback">{itemName}</span>
                              )}
                              <div className="order-item-copy">
                                <p className="order-item-name">{itemName}</p>
                              </div>
                            </div>
                          </td>
                          <td>{getItemSku(item)}</td>
                          <td>{formatCurrency(price)}</td>
                          <td>{quantity}</td>
                          <td>{formatCurrency(price * quantity)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </section>
    </AdminLayout>
  );
};

export default AdminOrderStatus;
