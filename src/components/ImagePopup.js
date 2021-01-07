import React from 'react'
import classNames from 'classnames'

function ImagePopup({card, isOpen, onClose}) {
  const popupSelector = classNames('popup', 'popup_type_figure', {
    'popup_opened': isOpen
  })
  return (
    <div className={popupSelector}>
      <figure className="popup__figure">
        <button type="button" className="popup__close-button" onClick={onClose}/>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;