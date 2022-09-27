import React from "react";
import popupCloseButton from "../images/popup__close-icon.svg";
import Popup from "./Popup.jsx";

function ImagePopup(props) {
  const { selectedCard, cardInfo, onClose } = props;
  if (!selectedCard) {
    return null;
  }
  const cardLink = selectedCard ? cardInfo.link : "data";
  const cardName = selectedCard ? cardInfo.name : "empty";
  return (
    <>
      <Popup isOpen={selectedCard} onClose={onClose} />
      <div
        className={`popup popup_large-img ${
          selectedCard ? "popup_opened" : ""
        }`}
      >
        <div className="popup__large-img-content">
          <button
            className="popup__close popup__close-button popup__close-button_large-image"
            type="button"
            onClick={onClose}
          >
            <img
              className="popup__close popup__close-icon popup__close-icon_large-image"
              src={popupCloseButton}
              alt="Кнопка
      закрыть"
            />
          </button>
          <img
            className="popup__large-img-image"
            src={cardLink}
            alt={cardName}
          />
          <p className="popup__large-img-signature">{cardName}</p>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
