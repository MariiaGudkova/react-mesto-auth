import React from "react";
import RegistrationForm from "./RegistrationForm.jsx";

function Login() {
  return (
    <RegistrationForm
      name="enter-form"
      title="Вход"
      buttonText="Войти"
      // onSubmit=""
      subtitleText=""
    >
      <input
        className="form__input form__input_email"
        id="email-login-input"
        type="email"
        name="login-email"
        placeholder="Email"
        required
        minLength="3"
        maxLength="64"
      />
      <span className="form__error email-input-error"></span>
      <input
        className="form__input form__input_password"
        id="password-login-input"
        type="password"
        name="login-password"
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

export default Login;
