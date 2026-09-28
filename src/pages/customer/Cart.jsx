import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import EmptyState from '../../components/EmptyState';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const customerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Farsly Club', href: '/club' },
];

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, favorites, cartSubtotal, formatPrice, cartCount } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="cart-page page">
      <Navbar
        brand="FARSLY"
        links={customerLinks}
        activePath=""
        favoriteCount={favorites.length}
        cartCount={cartCount}
        showFavorites={true}
        showCart={true}
        showAuth={true}
        user={user}
        onLogin={() => navigate('/login')}
        onSignup={() => navigate('/signup')}
        onLogout={() => { logout(); navigate('/'); }}
        onFavoriteClick={() => navigate('/favorites')}
        onCartClick={() => navigate('/cart')}
      />

      <main className="page-shell container cart-container">
        <PageHeader 
          title="Your Bag"
          description="Review your items before checkout."
        />

        {cart.length === 0 ? (
          <EmptyState
            title="Your bag is empty"
            message="Add something fresh to your order and it'll appear here."
            actionLabel="Explore Menu"
            onAction={() => navigate('/menu')}
          />
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image-container">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                  </div>
                  
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <span className="cart-item-price">{item.price}</span>
                    </div>
                    
                    <p className="cart-item-desc">{item.description}</p>
                    
                    <div className="cart-item-actions">
                      <div className="cart-quantity-controls">
                        <button 
                          className="cart-qty-btn"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label="Decrease quantity"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                        <span className="cart-qty-value">{item.quantity}</span>
                        <button 
                          className="cart-qty-btn"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label="Increase quantity"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>
                      
                      <button 
                        className="cart-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3 className="cart-summary-title">Order Summary</h3>
              
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              
              <div className="cart-summary-row">
                <span>Tax &amp; Fees</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="cart-summary-divider"></div>
              
              <div className="cart-summary-row cart-summary-total">
                <span>Estimated Total</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              
              <Button 
                variant="primary" 
                className="cart-checkout-btn"
                onClick={() => {
                  if (!user) {
                    navigate('/login');
                  } else {
                    navigate('/customer/checkout');
                  }
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
