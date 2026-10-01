;
import { Link } from 'react-router-dom';
import './CardMenu.css';
import Button from './Button';

const CardMenu = ({
  id,
  image,
  category,
  name,
  description,
  rating,
  reviewCount,
  ingredients = [],
  price,
  calories,
  protein,
  badge,
  isFavorite = false,
  onFavorite,
  onAddToCart
}) => {
  // Handle image URL - prepend BASE_URL for GitHub Pages compatibility
  const imageUrl = image ? `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}` : '';

  return (
    <article className="farsly-card-menu">
      <div className="farsly-card-menu-image-wrapper">
        {id && image ? (
          <Link to={`/menu/${id}`} className="farsly-card-menu-link">
            <img src={imageUrl} alt={name} className="farsly-card-menu-image" />
          </Link>
        ) : (
          image && <img src={imageUrl} alt={name} className="farsly-card-menu-image" />
        )}
        
        {badge && (
          <div className="farsly-card-menu-badge">
            {badge}
          </div>
        )}

        <button 
          className={`farsly-card-menu-favorite ${isFavorite ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFavorite(); }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div className="farsly-card-menu-content">
        <div className="farsly-card-menu-meta">
          <span className="farsly-card-menu-category">{category}</span>
          <span className="farsly-card-menu-rating">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            {rating} ({reviewCount})
          </span>
        </div>

        {id ? (
          <Link to={`/menu/${id}`} className="farsly-card-menu-title-link">
            <h3 className="farsly-card-menu-title">{name}</h3>
          </Link>
        ) : (
          <h3 className="farsly-card-menu-title">{name}</h3>
        )}
        
        <p className="farsly-card-menu-description">{description}</p>

        {ingredients.length > 0 && (
          <div className="farsly-card-menu-ingredients">
            {ingredients.map((ingredient, index) => (
              <span key={index} className="farsly-card-menu-ingredient-chip">
                {ingredient}
              </span>
            ))}
          </div>
        )}

        <div className="farsly-card-menu-footer">
          <div className="farsly-card-menu-price-info">
            <span className="farsly-card-menu-price">{price}</span>
            <span className="farsly-card-menu-nutrition">
              {calories} kcal &bull; {protein} protein
            </span>
          </div>
          
          <Button variant="accent" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart(); }} className="farsly-card-menu-cta">
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
};

export default CardMenu;
