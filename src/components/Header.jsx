import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../images/header__logo.svg";

function Header(props) {
  const { loggedIn, buttonText } = props;
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      {loggedIn} :
      <>
        <p className="header__email-info">email</p>
        <Link to="/sign-in" className="header__link-button">
          {`${buttonText}`}
        </Link>
      </>
      ?
      <Link
        to={location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
        className="header__link-button"
      >{`${buttonText}`}</Link>
    </header>
  );
}

export default Header;
