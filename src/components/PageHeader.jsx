import React from 'react';
import './PageHeader.css';

const PageHeader = ({
  eyebrow,
  title,
  description,
  action,
  className = '',
  ...rest
}) => {
  return (
    <header className={`farsly-page-header ${className}`} {...rest}>
      <div className="farsly-page-header-content">
        {eyebrow && <span className="farsly-page-header-eyebrow">{eyebrow}</span>}
        {title && <h1 className="farsly-page-header-title">{title}</h1>}
        {description && <p className="farsly-page-header-description">{description}</p>}
      </div>
      
      {action && (
        <div className="farsly-page-header-action">
          {action}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
