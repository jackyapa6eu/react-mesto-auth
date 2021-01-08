import React from 'react';
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api'
import User from './User.js';
import ProtectedRoute from './ProtectedRoute.js';
import authApi from '../utils/AuthApi.js';
import { signInTexts , signUpTexts } from '../utils/userTexts';
import InfoTooltip from './InfoTooltip.js';
import successRegistrationImg from '../images/success-registration.svg';
import errorRegistrationImg from '../images/error-registration.svg';


function App() {
  const [isEditProfilePopupOpen, toggleEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, toggleAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, toggleEditAvatarPopup] = React.useState(false);
  const [isImagePopupOpen, toggleImagePopup] = React.useState(false);
  const [selectedCard, setCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCardsArr] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isSuccessRegistration, setIsSuccessRegistration] = React.useState(false);
  const [isErrorRegistration, setIsErrorRegistration] = React.useState(false);
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then((initData) => {
        setCurrentUser(initData[0]);
        setCardsArr(initData[1]);
      })
      .catch((err) => {
        console.log(err);
      });
    getJwtFromLocal();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


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

  function handleSignInSubmit(userData) {
    authApi.signInUser(userData)
    .then((res) => {
      if (res) {
        localStorage.setItem('jwt', res.token);
        getUserData(res.token);
      } else {
        console.log('Что-то пошло не так');
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleSignUpSubmit(userData) {
    authApi.createUser(userData)
    .then((res) => {
      if (res) {
        setIsSuccessRegistration(true);
      } else {
        setIsErrorRegistration(true);
      }
    })
    .catch((err) => {
      setIsErrorRegistration(true);
      console.log(err);
    })  
  }

  function closeSuccessToolTip() {
    setIsSuccessRegistration(false);
    history.push('/sign-in');
  }

  function closeErrorToolTip() {
    setIsErrorRegistration(false);
  }

  function getJwtFromLocal() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getUserData(jwt);
    }
  }

  function getUserData(token) {
    authApi.getUserData(token)
    .then((res) => {
      if (res) {
        setUserEmail(res.data.email);
        setIsLoggedIn(true);
        history.push('/');
      }
    })
    .catch((err) => {
      console.log(err);
    })   
  }

  return (
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userEmail={userEmail} setUserEmail={setUserEmail}/>
          <Switch>
            <Route path="/sign-up">
              <User texts={signUpTexts} handleSubmit={handleSignUpSubmit} isSuccess={isSuccessRegistration}/>
            </Route>
            <Route path="/sign-in">
              <User texts={signInTexts} handleSubmit={handleSignInSubmit}/>
            </Route>
            <ProtectedRoute 
              path="/" 
              isLoggedIn={isLoggedIn} 
              component={Main}
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick}
              onFullImage={toggleImagePopup}
              onCardClick={setCard}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Switch>
          {location.pathname === "/" && <Footer />}
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
          <InfoTooltip 
            text={'Вы успешно зарегистрировались!'} 
            img={successRegistrationImg} 
            isOpened={isSuccessRegistration}
            onClose={closeSuccessToolTip}
          />
          <InfoTooltip 
            text={'Что-то пошло не так! \nПопробуйте ещё раз.'} 
            img={errorRegistrationImg} 
            isOpened={isErrorRegistration}
            onClose={closeErrorToolTip}
          />
        </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
