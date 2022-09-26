import React from "react";
import popupCloseButton from "../images/popup__close-icon.svg";
import successIcon from "../images/popup__image-tool-tip-success.png";
import unSuccessIcon from "../images/popup__image-tool-tip-unsuccess.png";

function InfoTooltip(props) {
  const { isOpen, onClose, isSuccess, serverErrorMessage, isAuthorization } =
    props;
  const serverSuccessMessage = isAuthorization
    ? "Вы успешно вошли!"
    : "Вы успешно зарегистрировались!";
  return (
    <div
      className={`popup popup_info-tool-tip ${isOpen ? "popup_opened" : ""}`}
    >
      <button
        className="popup__close popup__close-button popup_info-tool-tip"
        type="button"
        onClick={onClose}
      >
        <img
          className="popup__close popup__close-icon"
          src={popupCloseButton}
          alt="Кнопка закрыть"
        />
      </button>
      <div className="popup__content popup__content_info-tool-tip">
        <img
          className="popup__image-tool-tip"
          src={isSuccess ? successIcon : unSuccessIcon}
          alt="Иконка подтверждения регистрации"
        />
        <h2 className="popup__title popup__title_info-tool-tip">
          {isSuccess ? serverSuccessMessage : serverErrorMessage}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
