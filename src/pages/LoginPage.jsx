import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { mockUsers } from '../data/users';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      if (user.role === 'customer') {
        navigate('/customer', { replace: true });
      } else if (user.role === 'restaurant') {
        navigate('/restaurant', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Mencari user yang cocok berdasarkan email & password
    const matchedUser = mockUsers.find(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (matchedUser) {
      setError(''); // Bersihkan error jika berhasil
      login(matchedUser); // Store auth state
      
      // Navigation is handled by the useEffect watching `user` from context
    } else {
      setError('Invalid email or password.');
    }
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

        .btn-google {
          transition: all 0.2s ease;
        }
        .btn-google:hover {
          background-color: #F9FAFB !important;
          border-color: #D1D5DB !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.06) !important;
        }

        .input-field {
          transition: all 0.2s ease;
        }

        .checkbox-custom {
          accent-color: #B85A5A;
          cursor: pointer;
        }
      `}</style>

      {/* Sisi Kiri: Visual Banner */}
      <div style={styles.imageSection}>
        <img
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop"
          alt="Healthy Organic Salad Bowl"
          style={styles.image}
        />
        <div style={styles.imageOverlay} />
        
        <div style={styles.floatingBadge}>
          <div style={styles.badgeIconWrapper}>🥗</div>
          <div>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '13px', color: '#13332A' }}>100% Fresh & Organic</p>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#6B7280' }}>Deliciously curated healthy meals</p>
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Form Section */}
      <div style={styles.formSection}>
        <div style={styles.formCard}>
          
          <div style={styles.brandContainer}>
            <h1 style={styles.brand}>FARSLY</h1>
            <p style={styles.subtext}>Log in to explore fresh & delicious choices</p>
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

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputContainer}>
              <span style={{
                ...styles.icon,
                color: focusedInput === 'email' ? '#B85A5A' : '#9CA3AF'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username or Email"
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

            <div style={styles.optionsRow}>
              <label style={styles.rememberMe}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-custom"
                />
                <span>Remember me</span>
              </label>
              <span style={styles.forgotPassword}>Forgot password?</span>
            </div>

            <button type="submit" className="btn-submit" style={styles.buttonSubmit}>
              Sign In
            </button>
          </form>

          <div style={styles.dividerContainer}>
            <div style={styles.dividerLine}></div>
            <span style={styles.dividerText}>or continue with</span>
            <div style={styles.dividerLine}></div>
          </div>

          <button type="button" className="btn-google" style={styles.buttonGoogle}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.26v3.15C3.25 21.3 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.26C.46 8.22 0 10.06 0 12s.46 3.78 1.26 5.39l4.02-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.61l4.02 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
            </svg>
            Google
          </button>

          <p style={styles.footerText}>
            Don't have an account? <span style={styles.linkText}>Sign Up</span>
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
    marginBottom: '24px',
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
    marginBottom: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
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
    padding: '13.5px 16px 13.5px 46px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    fontSize: '13.5px',
    color: '#1F2937',
    outline: 'none',
  },
  optionsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '2px',
    marginBottom: '4px',
    fontSize: '12.5px',
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#4B5563',
    cursor: 'pointer',
    userSelect: 'none',
  },
  forgotPassword: {
    color: '#B85A5A',
    fontWeight: '600',
    cursor: 'pointer',
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
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '20px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#F3F4F6',
  },
  dividerText: {
    padding: '0 12px',
    fontSize: '11px',
    color: '#9CA3AF',
    fontWeight: '500',
  },
  buttonGoogle: {
    width: '100%',
    padding: '11.5px',
    backgroundColor: '#FFFFFF',
    color: '#374151',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    fontSize: '13.5px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
  },
  footerText: {
    fontSize: '13px',
    color: '#6B7280',
    marginTop: '22px',
    marginBottom: 0,
  },
  linkText: {
    color: '#2563EB',
    fontWeight: '600',
    cursor: 'pointer',
  },
};