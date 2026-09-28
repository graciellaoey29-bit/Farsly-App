import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import CardMenu from '../../components/CardMenu';
import EmptyState from '../../components/EmptyState';
import orders from '../../data/orders';
import menuData from '../../data/menuData';
import './CustomerDashboard.css';

const customerLinks = [
  { label: 'Home', href: '#/' },
  { label: 'Menu', href: '#/menu' },
  { label: 'Build Your Bowl', href: '#/build' },
  { label: 'Farsly Club', href: '#/club' },
];

// Mock authenticated customer (no auth system exists yet)
const currentUser = {
  id: 1,
  name: 'Grace',
  role: 'customer',
};

const CustomerDashboard = () => {
  const { favorites, toggleFavorite, isFavorite, addToCart, cartCount } = useContext(ShopContext);
  const navigate = useNavigate();

  // Filter orders for this customer
  const customerOrders = orders.filter((o) => o.customerId === currentUser.id);
  const activeOrder = customerOrders.find(
    (o) => o.status === 'preparing' || o.status === 'pending' || o.status === 'ready'
  );
  const recentOrders = customerOrders.filter((o) => o.status === 'completed').slice(0, 3);

  // Show up to 3 favorites on the dashboard
  const dashboardFavorites = favorites.slice(0, 3);

  // Find a reorderable item from the most recent completed order
  const lastCompleted = recentOrders[0];
  const reorderItem = lastCompleted
    ? menuData.find((m) => m.id === lastCompleted.items[0]?.menuItemId)
    : null;

  const statusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      preparing: 'Preparing',
      ready: 'Ready for Pickup',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  return (
    <div className="dashboard-page page">
      <Navbar
        brand="FARSLY"
        links={customerLinks}
        favoriteCount={favorites.length}
        cartCount={cartCount}
        showFavorites={true}
        showCart={true}
        showAuth={true}
        user={currentUser}
        onFavoriteClick={() => navigate('/favorites')}
        onCartClick={() => navigate('/cart')}
      />

      <main className="dashboard-main container">

        {/* ─── 1. Welcome ─── */}
        <section className="dashboard-welcome">
          <span className="dashboard-eyebrow">Welcome back</span>
          <h1 className="dashboard-greeting">
            Good to see you, {currentUser.name}.
          </h1>
          <p className="dashboard-subtitle">Ready for something fresh?</p>
        </section>

        {/* ─── 2. Active Order ─── */}
        <section className="dashboard-section">
          <h2 className="dashboard-section-title">Your Latest Order</h2>

          {activeOrder ? (
            <article className="dashboard-active-order">
              <div className="dashboard-order-top">
                <span className="dashboard-order-id">Order #{activeOrder.id}</span>
                <StatusBadge status={activeOrder.status}>
                  {statusLabel(activeOrder.status)}
                </StatusBadge>
              </div>

              <ul className="dashboard-order-items">
                {activeOrder.items.map((item) => (
                  <li key={item.menuItemId} className="dashboard-order-item">
                    <span className="dashboard-order-item-name">{item.name}</span>
                    <span className="dashboard-order-item-qty">× {item.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="dashboard-order-bottom">
                <span className="dashboard-order-total">{activeOrder.total}</span>
                {activeOrder.estimatedReady && (
                  <span className="dashboard-order-eta">
                    Est. ready: {activeOrder.estimatedReady}
                  </span>
                )}
              </div>
            </article>
          ) : (
            <EmptyState
              title="No active orders"
              description="Your next bowl is waiting to be made."
              action={
                <Button variant="outline" onClick={() => navigate('/menu')}>
                  Explore Menu
                </Button>
              }
            />
          )}
        </section>

        {/* ─── 3. Quick Actions ─── */}
        <section className="dashboard-section">
          <div className="dashboard-actions">
            <Link to="/menu" className="dashboard-action-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <div>
                <h3>Explore Menu</h3>
                <p>Discover something fresh.</p>
              </div>
            </Link>

            <Link to="/favorites" className="dashboard-action-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <div>
                <h3>Favorites</h3>
                <p>Your saved bowls.</p>
              </div>
            </Link>

            <Link to="/cart" className="dashboard-action-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <div>
                <h3>Your Bag</h3>
                <p>Review your order.</p>
              </div>
            </Link>
          </div>
        </section>

        {/* ─── 4. Favorite Meals ─── */}
        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">Your Favorites</h2>
            {favorites.length > 3 && (
              <Link to="/favorites" className="dashboard-view-all">View All</Link>
            )}
          </div>

          {favorites.length === 0 ? (
            <EmptyState
              title="No favorites yet"
              description="Save the Farsly meals you love and they'll appear here."
              action={
                <Button variant="outline" onClick={() => navigate('/menu')}>
                  Explore Menu
                </Button>
              }
            />
          ) : (
            <div className="dashboard-favorites-grid">
              {dashboardFavorites.map((item) => (
                <CardMenu
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  category={item.category}
                  name={item.name}
                  description={item.description}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  ingredients={item.ingredients}
                  price={item.price}
                  calories={item.calories}
                  protein={item.protein}
                  badge={item.badge}
                  isFavorite={isFavorite(item.id)}
                  onFavorite={() => toggleFavorite(item)}
                  onAddToCart={() => addToCart(item)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ─── 5. Quick Reorder ─── */}
        {reorderItem && (
          <section className="dashboard-section dashboard-reorder">
            <div className="dashboard-reorder-inner">
              {reorderItem.image && (
                <img
                  src={reorderItem.image}
                  alt={reorderItem.name}
                  className="dashboard-reorder-image"
                />
              )}
              <div className="dashboard-reorder-info">
                <span className="dashboard-eyebrow">Your recent favorite</span>
                <h3 className="dashboard-reorder-name">{reorderItem.name}</h3>
                <p className="dashboard-reorder-price">{reorderItem.price}</p>
                <Button variant="accent" onClick={() => addToCart(reorderItem)}>
                  Order Again
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* ─── 6. Recent Orders ─── */}
        <section className="dashboard-section">
          <h2 className="dashboard-section-title">Recent Orders</h2>

          {recentOrders.length === 0 ? (
            <EmptyState
              title="No past orders"
              description="Once you place your first order, it'll show up here."
              action={
                <Button variant="outline" onClick={() => navigate('/menu')}>
                  Explore Menu
                </Button>
              }
            />
          ) : (
            <div className="dashboard-orders-list">
              {recentOrders.map((order) => (
                <article key={order.id} className="dashboard-order-card">
                  <div className="dashboard-order-top">
                    <span className="dashboard-order-id">#{order.id}</span>
                    <StatusBadge status={order.status}>
                      {statusLabel(order.status)}
                    </StatusBadge>
                  </div>
                  <p className="dashboard-order-summary">
                    {order.items.map((i) => i.name).join(', ')}
                  </p>
                  <div className="dashboard-order-bottom">
                    <span className="dashboard-order-total">{order.total}</span>
                    <span className="dashboard-order-date">{order.createdAt}</span>
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

export default CustomerDashboard;
