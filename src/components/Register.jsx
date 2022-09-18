import React from "react";
import RegistrationForm from "./RegistrationForm.jsx";

function Register() {
  return (
    <RegistrationForm
      name="register-form"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      // onSubmit=""
      subtitleText="Уже зарегистрированы? Войти"
      linkAdress="/sign-in"
    >
      <input
        className="form__input form__input_email"
        id="email-register-input"
        type="email"
        name="register-email"
        placeholder="Email"
        required
        minLength="3"
        maxLength="64"
      />
      <span className="form__error email-input-error"></span>
      <input
        className="form__input form__input_password"
        id="password-register-input"
        type="password"
        name="register-password"
        placeholder="Пароль"
        required
        minLength="6"
        maxLength="32"
        autoComplete="off"
      />
      <span className="form__error password-input-error"></span>
    </RegistrationForm>
  );
}

export default Register;
