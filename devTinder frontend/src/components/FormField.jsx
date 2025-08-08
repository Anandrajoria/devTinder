// const FormField = ({ label, type = "text", name, value, onChange, error }) => {
//   return (
//     <fieldset className="fieldset">
//       <legend className="fieldset-legend">{label}</legend>
//       <input
//         type={type}
//         name={name}
//         className="input"
//         value={value}
//         onChange={onChange}
//       />
//       {error && <p className="text-error text-xs mt-1">{error}</p>}
//     </fieldset>
//   );
// };

// export default FormField;


// src/components/FormField.jsx
// src/components/FormField.jsx

import React from "react";

/**
 * A reusable, generic form field component that can render an input,
 * textarea, or select element based on the 'as' prop.
 */
const FormField = ({ as = "input", label, name, type = "text", value, onChange, error, children, ...props }) => {
  const InputComponent = as;

  const baseClasses = "input input-bordered w-full max-w-xs";
  const componentClasses = {
    textarea: "textarea textarea-bordered h-24 w-full max-w-xs",
    select: "select select-bordered w-full max-w-xs",
  };
  const finalClasses = componentClasses[as] || baseClasses;

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>

      <InputComponent
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={finalClasses}
        {...props}
      >
        {/* ✅ THE FIX IS HERE: We only pass children if the element is a 'select'.
            For 'input' or 'textarea', we pass null, which prevents the error.
        */}
        {as === 'select' ? children : null}
      </InputComponent>
      
      {error && (
        <div className="label">
          <span className="label-text-alt text-error">{error}</span>
        </div>
      )}
    </label>
  );
};

export default FormField;