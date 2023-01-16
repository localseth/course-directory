import React from 'react';

const Form = (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  const disabled = props.disabled || null;

  // const submitting = () => {
  //   if (submitButtonText === 'Loading...') {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
          <button className="button" type="submit" disabled={disabled}>{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div className='validation--errors'>
        <h3>Validation errors</h3>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
      </div>
    );
  }

  return errorsDisplay;
}

export default Form;