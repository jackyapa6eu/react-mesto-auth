import React from 'react';
import classNames from 'classnames';

function InfoTooltip({text, img, isOpened, onClose}) {
  const InfoTooltipSelectors = classNames(
    'popup',
    'popup_type_info-tool-tip',
    { 
      'popup_opened': isOpened
    }
  )  
  function handleCloseBtn() {
    onClose();
  }
  return (
    <div className={InfoTooltipSelectors}>
      <div className='popup__form popup__form_type_info-tool-tip'>
        <button type="button" className="popup__close-button popup__close-button_type_info-tool-tip" onClick={handleCloseBtn}/>
        <img className='popup__image popup__image_type_info-tool-tip' src={img} alt={text}/>
        <p className='popup__title popup__title_type_info-tool-tip'>{text}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;
