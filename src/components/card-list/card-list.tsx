import * as React from "react";
import {PureComponent} from "react";
import OfferCard from "../offer-card/offer-card";
import {OfferCardModel} from "../../models";

interface Props {
  offers: OfferCardModel[];
  onTitleCardClick: (offerId) => void;
}

export class OffersList extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      activeOffer: null
    };
    this.handleFocusChange = this.handleFocusChange.bind(this);
  }

  render() {
    const {offers, onTitleCardClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((card) => <OfferCard key={card.id} offerCard={card} onTitleCardClick={onTitleCardClick} onFocus={this.handleFocusChange}/>)}
      </div>
    );
  }

  handleFocusChange(activeOffer) {
    this.setState(() => ({activeOffer}));
  }
}

export default OffersList;
