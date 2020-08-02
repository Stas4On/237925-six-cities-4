import * as React from "react";
import {connect} from "react-redux";
import Main from "../main/main";
import {AuthStatus, OfferModel, User, UserAuthenticationData} from "../../models/models";
import OfferDetails from "../offer-details/offer-details";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {getCityOffers} from "../../reducer/data/selectors";
import {ActionCreator} from "../../reducer/city-places/city-places";
import {getCities, getCurrentCity} from "../../reducer/city-places/selectors";
import SignIn from "../sign-in/sign-in";
import {Operation as UserOperation} from "../../reducer/user/user";
import {getAuthStatus, getUserInfo} from "../../reducer/user/selectors";
import {ActionCreator as ErrorActionCreator} from '../../reducer/errors/errors';
import {AppRoute} from "../../constants/constants";
import Favorites from "../favorites/favorites";
import {getErrorStatus} from "../../reducer/errors/selectors";
import withMessage from "../../hocs/with-message/with-message";

interface Props {
  offers: OfferModel[];
  currentCity: string;
  cities: string[];
  onChangeCity: (city: string) => void;
  authStatus: AuthStatus;
  userInfo: User;
  logIn: (authData: UserAuthenticationData) => void;
  errorStatus: number;
  resetError: () => void;
}

const SignInWrapped = withMessage(SignIn);
const MainWrapped = withMessage(Main);
const OfferDetailsWrapped = withMessage(OfferDetails);
const FavoritesWrapped = withMessage(Favorites);

const App: React.FunctionComponent<Props> = ({offers, currentCity, cities, onChangeCity, authStatus, userInfo, logIn, errorStatus, resetError}) => {
  if (offers.length === 0) {
    return <></>;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={AppRoute.ROOT}
          render={() => (
            <MainWrapped
              onChangeCity={onChangeCity}
              offers={offers}
              currentCity={currentCity}
              cities={cities}
              authStatus={authStatus}
              userInfo={userInfo}
              errorStatus={errorStatus}
              resetError={resetError}
            />
          )}
        />
        <Route
          exact
          path={AppRoute.LOGIN}
          render={() => (
            authStatus === AuthStatus.NO_AUTH
              ? <SignInWrapped city={currentCity} onSubmit={logIn} errorStatus={errorStatus} resetError={resetError}/>
              : <Redirect to={AppRoute.ROOT}/>
          )}
        />
        <Route
          exact
          path={AppRoute.OFFER + `/:id`}
          render={(routeProps) => {
            const id = parseInt(routeProps.match.params.id, 10);
            const activeOffer = offers.find((item) => item.id === id);

            return (
              <OfferDetailsWrapped
                offer={activeOffer}
                id={id}
                authStatus={authStatus}
                userInfo={userInfo}
                errorStatus={errorStatus}
                resetError={resetError}
              />
            );
          }}
        />
        <Route
          exact
          path={AppRoute.FAVORITES}
          render={() => (
            authStatus === AuthStatus.AUTH
              ? <FavoritesWrapped authStatus={authStatus} userInfo={userInfo} errorStatus={errorStatus} resetError={resetError}/>
              : <Redirect to={AppRoute.LOGIN}/>
          )}
        />
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
  },
  resetError() {
    dispatch(ErrorActionCreator.resetError());
  },
});

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state),
  offers: getCityOffers(state),
  cities: getCities(state),
  authStatus: getAuthStatus(state),
  userInfo: getUserInfo(state),
  errorStatus: getErrorStatus(state),
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
