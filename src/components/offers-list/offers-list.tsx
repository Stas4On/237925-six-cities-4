import * as React from "react";
import {PureComponent} from "react";
import OfferCard from "../offer-card/offer-card";
import {OfferCardModel} from "../../models";

interface Props {
  offers: OfferCardModel[];
  onTitleCardClick: (offerId) => void;
}

interface State {
  activeOffer: number;
}

class OffersList extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      activeOffer: null
    };
    this._handleFocusChange = this._handleFocusChange.bind(this);
  }

  private _handleFocusChange(activeOffer) {
    this.setState(() => ({activeOffer}));
  }

  render() {
    const {offers, onTitleCardClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((card) => <OfferCard key={card.id} offerCard={card} onTitleCardClick={onTitleCardClick} onFocus={this._handleFocusChange}/>)}
      </div>
    );
  }
}

export default OffersList;
