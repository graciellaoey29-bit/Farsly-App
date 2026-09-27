import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status = 'pending', children, className = '' }) => {
  // Normalize status to lowercase to safely map to our CSS classes
  const normalizedStatus = status.toLowerCase();

  return (
    <span className={`farsly-status-badge farsly-status-badge--${normalizedStatus} ${className}`}>
      {children}
    </span>
  );
};

export default StatusBadge;
