import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({isOpen, onAddPlace, onClose}) {
  const [name, setName] = React.useState('');
  const [link, setNewPlaceLink] = React.useState('');
  function handleNameInput(event) {
    setName(event.target.value);
  }
  function handleLinkInput(event) {
    setNewPlaceLink(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name,
      link
    });
  }
  return (
    <PopupWithForm name="addplace" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input type="text" 
      name="name" 
      className="popup__input popup__input_type_place-name" 
      onChange={handleNameInput}
      value={name}
      id="place-name-input" 
      placeholder="Название" 
      required 
      minLength="2" 
      maxLength="30"
      />
      <span className='popup__error popup__error_visible' id="place-name-input-error"/>
      <input type="url" 
      name="link" 
      className="popup__input popup__input_type_place-link" 
      onChange={handleLinkInput}
      value={link}
      id="place-link-input" 
      placeholder="Ссылка на картинку" 
      required 
      />
      <span className='popup__error popup__error_visible' id="place-link-input-error"/>
      <button type="submit" className="popup__button">Создать</button>  
    </PopupWithForm>
  )
}

export default AddPlacePopup;