import * as React from "react";
import OfferCard from "../offer-card/offer-card";
import {OfferModel} from "../../models";

interface Props {
  offers: OfferModel[];
  onTitleCardClick: (offerId) => void;
  handleItemEvent: (offerId) => void;
}

const OffersList: React.FunctionComponent<Props> = (props: Props) => {
  const {offers, onTitleCardClick, handleItemEvent} = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((card) => <OfferCard key={card.id} offerCard={card} onTitleCardClick={onTitleCardClick} onFocus={handleItemEvent}/>)}
    </div>
  );
};

export default OffersList;
