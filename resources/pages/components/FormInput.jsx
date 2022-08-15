import PropTypes from 'prop-types';
import { createElement } from 'react';

export const FormInput = (props) => {

  const inputElement = createElement(
    ['text', 'number', 'email'].includes(props.inputType) ? 'input' : props.inputType,
    {
      ...props.validation,
      name: props.inputName,
      value: props.inputValue,
      onChange: props.onChange,
    }
  );

  const errorMessage = props.errors?.[props.inputName] ?? '';

  return (
    <label className="input-group" data-id={props.inputName}>
      <span className="input-label">{props.inputLabel}</span>
      {inputElement}
      <span className="validation-error" style={{ display: errorMessage? 'block' : 'none' }}>{errorMessage}</span>
    </label>
  )
}

FormInput.defaultProps = {
  inputType: 'text',
  validation: {}
}

FormInput.propTypes = {
  inputType: PropTypes.oneOf(['text', 'number', 'email', 'textarea', 'select']),
  inputName: PropTypes.string,
  inputValue: PropTypes.any,
  inputLabel: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.string,
  validation: PropTypes.object,
  errors: PropTypes.object
}