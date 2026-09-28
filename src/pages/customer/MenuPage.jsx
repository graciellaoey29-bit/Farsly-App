import { useState, useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import CardMenu from '../../components/CardMenu';
import EmptyState from '../../components/EmptyState';
import { useNavigate } from 'react-router-dom';
import menuData from '../../data/menuData';
import './MenuPage.css';

const customerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Farsly Club', href: '/club' },
];

const CATEGORIES = ['All', 'Poke', 'Salads', 'Drinks', 'Seasonal'];

const MenuPage = () => {
  const { toggleFavorite, isFavorite, addToCart, cartCount, favorites } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredData = activeCategory === 'All' 
    ? menuData 
    : menuData.filter((item) => item.category === activeCategory);

  return (
    <div className="menu-page page">
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

      <main className="page-shell container">
        <PageHeader 
          title="Explore the Menu"
          description="Fresh ingredients. Thoughtful combinations. Made your way."
        />

        <div className="menu-filters-wrapper">
          <ul className="menu-filters">
            {CATEGORIES.map((category) => (
              <li key={category}>
                <button
                  className={`menu-filter-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {filteredData.length === 0 ? (
          <EmptyState
            title="No dishes found"
            message="Try exploring another category."
            actionLabel="View All"
            onAction={() => setActiveCategory('All')}
          />
        ) : (
          <div className="menu-grid">
            {filteredData.map((item) => (
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


      </main>
    </div>
  );
};

export default MenuPage;
