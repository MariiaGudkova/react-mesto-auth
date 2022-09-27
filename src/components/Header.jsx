import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../images/header__logo.svg";
import { routes } from "../utils/routes.js";

function Header(props) {
  const { loggedIn, buttonText, userEmail, onLogoutUserProfile } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  function onClick() {
    return setOpen(!open);
  }
  return { loggedIn } && location.pathname === routes.baseRoute ? (
    <header
      className={
        !open ? "header header_auth" : "header header_auth header_auth-active"
      }
    >
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <div
        className={!open ? "header__menu" : "header__menu header__menu_active"}
      >
        <p className="header__email-info header__email-info_auth">
          {userEmail}
        </p>
        <Link
          to={routes.signIn}
          className=" header__link-button header__link-button_auth"
          onClick={onLogoutUserProfile}
        >
          {buttonText}
        </Link>
      </div>
      <ul
        className={!open ? "header__burger_active" : "header__burger"}
        onClick={onClick}
      >
        <li className="header__burger-line" />
        <li className="header__burger-line" />
        <li className="header__burger-line" />
      </ul>
      <ul
        className={
          !open ? "header__cross" : "header__cross header__cross_active"
        }
        onClick={close}
      >
        <li className="header__cross-line" />
        <li className="header__cross-line" />
      </ul>
    </header>
  ) : (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <Link
        to={location.pathname === routes.signIn ? routes.signUp : routes.signIn}
        className="header__link-button"
      >
        {buttonText}
      </Link>
    </header>
  );
}

export default Header;
