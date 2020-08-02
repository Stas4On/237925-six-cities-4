import * as React from "react";
import {MAX_CITIES_LENGTH} from "../../constants/constants";
import LocationsItem from "../locations-item/locations-item";

interface Props {
  currentCity: string;
  cities: string[];
  onChangeCity: (city: string) => void;
}

const Locations: React.FunctionComponent<Props> = ({currentCity, cities}) => {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city, index) => index <= MAX_CITIES_LENGTH && (
          <LocationsItem key={city} city={city} currentCity={currentCity} isNavigation={true} />
        ))}
      </ul>
    </section>
  );
};

export default Locations;
