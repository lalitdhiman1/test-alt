import React from 'react';

const renderField = ({
    input, id, label, type, meta: { touched, error, warning }, // eslint-disable-line
  }) => (
    <div className="loginfield">
      <label htmlFor={id}>{label}
        <input {...input} className='login-text-input' placeholder={label} type={type} />
        {touched && ((error && <span className='error-msg'>{error}</span>) || (warning && <span>{warning}</span>))}
      </label>
    </div>
  );

  export default  renderField;