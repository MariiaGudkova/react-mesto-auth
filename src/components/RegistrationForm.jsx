import React from "react";
import { Link } from "react-router-dom";

function RegistrationForm(props) {
  const {
    title,
    name,
    buttonText,
    subtitleText,
    linkAdress,
    onSubmit,
    children,
  } = props;
  return (
    <div className="registration">
      <h2 className="registration__title">{`${title}`}</h2>
      <form
        className={`form form_${name}`}
        name={`${name}`}
        action="#"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <fieldset className="form__fieldset">
          {children}
          <button
            className={`form__registration-button form__registration-button_${name}`}
            type="submit"
          >
            {`${buttonText}`}
          </button>
        </fieldset>
      </form>
      <Link
        className="registration__subtitle"
        to={`${linkAdress}`}
      >{`${subtitleText}`}</Link>
    </div>
  );
}

export default RegistrationForm;
