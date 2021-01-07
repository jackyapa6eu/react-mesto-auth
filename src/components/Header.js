import React from 'react'
import headerLogo from '../images/header__logo.svg'

function Header() {
  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="логотип Mesto"/>
    </header>
  )
}

export default Header;