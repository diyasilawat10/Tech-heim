import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminOrders.css';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import { getAllOrders } from '../../../api/ordersApi';
import { demoOrders } from '../../../constants/demoOrders';
import arrowDownIcon from '../../../assets/icons/arrow-down.svg';
import arrowCircleRightIcon from '../../../assets/icons/arrow-circle-right.svg';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"%3E%3Crect width="160" height="160" rx="16" fill="%23FFFFFF"/%3E%3Cpath d="M38 108l24-24 16 18 14-14 24 20" stroke="%239E9E9E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3Ccircle cx="62" cy="54" r="10" fill="%23D9D9D9"/%3E%3C/svg%3E';

const normalizeText = (value, fallback = 'N/A') => {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return fallback;
};

const getOrderId = (order) => normalizeText(order?.id ?? order?._id ?? order?.orderId, 'N/A');

const getCustomerName = (order) =>
  normalizeText(
    order?.user?.name ??
      order?.user?.fullName ??
      order?.customer?.name ??
      [order?.user?.firstName, order?.user?.lastName].filter(Boolean).join(' '),
    'N/A'
  );

const getOrderStatus = (order) =>
  normalizeText(order?.status ?? order?.orderStatus ?? order?.deliveryStatus, 'N/A');

const ORDER_TABS = [
  { key: 'current', label: 'Current' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'canceled', label: 'Canceled' },
  { key: 'returned', label: 'Returned' },
];

const getTabKeyForOrder = (order) => {
  const status = getOrderStatus(order).toLowerCase();

  if (status.includes('deliver')) return 'delivered';
  if (status.includes('cancel')) return 'canceled';
  if (status.includes('return')) return 'returned';
  return 'current';
};

const getAddress = (order) => {
  const address = order?.address ?? order?.shippingAddress ?? order?.user?.address ?? order?.customer?.address;

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

const formatDate = (value) => {
  if (!value) return 'N/A';

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return normalizeText(value, 'N/A');

  return parsed.toLocaleDateString('en-CA');
};

const formatCurrency = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric)
    ? numeric.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : 'N/A';
};

const getOrderTotal = (order) => order?.total ?? order?.totalAmount ?? order?.amount;

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
  PLACEHOLDER_IMAGE;

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [activeTab, setActiveTab] = useState('current');
  const [openAddressOrderId, setOpenAddressOrderId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setPageError('');

    try {
      const data = await getAllOrders();
      setOrders(Array.isArray(data) && data.length > 0 ? data : demoOrders);
    } catch (err) {
      setOrders(demoOrders);
      setPageError(err.message || 'Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const tabCounts = ORDER_TABS.reduce((accumulator, tab) => {
    accumulator[tab.key] = orders.filter((order) => getTabKeyForOrder(order) === tab.key).length;
    return accumulator;
  }, {});

  const visibleOrders = orders.filter((order) => getTabKeyForOrder(order) === activeTab);

  return (
    <AdminLayout
      pageClassName="admin-orders-page"
      profileName={JSON.parse(localStorage.getItem('user') || '{}').name}
    >
      <section className="orders-page-content">
        <header className="orders-page-header">
          <h1 className="orders-page-title">Orders</h1>
          <p className="orders-page-subtitle">Manage, review, and track order activity.</p>
        </header>

        {!loading && orders.length > 0 && (
          <div className="orders-tabs-wrap">
            <div className="orders-tabs">
              {ORDER_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`orders-tab ${activeTab === tab.key ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span>{tab.label}</span>
                  <span className={`orders-tab-count ${activeTab === tab.key ? 'is-active' : ''}`}>
                    {tabCounts[tab.key] ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="orders-status-block">
            <p className="orders-feedback">Loading orders...</p>
          </div>
        )}

        {!loading && pageError && orders.length === 0 && (
          <div className="orders-status-block">
            <p className="orders-feedback orders-feedback-error">{pageError}</p>
            <button type="button" className="orders-retry-btn" onClick={fetchOrders}>
              Retry
            </button>
          </div>
        )}

        {!loading && orders.length === 0 && !pageError && (
          <div className="orders-empty-state">
            <h3 className="orders-empty-title">No orders found</h3>
            <p className="orders-empty-subtitle">No order records are available right now.</p>
          </div>
        )}

        {!loading && visibleOrders.length === 0 && !pageError && (
          <div className="orders-empty-state">
            <h3 className="orders-empty-title">No orders in this tab</h3>
            <p className="orders-empty-subtitle">There are no matching order records right now.</p>
          </div>
        )}

        {!loading && visibleOrders.length > 0 && (
          <div className="orders-list">
            {visibleOrders.map((order) => {
              const orderId = getOrderId(order);
              const items = getOrderItems(order);
              const status = getOrderStatus(order);

              return (
                <article key={orderId} className="orders-card">
                  <div className="orders-card-summary">
                    <div className="orders-card-meta">
                      <span className="orders-card-label">Order code</span>
                      <strong className="orders-card-value">#{orderId}</strong>
                    </div>
                    <div className="orders-card-meta">
                      <span className="orders-card-label">Placed on</span>
                      <strong className="orders-card-value">
                        {formatDate(order?.createdAt ?? order?.created_at ?? order?.date)}
                      </strong>
                    </div>
                    <div className="orders-card-meta">
                      <span className="orders-card-label">Total</span>
                      <strong className="orders-card-value">{formatCurrency(getOrderTotal(order))}</strong>
                    </div>
                    <div className="orders-card-meta">
                      <span className="orders-card-label">Sent to</span>
                      <button
                        type="button"
                        className="orders-address-toggle"
                        onClick={() =>
                          setOpenAddressOrderId((current) => (current === orderId ? null : orderId))
                        }
                      >
                        <span className="orders-card-value orders-card-value--single-line">
                          {getCustomerName(order)}
                        </span>
                        <img
                          className={`orders-address-arrow ${openAddressOrderId === orderId ? 'is-open' : ''}`}
                          src={arrowDownIcon}
                          alt=""
                          aria-hidden="true"
                        />
                      </button>
                      {openAddressOrderId === orderId && (
                        <div className="orders-address-popover">
                          <span className="orders-address-popover-arrow" aria-hidden="true" />
                          <span className="orders-address-text">{getAddress(order)}</span>
                        </div>
                      )}
                    </div>
                    <div className="orders-card-meta orders-card-meta--status">
                      <span className="orders-card-label orders-card-label--muted">Status</span>
                      <span className="orders-card-status-text">{status}</span>
                    </div>
                    <div className="orders-card-action">
                      <button
                        type="button"
                        className="orders-link-btn"
                        onClick={() => navigate(`/admin/orders/${orderId}`)}
                      >
                        Order Status
                        <img className="orders-link-arrow" src={arrowCircleRightIcon} alt="" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="orders-card-items">
                    {items.slice(0, 6).map((item, index) => (
                      <div key={`${orderId}-${index}`} className="orders-item-tile">
                        <img
                          className="orders-item-image"
                          src={getItemImage(item)}
                          alt=""
                          onError={(event) => {
                            event.currentTarget.src = PLACEHOLDER_IMAGE;
                          }}
                        />
                      </div>
                    ))}
                    {items.length > 6 && (
                      <div className="orders-item-tile orders-item-tile--count">+{items.length - 6}</div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </AdminLayout>
  );
};

export default AdminOrders;
