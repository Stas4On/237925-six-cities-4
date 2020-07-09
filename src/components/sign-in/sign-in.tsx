import * as React from "react";
import {RefObject} from "react";
import {UserAuthenticationData} from "../../models";

interface Props {
  onSubmit: (userData: UserAuthenticationData) => void;
}

class SignIn extends React.PureComponent<Props> {
  login: RefObject<HTMLInputElement>;
  password: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.login = React.createRef();
    this.password = React.createRef();
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  private _getUserData(): UserAuthenticationData {
    return (
      {
        login: this.login.current.value,
        password: this.password.current.value
      }
    )
  }

  private _handleSubmit(event: React.SyntheticEvent) {
    const {onSubmit} = this.props;

    event.preventDefault();

    onSubmit(this._getUserData());
  }

  render() {
    return (
      <div className="page page--gray page--login">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="main.html">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form
                className="login__form form"
                action=""
                onSubmit={this._handleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required
                         ref={this.login}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required
                         ref={this.password}
                  />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Paris</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }


}

export default SignIn;
