import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { AuthContext } from '../../context/AuthContext';
import { useOrders } from '../../context/OrdersContext';
import { formatOrderTime, formatCurrency } from '../../utils/formatters';
import './Dashboard.css';

/**
 * Restaurant Dashboard Component (Read-Only Overview)
 * 
 * Props:
 * - onViewAll: optional callback triggered when "View all orders" is clicked.
 *              Used for router navigation once react-router-dom is merged.
 */
const Dashboard = ({ onViewAll }) => {
  const { orders, recentOrders, stats, loadDemoOrders, clearOrders } = useOrders();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const currentUser = user || { name: 'Kitchen Staff', role: 'Staff' };

  // Links for staff navbar
  const staffLinks = [
    { label: 'Dashboard', href: '/restaurant' },
    { label: 'Orders', href: '/restaurant/orders' },
    { label: 'Inventory', href: '/restaurant/inventory' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  /**
   * Render StatusBadge according to shared component specs:
   * Maps 'processing' to supported status 'preparing' with visual label 'Processing'.
   */
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

  const handleViewAllClick = (e) => {
    e.preventDefault();
    if (onViewAll) {
      onViewAll();
    } else {
      navigate('/restaurant/orders');
    }
  };

  return (
    <div className="restaurant-dashboard-layout">
      {/* Shared Staff Navbar */}
      <Navbar
        brand="FARSLY"
        links={staffLinks}
        activePath="/restaurant"
        user={currentUser}
        showFavorites={false}
        showCart={false}
        showAuth={true}
        onLogout={handleLogout}
      />

      <main className="container page-shell">
        {/* Page Header */}
        <PageHeader
          eyebrow="RESTAURANT PORTAL"
          title="Restaurant Overview"
          description="Live snapshot of kitchen orders and preparation flow."
          action={
            /* TEMPORARY DEMO CONTROLS - for tester/evaluator to test populated & empty state */
            <div className="dashboard-demo-actions">
              <button
                type="button"
                className="dashboard-demo-btn"
                onClick={clearOrders}
                title="Simulate empty state (no orders)"
              >
                Clear Orders
              </button>
              <button
                type="button"
                className="dashboard-demo-btn dashboard-demo-btn--primary"
                onClick={loadDemoOrders}
                title="Reset to initial mock orders"
              >
                Reset Orders
              </button>
            </div>
          }
        />

        {/* 1. Stat Cards Grid */}
        <section className="dashboard-stats-grid" aria-label="Order Statistics">
          <div className="dashboard-stat-card">
            <span className="stat-card-label">Total Orders</span>
            <span className="stat-card-value">{stats.total}</span>
            <span className="stat-card-sub">All-time recorded</span>
          </div>

          <div className="dashboard-stat-card dashboard-stat-card--pending">
            <span className="stat-card-label">Pending</span>
            <span className="stat-card-value">{stats.pending}</span>
            <span className="stat-card-sub">Awaiting confirmation</span>
          </div>

          <div className="dashboard-stat-card dashboard-stat-card--processing">
            <span className="stat-card-label">Processing</span>
            <span className="stat-card-value">{stats.processing}</span>
            <span className="stat-card-sub">In kitchen preparation</span>
          </div>

          <div className="dashboard-stat-card dashboard-stat-card--completed">
            <span className="stat-card-label">Completed</span>
            <span className="stat-card-value">{stats.completed}</span>
            <span className="stat-card-sub">Fulfilled & served</span>
          </div>
        </section>

        {/* 2. Recent Orders Section */}
        <section className="dashboard-recent-section" aria-label="Recent Orders">
          <div className="dashboard-section-header">
            <div>
              <h2 className="dashboard-section-title">Recent Orders</h2>
              <p className="dashboard-section-subtitle">
                Showing the latest incoming orders (up to 5 most recent).
              </p>
            </div>

            {/* View all orders link */}
            <a
              href="/restaurant/orders"
              className="dashboard-view-all-link"
              onClick={handleViewAllClick}
            >
              View all orders &rarr;
            </a>
          </div>

          {/* Conditional Rendering: Empty State vs Recent Orders Table */}
          {orders.length === 0 ? (
            <div className="dashboard-empty-card">
              <EmptyState
                icon={
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M9 14h6"></path>
                    <path d="M9 18h6"></path>
                    <path d="M9 10h6"></path>
                  </svg>
                }
                title="No Orders Yet"
                description="The order queue is currently empty. Incoming customer orders will appear here automatically."
                action={
                  /* TEMPORARY DEMO ACTION - easily refill data */
                  <button
                    type="button"
                    className="dashboard-demo-btn dashboard-demo-btn--primary"
                    onClick={loadDemoOrders}
                  >
                    Load  Orders
                  </button>
                }
              />
            </div>
          ) : (
            <div className="dashboard-table-container">
              <table className="dashboard-orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="cell-order-id">
                        <span className="order-id-badge">{order.id}</span>
                      </td>
                      <td className="cell-customer">
                        <span className="customer-name">{order.customerName}</span>
                        {order.notes && (
                          <span className="customer-notes" title={order.notes}>
                            &ldquo;{order.notes}&rdquo;
                          </span>
                        )}
                      </td>
                      <td className="cell-type">
                        <span className="order-type-tag">{order.orderType}</span>
                      </td>
                      <td className="cell-items">
                        <ul className="order-items-compact">
                          {order.items.map((item, itemIdx) => (
                            <li key={item.id || `${order.id}-item-${itemIdx}`}>
                              <span className="item-qty">{item.quantity}x</span>{' '}
                              <span className="item-name">{item.name}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="cell-total">
                        {formatCurrency(order.totalPrice)}
                      </td>
                      <td className="cell-status">
                        {renderStatusBadge(order.status)}
                      </td>
                      <td className="cell-time">
                        {formatOrderTime(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
