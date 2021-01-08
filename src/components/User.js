import React from 'react';
import { useLocation } from 'react-router-dom';
import HaveAccount from './HaveAccount';
import classNames from 'classnames';

function SignIn({texts, handleSubmit, type, children}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const location = useLocation();
  const buttonSelectors = classNames(
    'user__button',
    {
      'user__button_type_sign-up': location.pathname === '/sign-up'
    }
  )
  const userSelectors = classNames (
    'user',
    {
      'user_type_sign-up': location.pathname === '/sign-up'
    }
  )
  function onSubmit(event) {
    event.preventDefault();
    const userData = {
      password,
      email
    }
    handleSubmit(userData);
  }

  function handleEmailInput(event) {
    setEmail(event.target.value);
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value);
  }
  return (
    <form className={userSelectors} onSubmit={onSubmit}>
      <h3 className="user__title">{texts.title}</h3>
      <input 
        type="email" 
        className="user__input" 
        placeholder="Email" 
        onChange={handleEmailInput} 
        value={email || ''} 
        required
      />
      <input 
        type="password" 
        className="user__input" 
        placeholder="Пароль"
        onChange={handlePasswordInput}
        value={password || ''}
        required
      />
      <button type="submit" className={buttonSelectors}>{texts.buttonText}</button>
      {location.pathname === '/sign-up' && <HaveAccount/>}
    </form>
  )
}

export default SignIn;
