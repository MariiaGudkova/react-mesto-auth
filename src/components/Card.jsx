import React from "react";
import popupTrashButton from "../images/element__trash-button-image.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn
    ? "element__trash-button"
    : "element__trash-button_hidden";
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element__item">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__signature">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      >
        <img
          className="element__trash-button-image"
          src={popupTrashButton}
          alt="Иконка мусорки"
        />
      </button>
    </li>
  );
}

export default Card;
