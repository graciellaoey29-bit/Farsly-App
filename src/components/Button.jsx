import React from 'react';
import "./Button.css"

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`farsly-button farsly-button--${variant} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
