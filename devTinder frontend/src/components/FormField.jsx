const FormField = ({ label, type = "text", name, value, onChange, error }) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        type={type}
        name={name}
        className="input"
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-error text-xs mt-1">{error}</p>}
    </fieldset>
  );
};

export default FormField;
