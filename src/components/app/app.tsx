import * as React from "react";
import {connect} from "react-redux";
import Main from "../main/main";
import {OfferModel} from "../../models";
import OfferDetails from "../offer-details/offer-details";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {getCityOffers} from "../../reducer/data/selectors";
import {ActionCreator} from "../../reducer/city-places/city-places";
import {getCities, getCurrentCity} from "../../reducer/city-places/selectors";

interface Props {
  numberRentalOffers: number;
  offers: OfferModel[];
  currentCity: string;
  cities: string[];
  onChangeCity: (city: string) => void;
}

interface State {
  activeOffer: number;
}

class App extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      activeOffer: null
    };

    this._handleOfferTitleClick = this._handleOfferTitleClick.bind(this);
  }

  private _handleOfferTitleClick(activeOffer) {
    this.setState({activeOffer});
  }

  private _renderApp() {
    const {offers, currentCity, cities, onChangeCity} = this.props;

    if (this.state.activeOffer) {
      return <OfferDetails id={this.state.activeOffer} offers={offers}/>;
    }

    return <Main
      onChangeCity={onChangeCity}
      offers={offers}
      onTitleCardClick={this._handleOfferTitleClick}
      currentCity={currentCity}
      cities={cities}
    />;
  }

  render() {
    const {offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route path="/dev-offer-details">
            <OfferDetails id={this.state.activeOffer} offers={offers}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state),
  offers: getCityOffers(state),
  cities: getCities(state)
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
