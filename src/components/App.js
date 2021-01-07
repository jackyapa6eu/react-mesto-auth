import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api'


function App() {
  const [isEditProfilePopupOpen, toggleEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, toggleAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, toggleEditAvatarPopup] = React.useState(false);
  const [isImagePopupOpen, toggleImagePopup] = React.useState(false);
  const [selectedCard, setCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCardsArr] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then((initData) => {
        setCurrentUser(initData[0]);
        setCardsArr(initData[1]);
        console.log(Array.isArray(initData[1]));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])


function updateCards(upDatedCard) {
  const newCards = cards.map((card) => card._id === upDatedCard._id ? upDatedCard : card);
  setCardsArr(newCards);
}

function handleCardLike(card) {
  const isLiked = card.likes.some( like => like._id === currentUser._id);
  if (!isLiked) {
    api.likeCard(card._id)
    .then((likedCard) => {
      updateCards(likedCard);
    })    
    .catch((err) => {
      console.log(err);
    });
  }
  else {
    api.unLikeCard(card._id)
    .then((unLikedCard) => {
      updateCards(unLikedCard);
    })    
    .catch((err) => {
      console.log(err);
    });
  }
} 

function handleCardDelete(cardForDelete) {
  api.deleteCard(cardForDelete._id)
  .then(() => {
    const newCards = cards.filter((card) => card._id !== cardForDelete._id);
    setCardsArr(newCards);
  })
  .catch((err) => {
    console.log(err);
  });
}

  function handleUpdateUser(newUserData) {
    api
    .updateUserData(newUserData)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(newAvatarLink) {
    api
    .updateAvatar(newAvatarLink)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log('error:',err);
    })
  }

  function handleAddPlaceSubmit(newPlaceData) {
    api
    .uploadNewCard(newPlaceData)
    .then((addedCard) => {
      setCardsArr([addedCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log('error:',err);
    })
  }

  function handleAddPlaceClick() {
    toggleAddPlacePopup(true);
  }

  function handleEditAvatarClick() {
    toggleEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    toggleEditProfilePopup(true);
  }

  function closeAllPopups() {
    toggleImagePopup(false);
    toggleAddPlacePopup(false); 
    toggleEditProfilePopup(false); 
    toggleEditAvatarPopup(false);
  }

  return (
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onFullImage={toggleImagePopup}
            onCardClick={setCard}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          >
          </AddPlacePopup>
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          >
          </EditProfilePopup>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          >
          </EditAvatarPopup>
          <ImagePopup 
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
