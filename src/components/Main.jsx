import React from "react";
import avatarEditButton from "../images/profile__avatar_after.png";
import profileEditButton from "../images/profile__edit-button.svg";
import profileAddButton from "../images/profile__add-button.svg";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
  } = props;

  return (
    <main className="container">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Жак-Ив Кусто"
          />
          <button
            className="profile__avatar-change-button"
            type="button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar-change-button-image"
              src={avatarEditButton}
              alt="Кнопка
                редактирования фото"
            />
          </button>
        </div>
        <div className="profile__info">
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          >
            <img
              className="profile__edit-button-image"
              src={profileEditButton}
              alt="Кнопка
              редактирования"
            />
          </button>
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
          <img
            className="profile__add-button-image"
            src={profileAddButton}
            alt="Кнопка
            добавления"
          />
        </button>
      </section>
      <section className="elements">
        <ul className="element">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
