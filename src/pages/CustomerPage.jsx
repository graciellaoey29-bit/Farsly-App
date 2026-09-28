import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
        
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #F4F0EA;
        }

        *, *:before, *:after {
          box-sizing: border-box;
        }

        .logout-btn:hover {
          background-color: #A34A4A !important;
          transform: translateY(-1px);
        }
      `}</style>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={styles.navBrand}>FARSLY</h1>
        <button 
          onClick={() => navigate('/')} 
          className="logout-btn"
          style={styles.logoutButton}
        >
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.welcomeCard}>
          <span style={styles.badge}>🌿 Customer Dashboard</span>
          <h2 style={styles.welcomeTitle}>Welcome back, Food Lover!</h2>
          <p style={styles.welcomeText}>
            Explore fresh, healthy meals and organic choices curated just for you.
          </p>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  },
  navBrand: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '26px',
    fontWeight: '800',
    color: '#13332A',
    margin: 0,
    letterSpacing: '0.5px',
  },
  logoutButton: {
    backgroundColor: '#B85A5A',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '10px',
    fontSize: '13.5px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(184, 90, 90, 0.2)',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    padding: '48px',
    borderRadius: '24px',
    textAlign: 'center',
    maxWidth: '520px',
    boxShadow: '0 12px 30px rgba(19, 51, 42, 0.05)',
    border: '1px solid rgba(229, 231, 235, 0.8)',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#F3F8F5',
    color: '#13332A',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12.5px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  welcomeTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '28px',
    color: '#13332A',
    margin: '0 0 10px 0',
  },
  welcomeText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0,
    lineHeight: '1.6',
  },
};