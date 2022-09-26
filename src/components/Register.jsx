import React from "react";
import RegistrationForm from "./RegistrationForm.jsx";
import { useForm } from "../hooks/useForm.jsx";

function Register(props) {
  const { onRegistrationSubmit, EmailRegex } = props;
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(event) {
    event.preventDefault();
    onRegistrationSubmit(values);
  }

  return (
    <RegistrationForm
      name="register-form"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      subtitleText="Уже зарегистрированы? Войти"
      linkAdress="/sign-in"
    >
      <input
        className="form__input form__input_email"
        id="email-register-input"
        type="email"
        name="email"
        placeholder="Email"
        required
        minLength="6"
        maxLength="64"
        mask={EmailRegex}
        onChange={handleChange}
      />
      <span className="form__error email-input-error"></span>
      <input
        className="form__input form__input_password"
        id="password-register-input"
        type="password"
        name="password"
        placeholder="Пароль"
        required
        minLength="6"
        maxLength="32"
        autoComplete="off"
        onChange={handleChange}
      />
      <span className="form__error password-input-error"></span>
    </RegistrationForm>
  );
}

export default Register;
