import {AuthStatus, User} from "../../models/models";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants/constants";
import * as React from "react";

interface Props {
  authStatus: AuthStatus;
  userInfo: User;
}

const Header: React.FunctionComponent<Props> = ({authStatus, userInfo}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.ROOT} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="../img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authStatus === AuthStatus.AUTH
                  ? <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">{userInfo?.email}</span>
                  </Link>
                  : <Link className="header__nav-link header__nav-link--profile" to={AppRoute.LOGIN}>
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__login">Sign in</span>
                  </Link>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
