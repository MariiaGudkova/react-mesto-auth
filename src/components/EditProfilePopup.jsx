import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { useForm } from "../hooks/useForm.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { isOpen, onClose, onUpdateUser, isLoading } = props;
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    if (isOpen === true) {
      setValues(currentUser);
    }
  }, [isOpen, setValues, currentUser]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="personal-data"
      title="Редактировать&nbsp;профиль"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_text_name"
        id="name-input"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="form__error name-input-error"></span>
      <input
        className="form__input form__input_text_description"
        id="description-input"
        type="text"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={values.about || ""}
        onChange={handleChange}
      />
      <span className="form__error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
