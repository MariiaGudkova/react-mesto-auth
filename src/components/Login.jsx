import React from "react";
import RegistrationForm from "./RegistrationForm.jsx";
import { useForm } from "../hooks/useForm.jsx";

function Login(props) {
  const { onAthorizationSubmit, EmailRegex } = props;
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(event) {
    event.preventDefault();
    onAthorizationSubmit(values);
  }

  return (
    <RegistrationForm
      name="enter-form"
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
      subtitleText=""
    >
      <input
        className="form__input form__input_email"
        id="email-login-input"
        type="email"
        name="email"
        placeholder="Email"
        required
        minLength="3"
        maxLength="64"
        mask={EmailRegex}
        onChange={handleChange}
      />
      <span className="form__error email-input-error"></span>
      <input
        className="form__input form__input_password"
        id="password-login-input"
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

export default Login;
