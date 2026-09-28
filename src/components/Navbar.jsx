import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const CUSTOMER_NAV_LINKS = [
  { label: 'Dashboard', to: '/customer' },
  { label: 'Menu', to: '/menu' },
];

const Navbar = ({
  brand = 'FARSLY',
  links = [],
  activePath = '',
  favoriteCount = 0,
  showFavorites = true,
  showCart = true,
  showAuth = true,
  cartCount = 0,
  user,
  onLogin,
  onSignup,
  onFavoriteClick,
  onCartClick,
  onLogout,
  className = '',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isCustomer = user?.role === 'customer';
  const resolvedLinks = isCustomer
    ? CUSTOMER_NAV_LINKS
    : links.map((link) => ({ ...link, to: link.href?.replace(/^#/, '') }));

  const resolveTo = (link) => link.to ?? link.href?.replace(/^#/, '') ?? '';
  const isActiveLink = (link) => {
    const to = resolveTo(link);
    if (activePath) return activePath === to;
    return location.pathname === to;
  };

  const closeMobile = () => setIsOpen(false);

  return (
    <nav className={`farsly-navbar ${className}`} {...rest}>
      <div className="farsly-navbar-inner">

        {/* Left Side: Brand and Links */}
        <div className="farsly-navbar-left">
          <Link to="/" className="farsly-navbar-brand" onClick={closeMobile}>{brand}</Link>

          <ul className="farsly-navbar-links desktop-only">
            {resolvedLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={resolveTo(link)}
                  className={`farsly-navbar-link ${isActiveLink(link) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Actions */}
        <div className="farsly-navbar-right desktop-only">

          {showFavorites && (
            <button
              className="farsly-navbar-icon-btn"
              onClick={onFavoriteClick}
              aria-label="Favorites"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {favoriteCount > 0 && (
                <span className="farsly-navbar-badge">{favoriteCount}</span>
              )}
            </button>
          )}

          {showCart && (
            <button
              className="farsly-navbar-icon-btn"
              onClick={onCartClick}
              aria-label="Shopping bag"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && (
                <span className="farsly-navbar-badge">{cartCount}</span>
              )}
            </button>
          )}

          {showAuth && !user && (
            <div className="farsly-navbar-auth">
              <button className="farsly-navbar-btn-login" onClick={onLogin}>
                Log in
              </button>
              <button className="farsly-navbar-btn-signup" onClick={onSignup}>
                Sign up
              </button>
            </div>
          )}

          {user && (
            <div className="farsly-navbar-user-desktop">
              <span className="farsly-navbar-user-name">{user.name}</span>
              {onLogout && (
                <button className="farsly-navbar-btn-login" onClick={onLogout}>
                  Logout
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="farsly-navbar-mobile-controls mobile-only">
          {showFavorites && (
            <button className="farsly-navbar-icon-btn" onClick={onFavoriteClick} aria-label="Favorites">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {favoriteCount > 0 && <span className="farsly-navbar-badge">{favoriteCount}</span>}
            </button>
          )}

          {showCart && (
            <button className="farsly-navbar-icon-btn" onClick={onCartClick} aria-label="Shopping bag">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && <span className="farsly-navbar-badge">{cartCount}</span>}
            </button>
          )}

          <button
            className="farsly-navbar-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="farsly-navbar-mobile-menu mobile-only">
          <ul className="farsly-navbar-mobile-links">
            {resolvedLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={resolveTo(link)}
                  onClick={closeMobile}
                  className={`farsly-navbar-mobile-link ${isActiveLink(link) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {showAuth && !user && (
            <div className="farsly-navbar-mobile-auth">
              <button className="farsly-navbar-btn-login" onClick={onLogin}>Log in</button>
              <button className="farsly-navbar-btn-signup" onClick={onSignup}>Sign up</button>
            </div>
          )}

          {user && (
            <div className="farsly-navbar-mobile-auth">
              <span className="farsly-navbar-user-name" style={{ marginBottom: '12px', display: 'block' }}>
                {user.name} ({user.role})
              </span>
              {onLogout && (
                <button className="farsly-navbar-btn-login" onClick={onLogout}>Logout</button>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
