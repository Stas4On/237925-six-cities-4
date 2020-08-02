import * as React from "react";
import OfferCard from "../offer-card/offer-card";
import {OfferCardPrefix, OfferModel} from "../../models/models";

interface Props {
  prefix: string;
  offers: OfferModel[];
  handleItemEvent: (offerId) => void;
}

const OffersList: React.FunctionComponent<Props> = ({prefix, offers, handleItemEvent}) => {
  const offerListClasses = (prefix === OfferCardPrefix.CITIES)
    ? `cities__places-list places__list tabs__content`
    : `near-places__list places__list`;
  return (
    <div className={offerListClasses}>
      {offers.map((card) => <OfferCard key={card.id} offerCard={card} onFocus={handleItemEvent} prefix={prefix}/>)}
    </div>
  );
};

export default React.memo(OffersList);
