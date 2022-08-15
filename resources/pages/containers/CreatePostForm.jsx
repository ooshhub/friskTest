import { useRef, useState } from "react";
import { FormInput } from "../components/FormInput";
import { NavButton } from "../components/NavButton";
import PropTypes from 'prop-types';

export const CreatePostForm = () => {

  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [pin, setPin] = useState(''),
    [message, setMessage] = useState('');

  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'username') setUsername(() => value)
    else if (name === 'email') setEmail(() => value)
    else if (name === 'pin') setPin(() => value)
    else if (name === 'message') setMessage(() => value)
  }

  const formRef = useRef(null);
  const handleSubmitForm = async (ev) => {
    ev.preventDefault();
    const formData = {
      username: username,
      email: email,
      pin: pin,
      message: message
    }
    // props.onSubmitForm(formData);
    const response = await window.ooxios.postRequest({
      url: '/api/submitPost',
      data: formData
    });
    console.info(response.data, response);
    if (response.data?.errors) {
      console.log('setting errors');
      setErrors(response.data.errors);
    }
    else if (response.data.id) {
      setUsername(() => '');
      setEmail(() => '');
      setPin(() => '');
      setMessage(() => '');
      alert(`Form ${response.data.id} submitted!`);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmitForm}>
      <FormInput inputType="text" inputName="username" inputValue={username} onChange={handleChange} inputLabel="Name: "
        validation={{ maxLength: "24", required: 'required' }}
        errors={errors} />
      <FormInput inputType="email" inputName="email" inputValue={email} onChange={handleChange} inputLabel="Email: " 
        validation={{ maxLength: "24", required: 'required' }}
        errors={errors} />
      <FormInput inputType="text" inputName="pin" inputValue={pin} onChange={handleChange} inputLabel="4-Digit PIN: "
        validation={{ pattern: "[\\d]{4}", maxLength: "4", minLength: "4", required: 'required' }}
        errors={errors} />
      <FormInput inputType="textarea" inputName="message" inputValue={message} onChange={handleChange} inputLabel="Message: "
        validation={{ maxLength: "48", required: 'required' }}
        errors={errors} />
      <NavButton link="/api/submitPost" action="submit" classes="submit-post">Submit Post</NavButton>
    </form>
  )
}

CreatePostForm.defaultProps = {
  errors: {}
}

CreatePostForm.propTypes = {
  onSubmitForm: PropTypes.func,
  errors: PropTypes.object,
}