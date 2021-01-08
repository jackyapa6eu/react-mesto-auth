import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleNameInput(event) {
    setName(event.target.value);
  }
  function handleDescriptionInput(event) {
    setDescription(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }
  return (
    <PopupWithForm name="editprofile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="name" 
        className="popup__input popup__input_type_display-name" 
        onChange={handleNameInput} 
        value={name || ''}
        id="profile-display-name-input" 
        required 
        minLength="2" 
        maxLength="40"/>
      <span className='popup__error popup__error_visible' id="profile-display-name-input-error"/>
      <input 
        type="text" 
        name="about" 
        className="popup__input popup__input_type_profession" 
        onChange={handleDescriptionInput} 
        value={description || ''}
        id="profile-profession-input" 
        required 
        minLength="2" 
        maxLength="200"/>
      <span className='popup__error popup__error_visible' id="profile-profession-input-error"/>
    <button type="submit" className="popup__button">Сохранить</button> 
    </PopupWithForm>
  )
}

export default EditProfilePopup;