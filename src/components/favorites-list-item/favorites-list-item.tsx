import * as React from 'react';
import {OfferCardPrefix, OfferModel} from "../../models/models";
import OfferCard from "../offer-card/offer-card";
import LocationsItem from "../locations-item/locations-item";

interface Props {
  city: string;
  offers: OfferModel[];
}

const FavoritesListItem: React.FC<Props> = ({city, offers}) => {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <LocationsItem
          nodeType="div"
          city={city}
        />
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            prefix={OfferCardPrefix.FAVORITES}
            offerCard={offer}
          />
        ))}
      </div>
    </li>
  );
};

export default React.memo(FavoritesListItem);
