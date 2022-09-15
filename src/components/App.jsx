import React from "react";
import "../index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import DeletePlacePopup from "./DeletePlacePopup.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Footer from "./Footer.jsx";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardInfo, setCardInfo] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
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

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDeleteClick}
      />
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
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
