import React from "react";
import { useForm } from "../hooks/useForm.jsx";
import PopupWithForm from "./PopupWithForm.jsx";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, isLoading } = props;
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    if (isOpen === true) {
      setValues({ name: "", link: "" });
    }
  }, [isOpen, setValues]);

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_text_name form__input_text_name-card"
        id="name-card-input"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="form__error name-card-input-error"></span>
      <input
        className="form__input form__input_text_image"
        id="image-url-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="form__error image-url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
