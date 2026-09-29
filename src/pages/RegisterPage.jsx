import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    navigate('/customer');
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:wght@700;800&display=swap');
        
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #F4F0EA;
        }

        *, *:before, *:after {
          box-sizing: border-box;
        }

        .btn-submit {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(184, 90, 90, 0.38) !important;
          background-color: #A34A4A !important;
        }
        .btn-submit:active {
          transform: translateY(0);
        }

        .input-field {
          transition: all 0.2s ease;
        }
      `}</style>

      {/* Left Side: Visual Banner */}
      <div style={styles.imageSection}>
        <img
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop"
          alt="Healthy Organic Salad Bowl"
          style={styles.image}
        />
        <div style={styles.imageOverlay} />
        
        <div style={styles.floatingBadge}>
          <div style={styles.badgeIconWrapper}>🌿</div>
          <div>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '13px', color: '#13332A' }}>Join Farsly Today</p>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#6B7280' }}>Discover healthy food & fresh choices</p>
          </div>
        </div>
      </div>

      {/* Right Side: Register Form Section */}
      <div style={styles.formSection}>
        <div style={styles.formCard}>
          
          <div style={styles.brandContainer}>
            <h1 style={styles.brand}>FARSLY</h1>
            <p style={styles.subtext}>Create an account to get started</p>
          </div>

          {error && (
            <div style={styles.error}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} style={styles.form}>
            {/* Name Input */}
            <div style={styles.inputContainer}>
              <span style={{
                ...styles.icon,
                color: focusedInput === 'name' ? '#B85A5A' : '#9CA3AF'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </span>
              <input
                type="text"
                value={name}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="input-field"
                style={{
                  ...styles.input,
                  borderColor: focusedInput === 'name' ? '#B85A5A' : '#E5E7EB',
                  backgroundColor: focusedInput === 'name' ? '#FFFFFF' : '#FAFAFA',
                  boxShadow: focusedInput === 'name' ? '0 0 0 4px rgba(184, 90, 90, 0.12)' : '0 1px 2px rgba(0,0,0,0.02)'
                }}
                required
              />
            </div>

            {/* Email Input */}
            <div style={styles.inputContainer}>
              <span style={{
                ...styles.icon,
                color: focusedInput === 'email' ? '#B85A5A' : '#9CA3AF'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="input-field"
                style={{
                  ...styles.input,
                  borderColor: focusedInput === 'email' ? '#B85A5A' : '#E5E7EB',
                  backgroundColor: focusedInput === 'email' ? '#FFFFFF' : '#FAFAFA',
                  boxShadow: focusedInput === 'email' ? '0 0 0 4px rgba(184, 90, 90, 0.12)' : '0 1px 2px rgba(0,0,0,0.02)'
                }}
                required
              />
            </div>

            {/* Password Input */}
            <div style={styles.inputContainer}>
              <span style={{
                ...styles.icon,
                color: focusedInput === 'password' ? '#B85A5A' : '#9CA3AF'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </span>
              <input
                type="password"
                value={password}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field"
                style={{
                  ...styles.input,
                  borderColor: focusedInput === 'password' ? '#B85A5A' : '#E5E7EB',
                  backgroundColor: focusedInput === 'password' ? '#FFFFFF' : '#FAFAFA',
                  boxShadow: focusedInput === 'password' ? '0 0 0 4px rgba(184, 90, 90, 0.12)' : '0 1px 2px rgba(0,0,0,0.02)'
                }}
                required
              />
            </div>

            <button type="submit" className="btn-submit" style={styles.buttonSubmit}>
              Sign Up
            </button>
          </form>

          <p style={styles.footerText}>
            Already have an account?{' '}
            <span style={styles.linkText} onClick={() => navigate('/')}>
              Sign In
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
  },
  imageSection: {
    width: '48%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(19,51,42,0.4) 100%)',
  },
  floatingBadge: {
    position: 'absolute',
    bottom: '36px',
    left: '36px',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    backdropFilter: 'blur(12px)',
    padding: '12px 18px',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(255,255,255,0.6)',
  },
  badgeIconWrapper: {
    fontSize: '20px',
    backgroundColor: '#F3F8F5',
    width: '38px',
    height: '38px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSection: {
    width: '52%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  formCard: {
    width: '100%',
    maxWidth: '410px',
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    padding: '38px 36px',
    boxShadow: '0 16px 40px rgba(19, 51, 42, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    textAlign: 'center',
  },
  brand: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '38px',
    fontWeight: '800',
    color: '#13332A',
    margin: '0 0 6px 0',
    letterSpacing: '1px',
  },
  subtext: {
    fontSize: '13px',
    color: '#6B7280',
    margin: 0,
    fontWeight: '500',
  },
  error: {
    width: '100%',
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
    border: '1px solid #FCA5A5',
    padding: '10px 14px',
    borderRadius: '12px',
    fontSize: '12.5px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s ease',
  },
  input: {
    width: '100%',
    padding: '13px 16px 13px 46px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    fontSize: '13.5px',
    color: '#1F2937',
    outline: 'none',
  },
  buttonSubmit: {
    width: '100%',
    padding: '13.5px',
    backgroundColor: '#B85A5A',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(184, 90, 90, 0.25)',
    marginTop: '6px',
  },
  footerText: {
    fontSize: '13px',
    color: '#6B7280',
    marginTop: '20px',
    marginBottom: 0,
  },
  linkText: {
    color: '#B85A5A',
    fontWeight: '600',
    cursor: 'pointer',
  },
};