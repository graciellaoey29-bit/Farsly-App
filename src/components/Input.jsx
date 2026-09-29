;
import './Input.css';

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  helperText,
  className = '',
  ...rest
}) => {
  const id = `farsly-input-${name}`;

  return (
    <div className={`farsly-input-wrapper ${className}`}>
      {label && (
        <label htmlFor={id} className="farsly-input-label">
          {label} {required && <span className="farsly-input-required">*</span>}
        </label>
      )}
      
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`farsly-input-field ${error ? 'farsly-input-field--error' : ''}`}
        {...rest}
      />
      
      {(error || helperText) && (
        <span className={`farsly-input-helper ${error ? 'farsly-input-helper--error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
