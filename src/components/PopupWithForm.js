import classNames from 'classnames'

function PopupWithForm({isOpen, name, onClose, onSubmit, title, children}) {
  const popupSelector = classNames('popup', `popup_type_${name}`, {
    'popup_opened': isOpen
  })
  return (
    <div className={popupSelector}>
      <form className={`popup__form popup__form_type_${name}`} name={name} onSubmit={onSubmit} noValidate>
        <button type="button" className="popup__close-button" onClick={onClose}/>
        <h3 className="popup__title">{title}</h3>
        {children}
      </form>
    </div>
  )
}

export default PopupWithForm;