import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputRef = React.useRef();
  function handleSubmit(event) {
    event.preventDefault();
    const avatar = {
      [inputRef.current.name] :inputRef.current.value
    }
    onUpdateAvatar(avatar);
  }
  return (
    <PopupWithForm name="editavatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose}  onSubmit={handleSubmit}>
    <input type="url" 
      name="avatar" 
      ref={inputRef} 
      className="popup__input popup__input_type_avatar" 
      id="profile-avatar-input" 
      placeholder="Ссылка на картинку" 
      required
    />
    <span className='popup__error popup__error_visible' id="profile-avatar-input-error"/>
    <button type="submit" className="popup__button">Сохранить</button>  
    </PopupWithForm>
  )
}

export default EditAvatarPopup;