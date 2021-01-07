import React from 'react'

function Footer() {
  function getCurrentYear() {
    return (new Date()).getFullYear()
  }
  return (
    <footer className="footer">
      <p className="footer__copyright">{`\u00A9 ${getCurrentYear()} Mesto Russia`}</p>
    </footer>
  )
}

export default Footer;