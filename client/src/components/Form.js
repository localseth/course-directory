import React from 'react';

const Form = (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  // disables submit button once clicked
  const disabled = props.disabled || null;

  function handleSubmit(event) {
    event.preventDefault();
    // this function is passed in from the parent component since some pages require different behavior
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    // this function is passed in just like the submit function above
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

// display errors if any
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors?.length) {
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