import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import menuData from '../../data/menuData';
import './FoodDetail.css';

const customerLinks = [
  { label: 'Home', href: '#/' },
  { label: 'Menu', href: '#/menu' },
];

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, addToCart, cartCount, favorites } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const item = menuData.find((d) => d.id === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!item) {
    return (
      <div className="food-detail-page page">
        <Navbar
          brand="FARSLY"
          links={customerLinks}
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
        <main className="page-shell container">
          <EmptyState
            title="Item not found"
            message="We couldn't find the menu item you're looking for."
            actionLabel="Back to Menu"
            onAction={() => navigate('/menu')}
          />
        </main>
      </div>
    );
  }

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setShowToast(true);
    setQuantity(1); // Reset after adding
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const isFav = isFavorite(item.id);

  // Handle image URL with BASE_URL for GitHub Pages
  const imageUrl = item.image ? `${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}` : '';

  return (
    <div className="food-detail-page page">
      <Navbar
        brand="FARSLY"
        links={customerLinks}
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

      <main className="food-detail-main container">
        <div className="food-detail-nav">
          <button className="food-detail-back" onClick={() => navigate('/menu')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Menu
          </button>
        </div>

        <article className="food-detail-content">
          {/* Image Section */}
          <div className="food-detail-image-wrapper">
            {item.image ? (
              <img src={imageUrl} alt={item.name} className="food-detail-image" />
            ) : (
              <div className="food-detail-image-placeholder">No Image Available</div>
            )}
            {item.badge && (
              <div className="food-detail-badge">{item.badge}</div>
            )}
            <button 
              className={`food-detail-favorite ${isFav ? 'active' : ''}`}
              onClick={() => toggleFavorite(item)}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          {/* Info Section */}
          <div className="food-detail-info">
            <div className="food-detail-meta">
              <span className="food-detail-category">{item.category}</span>
              <span className="food-detail-rating">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                {item.rating} ({item.reviewCount})
              </span>
            </div>

            <h1 className="food-detail-title">{item.name}</h1>
            
            <p className="food-detail-description">{item.description}</p>

            {item.ingredients && item.ingredients.length > 0 && (
              <div className="food-detail-section">
                <h3 className="food-detail-section-title">Ingredients</h3>
                <div className="food-detail-ingredients">
                  {item.ingredients.map((ingredient, idx) => (
                    <span key={idx} className="food-detail-ingredient-chip">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(item.calories || item.protein) && (
              <div className="food-detail-section">
                <h3 className="food-detail-section-title">Nutrition</h3>
                <div className="food-detail-nutrition">
                  {item.calories && (
                    <div className="food-detail-nutrition-item">
                      <span className="food-detail-nutrition-value">{item.calories}</span>
                      <span className="food-detail-nutrition-label">kcal</span>
                    </div>
                  )}
                  {item.protein && (
                    <div className="food-detail-nutrition-item">
                      <span className="food-detail-nutrition-value">{item.protein}</span>
                      <span className="food-detail-nutrition-label">protein</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="food-detail-action-area">
              <div className="food-detail-price">{item.price}</div>
              
              <div className="food-detail-controls">
                <div className="food-detail-quantity">
                  <button className="quantity-btn" onClick={handleDecrease} aria-label="Decrease quantity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button className="quantity-btn" onClick={handleIncrease} aria-label="Increase quantity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>

                <Button variant="accent" className="food-detail-add-btn" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>

              {showToast && (
                <div className="food-detail-toast">
                  Added to your bag
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default FoodDetail;
