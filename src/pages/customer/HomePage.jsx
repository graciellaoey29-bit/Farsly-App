import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import CardMenu from '../../components/CardMenu';
import signatureBowls from '../../data/signatureBowls';
import { ShopContext } from '../../context/ShopContext';
import './HomePage.css';

const customerLinks = [
  { label: 'Home', href: '#/' },
  { label: 'Menu', href: '#/menu' },
  { label: 'Farsly Club', href: '#/club' },
];

const HomePage = () => {
  const { toggleFavorite, isFavorite, addToCart, cartCount, favorites } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* ── Navbar ── */}
      <Navbar
        brand="FARSLY"
        links={customerLinks}
        activePath="/"
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

      <main>
        {/* ══════════════════════════════════
            1. HERO
            ══════════════════════════════════ */}
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-content">
              <span className="eyebrow">Premium &amp; Healthy</span>
              <h1 className="hero-title">
                Freshly made.<br />
                Thoughtfully yours.
              </h1>
              <p className="hero-subtitle">
                Chef-crafted poke and wholesome bowls made from responsibly
                sourced, organic ingredients. Build your perfect meal in seconds.
              </p>
              <div className="hero-actions">
                <Button variant="primary" onClick={() => navigate('/menu')}>Explore Menu</Button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-img-ring"></div>
              <img
                src="/assets/images/hero-bowl.jpg"
                alt="Farsly signature salmon poke bowl"
                className="hero-img"
              />
              <div className="hero-nutri-card">
                <span className="hero-nutri-name">Salmon Signature</span>
                <span className="hero-nutri-desc">
                  Wild-caught salmon, avocado, edamame &amp; ponzu
                </span>
                <span className="hero-nutri-stat">42g protein</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            2. PHILOSOPHY
            ══════════════════════════════════ */}
        <section className="philosophy">
          <div className="container philosophy-grid">
            <div className="philosophy-visual">
              <img
                src="/assets/images/farm-to-bowl.jpg"
                alt="Fresh organic ingredients from farm to bowl"
              />
            </div>
            <div className="philosophy-content">
              <span className="eyebrow eyebrow--coral">Our Philosophy</span>
              <h2>Real food, without&nbsp;the&nbsp;compromise.</h2>
              <p>
                At Farsly, we believe that eating well shouldn't mean sacrificing
                flavor or convenience. Every ingredient in our kitchen is
                meticulously sourced, prepared fresh daily, and crafted to fuel
                your body.
              </p>
              <p>
                From sustainably caught fish to local organic greens, we put
                uncompromising quality in every bowl.
              </p>
              <div className="philosophy-stats">
                <div className="philosophy-stat">
                  <span className="philosophy-stat-num">100%</span>
                  <span className="philosophy-stat-label">Organic Greens</span>
                </div>
                <div className="philosophy-stat">
                  <span className="philosophy-stat-num">0</span>
                  <span className="philosophy-stat-label">Artificial Additives</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            3. FARM TO BOWL
            ══════════════════════════════════ */}
        <section className="farm-section">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow eyebrow--coral">The Journey</span>
              <h2>Farm to Bowl</h2>
              <p>
                We trace every ingredient back to its source, ensuring peak
                freshness from harvest to your hands.
              </p>
            </div>

            <div className="farm-track">
              <div className="farm-step">
                <div className="farm-step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" />
                  </svg>
                </div>
                <h4>Sustainably Sourced</h4>
                <p>Partnering with local farms and certified sustainable fisheries.</p>
              </div>
              <div className="farm-step">
                <div className="farm-step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h4>Fresh Daily</h4>
                <p>Prepared from scratch every single morning.</p>
              </div>
              <div className="farm-step">
                <div className="farm-step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h4>Chef Crafted</h4>
                <p>Balanced flavors designed by culinary experts.</p>
              </div>
              <div className="farm-step">
                <div className="farm-step-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h4>Nutrient Dense</h4>
                <p>Packed with the protein and vitamins you need.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            4. SIGNATURE BOWLS
            ══════════════════════════════════ */}
        <section className="signatures">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow eyebrow--coral">Chef's Picks</span>
              <h2>Signature Bowls</h2>
              <p>
                Perfectly balanced recipes designed to satisfy. Try our most
                loved combinations.
              </p>
            </div>

            <div className="signatures-grid">
              {signatureBowls.map((bowl) => (
                <CardMenu
                  key={bowl.id}
                  id={bowl.id}
                  image={bowl.image}
                  category={bowl.category}
                  name={bowl.name}
                  description={bowl.description}
                  rating={bowl.rating}
                  reviewCount={bowl.reviewCount}
                  ingredients={bowl.ingredients}
                  price={bowl.price}
                  calories={bowl.calories}
                  protein={bowl.protein}
                  badge={bowl.badge}
                  isFavorite={isFavorite(bowl.id)}
                  onFavorite={() => toggleFavorite(bowl)}
                  onAddToCart={() => addToCart(bowl)}
                />
              ))}
            </div>

            <div className="signatures-cta">
              <Button variant="outline" onClick={() => navigate('/menu')}>View Full Menu</Button>
            </div>
          </div>
        </section>



        {/* ══════════════════════════════════
            6. FARSLY CLUB
            ══════════════════════════════════ */}
        <section className="club-section">
          <div className="container club-inner">
            <span className="eyebrow eyebrow--coral">Farsly Club</span>
            <h2>Eat well. Earn&nbsp;rewards.</h2>
            <p>
              Join Farsly Club and earn points with every order. Unlock
              exclusive menu items, birthday bowls, and member-only perks.
            </p>
            <Button variant="primary">Join Farsly Club</Button>
          </div>
        </section>

        {/* ══════════════════════════════════
            7. FINAL CTA
            ══════════════════════════════════ */}
        <section className="final-cta">
          <div className="container final-cta-inner">
            <h2>
              Good food.<br />
              Made your way.
            </h2>
            <div className="final-cta-actions">
              <Button variant="primary" onClick={() => navigate('/menu')}>Explore Menu</Button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">FARSLY</span>
            <p className="footer-tagline">Thoughtfully Made, Freshly Served</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Menu</h4>
              <Link to="/menu">Signature Bowls</Link>
              <Link to="/menu">Salads &amp; Sides</Link>
              <Link to="/menu">Drinks</Link>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <Link to="#">Our Story</Link>
              <Link to="#">Sustainability</Link>
              <Link to="#">Careers</Link>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <Link to="#">Contact</Link>
              <Link to="#">FAQ</Link>
              <Link to="#">Allergens</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Farsly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
