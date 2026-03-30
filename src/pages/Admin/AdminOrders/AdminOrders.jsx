import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './AdminOrders.css';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import AdminModal from '../../../components/Admin/AdminModal/AdminModal';
import { getAllOrders, createOrder, updateOrderStatus, deleteOrder } from '../../../api/ordersApi';
import { getUsers } from '../../../api/usersApi';

const STATUS_OPTIONS = [
  { id: 'placed', name: 'Placed' },
  { id: 'shipped', name: 'Shipped' },
  { id: 'delivered', name: 'Delivered' },
  { id: 'cancelled', name: 'Cancelled' },
];

const emptyCreateForm = () => ({
  userId: '',
  status: 'placed',
});

const getOrderId = (order) => order?.id ?? order?._id ?? order?.orderId ?? '';
const getOrderStatus = (order) =>
  String(order?.status ?? order?.orderStatus ?? order?.order_status ?? order?.deliveryStatus ?? 'placed').toLowerCase();
const getOrderCustomer = (order) => order?.user ?? order?.customer ?? {};
const getOrderItems = (order) => order?.items ?? order?.orderItems ?? order?.products ?? [];
const getItemName = (item) => item?.productName ?? item?.name ?? item?.title ?? item?.product?.title ?? item?.product?.name ?? 'Item';
const getItemQuantity = (item) => Number(item?.quantity ?? item?.qty ?? 1) || 1;
const getItemPrice = (item) => Number(item?.price ?? item?.unitPrice ?? item?.product?.price ?? 0) || 0;
const getUserId = (user) => user?.id ?? user?._id ?? '';
const DRAFT_KEY = 'techheim_draft_order';
const getInitials = (value = '') =>
  String(value)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'TH';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

const formatDate = (value) => {
  if (!value) return 'N/A';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return 'N/A';
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getOrderTotal = (order) => {
  const total = Number(order?.total ?? order?.totalAmount ?? order?.amount);
  if (Number.isFinite(total) && total > 0) return total;
  return getOrderItems(order).reduce((sum, item) => sum + getItemPrice(item) * getItemQuantity(item), 0);
};

const buildStatusMap = (orderList) =>
  orderList.reduce((acc, order) => {
    acc[getOrderId(order)] = getOrderStatus(order);
    return acc;
  }, {});

const scoreCustomerOption = (option, query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return 0;

  const haystacks = [option.label, option.email, option.name].filter(Boolean).map((value) => value.toLowerCase());

  if (haystacks.some((value) => value === normalizedQuery)) return 100;
  if (haystacks.some((value) => value.startsWith(normalizedQuery))) return 80;
  if (haystacks.some((value) => value.includes(normalizedQuery))) return 60;

  return 0;
};

const SearchableCustomerField = ({ value, options, error, onChange }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = React.useRef(null);

  const selectedOption = useMemo(
    () => options.find((option) => String(option.id) === String(value)) || null,
    [options, value]
  );

  useEffect(() => {
    if (selectedOption && !isOpen) {
      setQuery(selectedOption.label);
    }
    if (!selectedOption && !isOpen) {
      setQuery('');
    }
  }, [selectedOption, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;

    return [...options]
      .map((option) => ({
        ...option,
        score: scoreCustomerOption(option, query),
      }))
      .filter((option) => option.score > 0)
      .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));
  }, [options, query]);

  return (
    <div ref={rootRef} className={`modal-input-group modal-input-group--search ${error ? 'error' : ''} ${isOpen ? 'is-open' : ''}`}>
      <div className="modal-label-container">
        <span className="modal-label-segment left"></span>
        <label className="modal-input-label">Customer</label>
        <span className="modal-label-segment fill"></span>
      </div>
      <div className={`modal-input-wrapper modal-search-select ${isOpen ? 'open' : ''}`}>
        <input
          type="text"
          className="modal-field-input"
          value={query}
          placeholder="Search by name or email"
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            if (value) onChange('');
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setIsOpen(false);
          }}
        />
        <button
          type="button"
          className="modal-search-toggle"
          aria-label="Toggle customer suggestions"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {isOpen ? (
          <div className="modal-search-results">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`modal-search-option ${String(option.id) === String(value) ? 'active' : ''}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onChange(option.id);
                    setQuery(option.label);
                    setIsOpen(false);
                  }}
                >
                  <span>{option.name}</span>
                  <small>{option.email}</small>
                </button>
              ))
            ) : (
              <div className="modal-search-empty">No matching customers found.</div>
            )}
          </div>
        ) : null}
      </div>
      {error ? <p className="modal-supporting-text">{error}</p> : null}
    </div>
  );
};

const OrderStatusChip = ({ status }) => {
  const normalizedStatus = getOrderStatus({ status });
  const label = STATUS_OPTIONS.find((option) => option.id === normalizedStatus)?.name ?? status;
  return <span className={`admin-order-chip admin-order-chip--${normalizedStatus}`}>{label}</span>;
};

const OrdersListCard = ({
  order,
  inlineStatus,
  savingStatusId,
  inlineError,
  onStatusChange,
  onSaveStatus,
  onEditStatus,
  onDelete,
}) => {
  const orderId = getOrderId(order);
  const status = getOrderStatus(order);
  const items = getOrderItems(order);
  const customer = getOrderCustomer(order);
  const address = order?.address ?? order?.shippingAddress ?? customer?.address;
  const addressLine =
    typeof address === 'string'
      ? address
      : [address?.line1 ?? address?.street, address?.city, address?.state, address?.zip ?? address?.postalCode]
          .filter(Boolean)
          .join(', ') || 'No address';

  return (
    <article className="admin-order-card">
      <div className="admin-order-card__top">
        <div className="admin-order-card__identity">
          <div className="admin-order-card__headline">
            <h3>Order #{orderId}</h3>
            <OrderStatusChip status={status} />
          </div>
          <p>{customer?.name ?? customer?.fullName ?? 'Unknown customer'}</p>
        </div>

        <div className="admin-order-card__meta">
          <span>Placed {formatDate(order?.createdAt ?? order?.created_at ?? order?.date)}</span>
          <strong>{formatCurrency(getOrderTotal(order))}</strong>
        </div>
      </div>

      <div className="admin-order-card__grid">
        <div className="admin-order-card__section">
          <span className="admin-order-card__label">Contact</span>
          <p>{customer?.email ?? order?.email ?? 'No email'}</p>
          <p>{customer?.phone ?? customer?.phoneNumber ?? order?.phone ?? 'No phone'}</p>
        </div>

        <div className="admin-order-card__section">
          <span className="admin-order-card__label">Shipping</span>
          <p>{addressLine}</p>
        </div>

        <div className="admin-order-card__section">
          <span className="admin-order-card__label">Items</span>
          <ul className="admin-order-card__items">
            {items.slice(0, 3).map((item, index) => (
              <li key={`${getItemName(item)}-${index}`}>
                <span>{getItemName(item)}</span>
                <span>x{getItemQuantity(item)}</span>
              </li>
            ))}
            {items.length > 3 ? <li className="admin-order-card__more">+{items.length - 3} more item(s)</li> : null}
          </ul>
          <p>{items.reduce((sum, item) => sum + getItemQuantity(item), 0)} item(s) total</p>
        </div>
      </div>

      <div className="admin-order-card__footer">
        <div className="admin-order-card__status-tools">
          <label className="admin-order-card__label" htmlFor={`order-status-${orderId}`}>
            Update status
          </label>
          <div className="admin-order-card__status-row">
            <select
              id={`order-status-${orderId}`}
              className="admin-order-card__select"
              value={inlineStatus}
              onChange={(event) => onStatusChange(orderId, event.target.value)}
              disabled={savingStatusId === orderId}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="admin-order-card__save-btn"
              onClick={() => onSaveStatus(order)}
              disabled={savingStatusId === orderId || inlineStatus === status}
            >
              {savingStatusId === orderId ? 'Saving...' : 'Save'}
            </button>
            <button type="button" className="admin-order-card__ghost-btn" onClick={() => onEditStatus(order)}>
              More actions
            </button>
            <button type="button" className="admin-order-card__danger-btn" onClick={() => onDelete(order)}>
              Delete
            </button>
          </div>
          {inlineError ? <p className="admin-order-card__error">{inlineError}</p> : null}
        </div>
      </div>
    </article>
  );
};

const DraftOrderReview = ({
  draftOrder,
  submitting,
  draftError,
  onQuantityChange,
  onQuantityAdjust,
  onRemoveItem,
  onStatusChange,
  onBackToProducts,
  onCancel,
  onSubmit,
}) => {
  const draftTotal = draftOrder.items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  return (
    <div className="orders-draft-review">
      <div className="orders-draft-review__topbar">
        <button type="button" className="orders-draft-review__back" onClick={onBackToProducts}>
          Back To Products
        </button>
      </div>
      <section className="orders-draft-card">
        <div className="orders-draft-card__header">
          <div className="orders-draft-card__customer">
            <div className="orders-draft-card__avatar">{getInitials(draftOrder.user?.name ?? draftOrder.user?.fullName)}</div>
            <div>
              <p className="orders-draft-card__eyebrow">Order Summary</p>
              <h3 className="orders-draft-card__title">{draftOrder.user?.name ?? draftOrder.user?.fullName ?? 'Selected customer'}</h3>
              <p className="orders-draft-card__subtitle">{draftOrder.user?.email ?? 'No email available'}</p>
            </div>
          </div>
          <div className="orders-draft-card__summary">
            <span>Total Amount</span>
            <strong>{formatCurrency(draftTotal)}</strong>
          </div>
        </div>

        <div className="orders-draft-card__controls">
          <div className="orders-draft-card__status-picker">
            <label htmlFor="draft-order-status">Order status</label>
            <select
              id="draft-order-status"
              value={draftOrder.status}
              onChange={(event) => onStatusChange(event.target.value)}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="orders-draft-items">
          <div className="orders-draft-items__top">
            <p className="orders-draft-items__heading">Selected Products [{draftOrder.items.length}]</p>
          </div>
          {draftOrder.items.map((item) => (
            <article key={String(item.id)} className="orders-draft-item">
              <div className="orders-draft-item__copy">
                <h4>{item.name}</h4>
                <p>Unit price {formatCurrency(Number(item.price) || 0)}</p>
              </div>
              <div className="orders-draft-item__actions">
                <div className="orders-draft-item__stepper">
                  <span>Qty</span>
                  <button type="button" onClick={() => onQuantityAdjust(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>
                    -
                  </button>
                  <input
                    id={`draft-qty-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => onQuantityChange(item.id, event.target.value)}
                  />
                  <button type="button" onClick={() => onQuantityAdjust(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>
                    +
                  </button>
                </div>
                <strong>{formatCurrency((Number(item.price) || 0) * (Number(item.quantity) || 1))}</strong>
                <button type="button" className="orders-draft-item__remove" onClick={() => onRemoveItem(item.id)} aria-label={`Remove ${item.name}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M9 3.75h6a1 1 0 0 1 1 1V6h3a.75.75 0 0 1 0 1.5h-1.05l-.7 10.52A2.25 2.25 0 0 1 15 20.25H9a2.25 2.25 0 0 1-2.25-2.23L6.05 7.5H5a.75.75 0 0 1 0-1.5h3V4.75a1 1 0 0 1 1-1Zm5.5 2.25V5.25h-5V6h5ZM8.25 7.5l.69 10.42a.75.75 0 0 0 .75.73H15a.75.75 0 0 0 .75-.73l.69-10.42H8.25Zm2.5 2.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75Zm3.25 0a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {draftError ? <p className="orders-draft-card__error">{draftError}</p> : null}

        <div className="orders-draft-card__footer">
          <button type="button" className="orders-draft-card__primary" onClick={onSubmit} disabled={submitting}>
            {submitting ? 'Saving Order...' : 'Save Order'}
          </button>
          <button type="button" className="orders-draft-card__ghost" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [createForm, setCreateForm] = useState(emptyCreateForm());
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [modalError, setModalError] = useState('');
  const [inlineStatusMap, setInlineStatusMap] = useState({});
  const [savingStatusId, setSavingStatusId] = useState('');
  const [inlineStatusErrorId, setInlineStatusErrorId] = useState('');
  const [inlineStatusError, setInlineStatusError] = useState('');
  const [draftOrder, setDraftOrder] = useState(null);
  const [draftError, setDraftError] = useState('');
  const [submittingDraft, setSubmittingDraft] = useState(false);

  const isFinalizeMode = searchParams.get('action') === 'finalize';

  const syncOrders = (orderList) => {
    setOrders(orderList);
    setInlineStatusMap(buildStatusMap(orderList));
  };

  const loadOrders = async () => {
    const data = await getAllOrders();
    const ordersArray = Array.isArray(data) ? data : data?.data || data?.orders || [];
    syncOrders(ordersArray || []);
  };

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setPageError('');
        const [ordersData, usersData] = await Promise.all([getAllOrders(), getUsers()]);
        const ordersArray = Array.isArray(ordersData) ? ordersData : ordersData?.data || ordersData?.orders || [];
        syncOrders(ordersArray || []);
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (error) {
        console.error('Failed to load orders page:', error);
        setPageError(error.message || 'Failed to load orders data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, []);

  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    setDraftOrder(savedDraft ? JSON.parse(savedDraft) : null);
  }, [isFinalizeMode]);

  const customerOptions = useMemo(
    () =>
      users
        .filter((user) => String(user.role).toLowerCase() !== 'admin')
        .map((user) => ({
          id: String(getUserId(user)),
          name: user.name,
          email: user.email,
          label: `${user.name} (${user.email})`,
        })),
    [users]
  );

  const openCreate = () => {
    setCreateForm(emptyCreateForm());
    setErrors({});
    setModalError('');
    setModalType('create');
  };

  const openStatus = (order) => {
    setCurrent(order);
    setCreateForm((prev) => ({ ...prev, status: getOrderStatus(order) }));
    setErrors({});
    setModalError('');
    setModalType('status');
  };

  const openDelete = (order) => {
    setCurrent(order);
    setModalError('');
    setModalType('delete');
  };

  const closeModal = () => {
    setModalType(null);
    setCurrent(null);
    setCreateForm(emptyCreateForm());
    setErrors({});
    setModalError('');
  };

  const handleCreateFieldChange = (field, value) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleStartCreateFlow = () => {
    const nextErrors = {};
    if (!createForm.userId) nextErrors.userId = 'Select a customer first';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const selectedUser = users.find((user) => String(getUserId(user)) === String(createForm.userId));
    if (!selectedUser) {
      setModalError('Selected customer was not found.');
      return;
    }

    const draft = {
      userId: Number(createForm.userId),
      user: {
        id: getUserId(selectedUser),
        name: selectedUser.name,
        fullName: selectedUser.name,
        email: selectedUser.email,
      },
      status: createForm.status,
      items: [],
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    closeModal();
    navigate('/admin/products?mode=select-for-order');
  };

  const clearDraftOrder = () => {
    localStorage.removeItem(DRAFT_KEY);
    setDraftOrder(null);
    setDraftError('');
    if (isFinalizeMode) {
      setSearchParams({});
    }
  };

  const updateDraftOrder = (updater) => {
    setDraftOrder((prev) => {
      if (!prev) return prev;
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleDraftQuantityChange = (itemId, value) => {
    const quantity = Math.max(1, Number(value) || 1);
    updateDraftOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        String(item.id) === String(itemId) ? { ...item, quantity } : item
      ),
    }));
  };

  const handleDraftQuantityAdjust = (itemId, delta) => {
    updateDraftOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        String(item.id) === String(itemId)
          ? { ...item, quantity: Math.max(1, (Number(item.quantity) || 1) + delta) }
          : item
      ),
    }));
  };

  const handleDraftRemoveItem = (itemId) => {
    updateDraftOrder((prev) => ({
      ...prev,
      items: prev.items.filter((item) => String(item.id) !== String(itemId)),
    }));
  };

  const handleDraftStatusChange = (status) => {
    updateDraftOrder((prev) => ({ ...prev, status }));
  };

  const handleBackToProducts = () => {
    navigate('/admin/products?mode=select-for-order');
  };

  const handleSubmitDraftOrder = async () => {
    if (!draftOrder?.userId || !draftOrder?.items?.length) {
      setDraftError('Choose at least one product before creating the order.');
      return;
    }

    setSubmittingDraft(true);
    setDraftError('');

    try {
      await createOrder(draftOrder.userId, {
        status: draftOrder.status || 'placed',
        items: draftOrder.items.map((item) => ({
          productId: Number(item.id),
          quantity: Number(item.quantity) || 1,
        })),
      });

      clearDraftOrder();
      await loadOrders();
    } catch (error) {
      setDraftError(error.message || 'Failed to create order.');
    } finally {
      setSubmittingDraft(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!current) return;
    setSaving(true);
    setModalError('');

    try {
      await updateOrderStatus(getOrderId(current), createForm.status);
      setOrders((prev) =>
        prev.map((order) =>
          getOrderId(order) === getOrderId(current)
            ? { ...order, status: createForm.status, orderStatus: createForm.status }
            : order
        )
      );
      setInlineStatusMap((prev) => ({ ...prev, [getOrderId(current)]: createForm.status }));
      closeModal();
    } catch (error) {
      setModalError(error.message || 'Failed to update order status.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!current) return;
    setSaving(true);
    setModalError('');

    try {
      await deleteOrder(getOrderId(current));
      setOrders((prev) => prev.filter((order) => getOrderId(order) !== getOrderId(current)));
      setInlineStatusMap((prev) => {
        const next = { ...prev };
        delete next[getOrderId(current)];
        return next;
      });
      closeModal();
    } catch (error) {
      setModalError(error.message || 'Failed to delete order.');
    } finally {
      setSaving(false);
    }
  };

  const handleInlineStatusChange = (orderId, value) => {
    setInlineStatusMap((prev) => ({ ...prev, [orderId]: value }));
    if (inlineStatusErrorId === orderId) {
      setInlineStatusErrorId('');
      setInlineStatusError('');
    }
  };

  const handleInlineStatusSave = async (order) => {
    const orderId = getOrderId(order);
    const nextStatus = inlineStatusMap[orderId] ?? getOrderStatus(order);
    if (!orderId || nextStatus === getOrderStatus(order)) return;

    setSavingStatusId(orderId);
    setInlineStatusErrorId('');
    setInlineStatusError('');

    try {
      await updateOrderStatus(orderId, nextStatus);
      setOrders((prev) =>
        prev.map((item) =>
          getOrderId(item) === orderId ? { ...item, status: nextStatus, orderStatus: nextStatus } : item
        )
      );
    } catch (error) {
      setInlineStatusErrorId(orderId);
      setInlineStatusError(error.message || 'Failed to update order status.');
    } finally {
      setSavingStatusId('');
    }
  };

  return (
    <>
      <AdminLayout pageClassName="admin-orders-page">
        <section className="admin-orders-content">
          <header className="section-header">
            <div className="section-heading">
              <h2 className="section-title">Orders</h2>
              <p className="section-subtitle">Manage and track customer orders.</p>
            </div>
            <div className="section-header-actions">
              <button type="button" className="add-order-btn" onClick={openCreate} disabled={loading || saving}>
                + Create Order
              </button>
            </div>
          </header>

          {isFinalizeMode && draftOrder ? (
            <DraftOrderReview
              draftOrder={draftOrder}
              submitting={submittingDraft}
              draftError={draftError}
              onQuantityChange={handleDraftQuantityChange}
              onQuantityAdjust={handleDraftQuantityAdjust}
              onRemoveItem={handleDraftRemoveItem}
              onStatusChange={handleDraftStatusChange}
              onBackToProducts={handleBackToProducts}
              onCancel={clearDraftOrder}
              onSubmit={handleSubmitDraftOrder}
            />
          ) : null}

          {pageError ? (
            <div className="orders-error-block">
              <p className="orders-error-message">{pageError}</p>
            </div>
          ) : null}

          {loading ? (
            <div className="orders-loading-state">
              <p className="orders-loading-message">Loading orders...</p>
            </div>
          ) : null}

          {!loading && orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <OrdersListCard
                  key={getOrderId(order)}
                  order={order}
                  inlineStatus={inlineStatusMap[getOrderId(order)] ?? getOrderStatus(order)}
                  savingStatusId={savingStatusId}
                  inlineError={inlineStatusErrorId === getOrderId(order) ? inlineStatusError : ''}
                  onStatusChange={handleInlineStatusChange}
                  onSaveStatus={handleInlineStatusSave}
                  onEditStatus={openStatus}
                  onDelete={openDelete}
                />
              ))}
            </div>
          ) : null}

          {!loading && orders.length === 0 ? (
            <div className="orders-empty-state">
              <h3 className="orders-empty-title">No orders found</h3>
              <p className="orders-empty-subtitle">Start a new order by choosing a customer, then add products.</p>
            </div>
          ) : null}
        </section>
      </AdminLayout>

      {modalType === 'create' ? (
        <AdminModal
          isOpen
          onClose={closeModal}
          onSave={handleStartCreateFlow}
          saveDisabled={saving}
          saveText="Choose Products"
          title="Add New Order"
          className="orders-create-modal"
        >
          {modalError ? <p className="orders-modal-error">{modalError}</p> : null}
          <SearchableCustomerField
            value={createForm.userId}
            error={errors.userId}
            onChange={(value) => handleCreateFieldChange('userId', value)}
            options={customerOptions}
          />
          <AdminModal.Select
            label="Initial Status"
            value={createForm.status}
            onChange={(value) => handleCreateFieldChange('status', value)}
            options={STATUS_OPTIONS}
          />
        </AdminModal>
      ) : null}

      {modalType === 'status' && current ? (
        <AdminModal
          isOpen
          onClose={closeModal}
          onSave={handleStatusUpdate}
          saveDisabled={saving}
          saveText={saving ? 'Saving...' : 'Update'}
          title="Update Order Status"
        >
          {modalError ? <p className="orders-modal-error">{modalError}</p> : null}
          <p className="orders-modal-copy">
            Order ID: <strong>#{getOrderId(current)}</strong>
          </p>
          <AdminModal.Select
            label="New Status"
            value={createForm.status}
            onChange={(value) => handleCreateFieldChange('status', value)}
            options={STATUS_OPTIONS}
          />
        </AdminModal>
      ) : null}

      {modalType === 'delete' && current ? (
        <AdminModal
          isOpen
          onClose={closeModal}
          onSave={handleDelete}
          title="Delete Order"
          saveText={saving ? 'Deleting...' : 'Delete'}
          saveDisabled={saving}
          variant="delete"
        >
          {modalError ? <p className="orders-modal-error orders-modal-error--center">{modalError}</p> : null}
          <p className="orders-modal-delete-copy">
            Are you sure you want to delete order <strong>#{getOrderId(current)}</strong>? This action cannot be undone.
          </p>
        </AdminModal>
      ) : null}
    </>
  );
};

export default AdminOrders;
