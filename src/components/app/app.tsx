import * as React from "react";
import Main from "../main/main";
import {OfferCardModel} from "../../models";
import OfferDetails from "../offer-details/offer-details";
import {BrowserRouter, Switch, Route} from "react-router-dom";

interface Props {
  numberRentalOffers: number;
  offers: OfferCardModel[];
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
    const {numberRentalOffers, offers} = this.props;

    if (this.state.activeOffer) {
      return <OfferDetails id={this.state.activeOffer} offers={offers} />;
    }

    return <Main
      numberRentalOffers={numberRentalOffers}
      offers={offers}
      onTitleCardClick={this._handleOfferTitleClick}
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

export default App;
