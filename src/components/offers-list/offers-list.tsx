import * as React from "react";
import OfferCard from "../offer-card/offer-card";
import {OfferModel} from "../../models";

interface Props {
  offers: OfferModel[];
  handleItemEvent: (offerId) => void;
}

const OffersList: React.FunctionComponent<Props> = ({offers, handleItemEvent}) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((card) => <OfferCard key={card.id} offerCard={card} onFocus={handleItemEvent}/>)}
    </div>
  );
};

export default OffersList;
