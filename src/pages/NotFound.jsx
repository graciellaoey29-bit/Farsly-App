import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ color: '#B85A5A', textDecoration: 'none', fontWeight: 'bold' }}>Return to Homepage</Link>
    </div>
  );
};

export default NotFound;
