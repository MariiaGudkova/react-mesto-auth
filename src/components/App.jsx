import React from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import "../index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import DeletePlacePopup from "./DeletePlacePopup.jsx";
import ImagePopup from "./ImagePopup.jsx";
import InfoTooltip from "./InfoTooltip";
import Footer from "./Footer.jsx";
import api from "../utils/api.js";
import { register } from "../utils/auth.js";
import { authorize } from "../utils/auth.js";
import { getContent } from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardInfo, setCardInfo] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [authorizationSuccess, setAuthorizationSuccess] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isAuthorization, setIsAuthorization] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [serverErrorMessage, setServerErrorMessage] = React.useState("");
  const history = useHistory();
  const EmailRegex = /^\S+@\S+\.\S+$/;
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  React.useEffect(() => {
    getApiUserInfo();
    getApiCardsInfo();
  }, []);

  React.useEffect(() => {
    tokenCheck();
  });

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  async function getApiUserInfo() {
    try {
      const userInfo = await api.getUserInfo();
      setCurrentUser(userInfo);
    } catch (e) {
      console.error(e);
    }
  }

  async function getApiCardsInfo() {
    try {
      const cardsInfo = await api.getInitialCards();
      setCards(cardsInfo);
    } catch (e) {
      console.error(e);
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(true);
    setCardInfo(card);
  }

  function handleCardDeleteClick(card) {
    setCardToDelete(card);
  }

  async function handleUpdateUser({ name, about }) {
    try {
      setIsLoading(true);
      const userData = await api.createUserInfo(name, about);
      setCurrentUser(userData);
      closeAllPopups();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  async function handleUpdateAvatar(avatar) {
    try {
      setIsLoading(true);
      const userData = await api.createUserAvatar(avatar);
      setCurrentUser(userData);
      closeAllPopups();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  async function handleAddPlaceSubmit(newCardData) {
    const { name, link } = newCardData;
    try {
      setIsLoading(true);
      const newCard = await api.createUserCard(name, link);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  async function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);

      const updatedСards = cards.map((c) => {
        return c._id === card._id ? newCard : c;
      });

      setCards(updatedСards);
    } catch (e) {
      console.error();
    }
  }

  async function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      try {
        await api.deleteUserCard(card._id);

        const updatedCards = cards.filter((c) => {
          return c._id !== card._id;
        });

        setCards(updatedCards);
        setCardToDelete(null);
      } catch (e) {
        console.error();
      }
    }
  }

  async function hanldeRegistration(authData) {
    const { email, password } = authData;
    const response = await register(password, email);

    if (response.error) {
      setServerErrorMessage(response.error);
      setIsInfoTooltipOpen(true);
      setAuthorizationSuccess(false);
    }

    if (response.data) {
      setIsInfoTooltipOpen(true);
      setAuthorizationSuccess(true);
      history.push("/sign-in");
    }
  }

  async function hanldeAthorization(authData) {
    const { email, password } = authData;
    const response = await authorize(password, email);

    if (response.error) {
      setServerErrorMessage(response.error);
      setIsInfoTooltipOpen(true);
      setAuthorizationSuccess(false);
    }

    if (response.token) {
      localStorage.setItem("jwt", response.token);
      setIsInfoTooltipOpen(true);
      setAuthorizationSuccess(true);
      setLoggedIn(true);
      setIsAuthorization(true);
      history.push("/");
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res?.data?.email);
          history.push("/");
        }
      });
    }
  }

  function logoutUserProfile() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
          <Header
            buttonText="Выйти"
            loggedIn={loggedIn}
            userEmail={userEmail}
            onLogoutUserProfile={logoutUserProfile}
          />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />
        </ProtectedRoute>
        <Route path="/sign-up">
          <Header buttonText="Войти" loggedIn={loggedIn} />
          <Register
            onRegistrationSubmit={hanldeRegistration}
            EmailRegex={EmailRegex}
          />
        </Route>
        <Route path="/sign-in">
          <Header buttonText="Регистрация" loggedIn={loggedIn} />
          <Login
            onAthorizationSubmit={hanldeAthorization}
            EmailRegex={EmailRegex}
          />
        </Route>
      </Switch>
      {/* Popups */}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />
      <DeletePlacePopup
        card={cardToDelete}
        onClose={closeAllPopups}
        onDeletePlace={handleCardDelete}
        isLoading={isLoading}
      />
      <ImagePopup
        selectedCard={selectedCard}
        cardInfo={cardInfo}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={authorizationSuccess}
        serverErrorMessage={serverErrorMessage}
        isAuthorization={isAuthorization}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
