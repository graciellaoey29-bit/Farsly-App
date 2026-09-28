;
import './Card.css';

const Card = ({
  children,
  className = '',
  variant = 'default',
  ...rest
}) => {
  return (
    <div 
      className={`farsly-card farsly-card--${variant} ${className}`} 
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
