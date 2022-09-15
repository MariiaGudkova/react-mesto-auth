import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  const { isOpen, onClose, onUpdateAvatar, isLoading } = props;

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      onUpdateAvatar(avatarRef.current.value);
    } catch (e) {
      console.error(e);
    }
  }

  React.useEffect(() => {
    if (isOpen === true) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_avatar_image"
        id="image-link-input"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="form__error image-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
