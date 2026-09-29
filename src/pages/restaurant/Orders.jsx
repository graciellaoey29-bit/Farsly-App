import { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { AuthContext } from '../../context/AuthContext';
import { useOrders } from '../../context/OrdersContext';
import { formatCurrency, formatOrderTime } from '../../utils/formatters';
import './Orders.css';

const formatOrderDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short'
  });
};

const getOrderTimestamp = (createdAt) => {
  const timestamp = new Date(createdAt).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'processing', label: 'Processing' },
  { key: 'completed', label: 'Completed' }
];

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { orders, stats, updateOrderStatus } = useOrders();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // TODO: Connect this static staff identity to auth data when it is available.
  const staffUser = { name: 'Kitchen Staff', role: 'Staff' };

  const staffLinks = [
    { label: 'Dashboard', href: '/restaurant' },
    { label: 'Orders', href: '/restaurant/orders' },
    { label: 'Inventory', href: '/restaurant/inventory' }
  ];

  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => getOrderTimestamp(b.createdAt) - getOrderTimestamp(a.createdAt)),
    [orders]
  );

  const filteredOrders = useMemo(
    () => activeFilter === 'all'
      ? sortedOrders
      : sortedOrders.filter((order) => order.status === activeFilter),
    [activeFilter, sortedOrders]
  );

  const getTabCount = (key) => (key === 'all' ? orders.length : stats[key] ?? 0);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <StatusBadge status="pending">Pending</StatusBadge>;
      case 'processing':
        return <StatusBadge status="preparing">Processing</StatusBadge>;
      case 'completed':
        return <StatusBadge status="completed">Completed</StatusBadge>;
      default:
        return <StatusBadge status={status}>{status}</StatusBadge>;
    }
  };

  const renderOrderAction = (order) => {
    if (order.status === 'pending') {
      return (
        <button
          type="button"
          className="farsly-orders-action-button"
          aria-label={`Start preparing ${order.id} for ${order.customerName}`}
          onClick={() => updateOrderStatus(order.id, 'processing')}
        >
          Start Preparing
        </button>
      );
    }

    if (order.status === 'processing') {
      return (
        <button
          type="button"
          className="farsly-orders-action-button farsly-orders-action-button--completed"
          aria-label={`Mark ${order.id} for ${order.customerName} as completed`}
          onClick={() => updateOrderStatus(order.id, 'completed')}
        >
          Mark as Completed
        </button>
      );
    }

    if (order.status === 'completed') {
      return <span className="farsly-orders-completed-label">&#10003; Completed</span>;
    }

    return null;
  };

  const activeTab = filterTabs.find((tab) => tab.key === activeFilter);
  const activeTabLabel = activeTab?.label ?? '';

  return (
    <div className="farsly-orders-layout">
      <Navbar
        brand="FARSLY"
        links={staffLinks}
        activePath="/restaurant/orders"
        user={staffUser}
        showFavorites={false}
        showCart={false}
        showAuth={true}
        onLogout={handleLogout}
      />

      <main className="container page-shell">
        <PageHeader
          eyebrow="RESTAURANT PORTAL"
          title="Orders Management"
          description="Review incoming orders and keep the kitchen flow moving."
        />

        <section className="farsly-orders-section" aria-label="Order management">
          <div className="farsly-orders-filter-tabs" role="group" aria-label="Filter orders by status">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`farsly-orders-filter-tab ${activeFilter === tab.key ? 'farsly-orders-filter-tab--active' : ''}`}
                aria-pressed={activeFilter === tab.key}
                onClick={() => setActiveFilter(tab.key)}
              >
                {tab.label}
                <span className="farsly-orders-filter-count">{getTabCount(tab.key)}</span>
              </button>
            ))}
          </div>

          {orders.length === 0 ? (
            <div className="farsly-orders-empty-card">
              <EmptyState
                title="No Orders Yet"
                description="The order queue is currently empty. Incoming customer orders will appear here automatically."
              />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="farsly-orders-empty-card">
              <EmptyState
                title={`No ${activeTabLabel} Orders`}
                description={`There are no ${activeTabLabel.toLowerCase()} orders to show right now.`}
              />
            </div>
          ) : (
            <div className="farsly-orders-list">
              {filteredOrders.map((order) => (
                <article className="farsly-orders-card" key={order.id}>
                  <div className="farsly-orders-card-header">
                    <div>
                      <span className="farsly-orders-id">{order.id}</span>
                      <h2 className="farsly-orders-customer-name">{order.customerName}</h2>
                    </div>
                    {renderStatusBadge(order.status)}
                  </div>

                  <div className="farsly-orders-meta">
                    <span>{order.orderType}</span>
                    <span aria-hidden="true">&bull;</span>
                    <time dateTime={order.createdAt}>
                      {formatOrderDate(order.createdAt)} &middot; {formatOrderTime(order.createdAt)}
                    </time>
                  </div>

                  <ul className="farsly-orders-items">
                    {order.items.map((item, index) => (
                      <li className="farsly-orders-item" key={item.id || `${order.id}-item-${index}`}>
                        <span><strong>{item.quantity}&times;</strong> {item.name}</span>
                        <span>{formatCurrency(item.price)}</span>
                      </li>
                    ))}
                  </ul>

                  {order.notes && <p className="farsly-orders-notes">Note: {order.notes}</p>}

                  <div className="farsly-orders-card-footer">
                    <span className="farsly-orders-total-label">Total</span>
                    <strong className="farsly-orders-total">{formatCurrency(order.totalPrice)}</strong>
                    <div className="farsly-orders-action">{renderOrderAction(order)}</div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Orders;
