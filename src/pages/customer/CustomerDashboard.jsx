import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import CardMenu from '../../components/CardMenu';
import EmptyState from '../../components/EmptyState';
import orders from '../../data/orders';
import menuData from '../../data/menuData';
import './CustomerDashboard.css';

const customerLinks = [
  { label: 'Menu', href: '/menu' },
  { label: 'Favorites', href: '/favorites' },
];

const CustomerDashboard = () => {
  const { favorites, toggleFavorite, isFavorite, addToCart, cartCount } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const currentUser = user || { id: 1, name: 'Guest', role: 'customer' };
  const customerOrders = orders.filter((o) => o.customerId === currentUser.id);
  const activeOrder = customerOrders.find(
    (o) => o.status === 'preparing' || o.status === 'pending' || o.status === 'ready'
  );
  const recentOrders = customerOrders.filter((o) => o.status === 'completed');

  // Favorites logic
  const dashboardFavorites = favorites;

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
        activePath="/customer"
        favoriteCount={favorites.length}
        cartCount={cartCount}
        showFavorites={true}
        showCart={true}
        showAuth={true}
        user={currentUser}
        onLogin={() => navigate('/login')}
        onSignup={() => navigate('/signup')}
        onLogout={() => { logout(); navigate('/'); }}
        onFavoriteClick={() => navigate('/favorites')}
        onCartClick={() => navigate('/cart')}
      />

      <main className="dashboard-main container">

        {/* ══════════════════════════════════
            1. WELCOME
            ══════════════════════════════════ */}
        <header className="dashboard-welcome">
          <span className="dashboard-eyebrow">Good to see you, {(currentUser.name || 'Guest').split(' ')[0]}</span>
          <h1 className="dashboard-greeting">
            Ready for something<br />
            fresh?
          </h1>
          <p className="dashboard-subtitle">
            Your personal Farsly space — track orders, revisit favorites, 
            and reorder the bowls you love.
          </p>
        </header>

        {/* ══════════════════════════════════
            2. QUICK ACTIONS
            ══════════════════════════════════ */}
        <section className="dashboard-section dashboard-quick-actions">
          <div className="quick-actions-grid">

            <Link to="/menu" className="quick-action-link">
              <div className="quick-action-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </div>
              <span className="quick-action-title">Browse Menu</span>
              <span className="quick-action-desc">Discover bowls, salads &amp; drinks</span>
            </Link>

            <Link to="/favorites" className="quick-action-link">
              <div className="quick-action-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <span className="quick-action-title">Favorites</span>
              <span className="quick-action-desc">Your saved bowls &amp; meals</span>
            </Link>

            {recentOrders.length > 0 && (
              <button 
                className="quick-action-link"
                onClick={() => {
                  const lastCompleted = recentOrders[0];
                  const reorderItem = menuData.find((m) => m.id === lastCompleted.items[0]?.menuItemId);
                  if (reorderItem) {
                    addToCart(reorderItem);
                    navigate('/cart');
                  }
                }}
              >
                <div className="quick-action-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" />
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                </div>
                <span className="quick-action-title">Order Again</span>
                <span className="quick-action-desc">Reorder your last meal</span>
              </button>
            )}

          </div>
        </section>

        {/* ══════════════════════════════════
            3. LATEST ORDER
            ══════════════════════════════════ */}
        <section className="dashboard-section dashboard-active-order-section">
          <h2 className="dashboard-section-title">Your Latest Order</h2>

          {activeOrder ? (
            <article className="dashboard-active-order">
              <div className="dashboard-order-top">
                <div className="dashboard-order-meta">
                  <span className="dashboard-order-id">Order #{activeOrder.id}</span>
                  <StatusBadge status={activeOrder.status}>
                    {statusLabel(activeOrder.status)}
                  </StatusBadge>
                </div>
              </div>

              <div className="dashboard-order-items">
                {activeOrder.items.map((item) => (
                  <div key={item.menuItemId} className="dashboard-order-item">
                    <span className="dashboard-order-item-name">{item.name}</span>
                    <span className="dashboard-order-item-qty">× {item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <hr className="dashboard-divider" />

              <div className="dashboard-order-bottom">
                <div className="dashboard-order-summary">
                  <span className="dashboard-order-total">{activeOrder.total}</span>
                  {activeOrder.estimatedReady && (
                    <span className="dashboard-order-eta">
                      Estimated ready: {activeOrder.estimatedReady}
                    </span>
                  )}
                </div>
                <div className="dashboard-order-action">
                  <Button variant="primary" onClick={() => navigate(`/customer/track/${activeOrder.id}`)}>
                    Track Order
                  </Button>
                </div>
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

        {/* ══════════════════════════════════
            4. FAVORITES
            ══════════════════════════════════ */}
        <section className="dashboard-section dashboard-favorites-section">
          <h2 className="dashboard-section-title">Favorites</h2>

          {dashboardFavorites.length === 0 ? (
            <EmptyState
              title="No favorites yet"
              description="Save your favorite Farsly bowls and they'll appear here."
              action={
                <Button variant="outline" onClick={() => navigate('/menu')}>
                  Browse Menu
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

        {/* ══════════════════════════════════
            5. RECENTLY ORDERED
            ══════════════════════════════════ */}
        <section className="dashboard-section dashboard-recent-orders-section">
          <h2 className="dashboard-section-title">Recently Ordered</h2>

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
            <div className="dashboard-recent-orders-list">
              {recentOrders.map((order) => {
                const firstItemData = menuData.find(m => m.id === order.items[0]?.menuItemId);
                return (
                  <article key={order.id} className="recent-order-compact">
                    <div className="recent-order-info">
                      <h3 className="recent-order-name">{order.items.map(i => i.name).join(', ')}</h3>
                      <div className="recent-order-meta">
                        <span className="recent-order-price">{order.total}</span>
                        <span className="recent-order-date">Ordered recently</span>
                      </div>
                    </div>
                    <div className="recent-order-action">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          if (firstItemData) {
                            addToCart(firstItemData);
                            navigate('/cart');
                          }
                        }}
                      >
                        Order Again
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default CustomerDashboard;
