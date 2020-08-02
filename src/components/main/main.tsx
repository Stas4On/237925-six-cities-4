import * as React from "react";
import {AuthStatus, OfferModel, User} from "../../models/models";
import Locations from "../locations/locations";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import CityPlaces from "../city-places/city-places";
import CityPlacesEmpty from "../city-places-empty/city-places-empty";
import Header from "../header/header";

interface Props {
  offers: OfferModel[];
  currentCity: string;
  cities: string[];
  onChangeCity: (city: string) => void;
  authStatus: AuthStatus;
  userInfo: User;
}

const CityPlacesWrapped = withActiveItem(CityPlaces);

const Main: React.FunctionComponent<Props> = ({currentCity, offers, cities, onChangeCity, userInfo, authStatus}) => {
  return <div className="page page--gray page--main">
    <Header authStatus={authStatus} userInfo={userInfo} />
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations onChangeCity={onChangeCity} currentCity={currentCity} cities={cities}/>
      </div>
      <div className="cities">
        {offers.length
          ? <CityPlacesWrapped
            offers={offers}
            currentCity={currentCity}
          />
          : <CityPlacesEmpty
            currentCity={currentCity}
          />}
      </div>
    </main>
  </div>;
};

export default Main;
