import * as React from "react";
import {OfferModel} from "../../models";
import Locations from "../locations/locations";
import withActiveItem from "../../hocs/with-active-item";
import CityPlaces from "../city-places/city-places";
import CityPlacesEmpty from "../city-places-empty/city-places-empty";

interface Props {
  offers: OfferModel[];
  onTitleCardClick: (offerId) => void;
  currentCity: string;
  cities: string[];
  onChangeCity: (city: string) => void;
}

const CityPlacesWrapped = withActiveItem(CityPlaces);

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {currentCity, offers, cities, onTitleCardClick, onChangeCity} = props;
  return <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41}/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
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
            onTitleCardClick={onTitleCardClick}
          />
          : <CityPlacesEmpty
            currentCity={currentCity}
          />}
      </div>
    </main>
  </div>;
};

export default Main;
