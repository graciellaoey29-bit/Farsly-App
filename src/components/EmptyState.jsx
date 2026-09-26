import React from 'react';
import './EmptyState.css';

const EmptyState = ({
  title,
  description,
  action,
  icon,
  className = '',
  ...rest
}) => {
  return (
    <div className={`farsly-empty-state ${className}`} {...rest}>
      {icon && (
        <div className="farsly-empty-state-icon" aria-hidden="true">
          {icon}
        </div>
      )}
      
      {title && <h2 className="farsly-empty-state-title">{title}</h2>}
      
      {description && (
        <p className="farsly-empty-state-description">{description}</p>
      )}
      
      {action && (
        <div className="farsly-empty-state-action">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
