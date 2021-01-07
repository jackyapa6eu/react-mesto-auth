import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main({cards, onAddPlace, onCardClick, onCardDelete, onCardLike, onEditAvatar, onEditProfile, onFullImage}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <div className="profile__overlay"/>
          <img className="profile__avatar-image" src={currentUser.avatar} alt="Изображение профиля"/>
        </div>
        <div className="profile__info"> 
          <h1 className="profile__display-name">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" onClick={onEditProfile}/>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}/>
      </section>
      <section className="places">
        {cards.map((card) => (<Card 
          card={card} 
          key={card._id} 
          onCardClick={onCardClick} 
          onCardDelete={onCardDelete}
          onFullImage={onFullImage} 
          onLikeClick={onCardLike}/>
          ))}
      </section>
    </main>
  )
}

export default Main;