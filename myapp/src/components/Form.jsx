import React, { useState } from "react";

const Form = ({ onSubmit, fields, title }) => {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form className="Auth-form" onSubmit={(e) => onSubmit(e, values)}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">{title}</h3>
        {fields.map((field, index) => (
          <div key={index} className="form-group mt-3">
            <label>{field.label}</label>
            <input
              type={field.type}
              className="form-control mt-1"
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleChange}
              name={field.name}
            />
          </div>
        ))}
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
