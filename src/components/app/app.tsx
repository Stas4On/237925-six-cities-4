import * as React from "react";
import {connect} from "react-redux";
import Main from "../main/main";
import {AuthStatus, OfferModel, User, UserAuthenticationData} from "../../models";
import OfferDetails from "../offer-details/offer-details";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {getCityOffers} from "../../reducer/data/selectors";
import {ActionCreator} from "../../reducer/city-places/city-places";
import {getCities, getCurrentCity} from "../../reducer/city-places/selectors";
import SignIn from "../sign-in/sign-in";
import {Operation as UserOperation} from "../../reducer/user/user";
import {getAuthStatus, getUserInfo} from "../../reducer/user/selectors";


interface Props {
  offers: OfferModel[];
  currentCity: string;
  cities: string[];
  onChangeCity: (city: string) => void;
  authStatus: AuthStatus;
  userInfo: User;
  logIn: (authData: UserAuthenticationData) => void;
}

const App: React.FunctionComponent<Props> = ({offers, currentCity, cities, onChangeCity, authStatus, userInfo, logIn}) => {

  const _renderApp = () => {
    if (authStatus === AuthStatus.NO_AUTH) {
      return <SignIn onSubmit={logIn}/>;
    }
    return <Main
      onChangeCity={onChangeCity}
      offers={offers}
      currentCity={currentCity}
      cities={cities}
      authStatus={authStatus}
      userInfo={userInfo}
    />;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {_renderApp()}
        </Route>
        <Route path="/dev-offer-details">
          <OfferDetails id={1} offers={offers}/>
        </Route>
        <Route path="/login">
          <SignIn onSubmit={logIn}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  logIn(userAuthData) {
    dispatch(UserOperation.logIn(userAuthData));
  }
});

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state),
  offers: getCityOffers(state),
  cities: getCities(state),
  authStatus: getAuthStatus(state),
  userInfo: getUserInfo(state),
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
