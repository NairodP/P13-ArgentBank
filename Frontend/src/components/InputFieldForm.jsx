/* eslint-disable react/prop-types */
export default function InputFieldForm({
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  error,
  required,
}) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
