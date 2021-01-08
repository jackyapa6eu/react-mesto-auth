import React from 'react';
import headerLogo from '../images/header__logo.svg';
import { Link, useLocation, useHistory } from 'react-router-dom';
import classNames from 'classnames';

function Header({isLoggedIn, setIsLoggedIn, userEmail, setUserEmail}) {
  const [isBurgerOpened, setIsBurgerOpened] = React.useState(false);
  const location = useLocation();
  const history = useHistory();

  const burgerMenuSelectors = classNames(
    'header__burger-menu',
    {
      'header__burger-menu_opened': isBurgerOpened
    }
  )

  const userContainerMobileSelectors = classNames(
    'header__user-container',
    'header__user-container_mobile',
    {
      'header__user-container_opened': isBurgerOpened
    }
  )

  function signOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setUserEmail('');
    history.push('/sign-in');
  }

  function toggleBurgerMenu() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  return (
    <header className="header">
      {isLoggedIn && 
        <div className={userContainerMobileSelectors}>
          <span className="header__email">{userEmail}</span>
          <button className="header__button" onClick={signOut}>Выход</button>
        </div>
      }
      <div className="header__container">
        <img className="logo" src={headerLogo} alt="логотип Mesto"/>
        {location.pathname === '/sign-up' && <Link className="header__link" to='/sign-in'>Войти</Link>}
        {location.pathname === '/sign-in' && <Link className="header__link" to='/sign-up'>зарегистрироваться</Link>}
        {isLoggedIn && 
          <div className="header__user-container">
            <span className="header__email">{userEmail}</span>
            <button className="header__button" onClick={signOut}>Выход</button>
          </div>
        }
        {isLoggedIn &&
          <div className={burgerMenuSelectors} onClick={toggleBurgerMenu}/>
        }
      </div>
    </header>
  )
}

export default Header;