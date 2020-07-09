import * as React from "react";
import CityMap from "../city-map/city-map";
import OffersList from "../offers-list/offers-list";
import {OfferModel} from "../../models";
import withStatus from "../../hocs/with-status";
import Sort from "../sort/sort";

interface Props {
  currentCity: string;
  offers: OfferModel[];
  onTitleCardClick: (offerId) => void;
  handleItemEvent: (offerId) => void;
  activeItemId: number;
}

const SortWrapped = withStatus(Sort);

const CityPlaces: React.FunctionComponent<Props> = ({currentCity, offers, onTitleCardClick, handleItemEvent, activeItemId}) => {
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity}</b>
        <SortWrapped/>
        <OffersList
          offers={offers}
          onTitleCardClick={onTitleCardClick}
          handleItemEvent={handleItemEvent}
        />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <CityMap
            city={offers[0].city.location}
            offers={offers}
            activeOfferId={activeItemId}
          />
        </section>
      </div>
    </div>
  );
};

export default CityPlaces;
