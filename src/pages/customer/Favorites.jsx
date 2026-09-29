import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import CardMenu from '../../components/CardMenu';
import EmptyState from '../../components/EmptyState';
import PageHeader from '../../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import './Favorites.css';

const customerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
];

const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite, addToCart, cartCount } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="favorites-page page">
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
          title="Your Favorites"
          description="Keep the meals you love close."
        />

        {favorites.length === 0 ? (
          !user ? (
            <EmptyState
              title="Log in to save favorites"
              message="Create an account or log in to save your favorite Farsly meals across devices."
              actionLabel="Log In"
              onAction={() => navigate('/login')}
            />
          ) : (
            <EmptyState
              title="Your favorites are empty"
              message="Save the Farsly meals you love and they'll appear here."
              actionLabel="Browse Menu"
              onAction={() => navigate('/menu')}
            />
          )
        ) : (
          <div className="favorites-grid">
            {favorites.map((item) => (
              <CardMenu
                key={item.id}
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

export default Favorites;
