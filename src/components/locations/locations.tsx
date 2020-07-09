import * as React from "react";
import {MAX_CITIES_LENGTH} from "../../constants";

interface Props {
  currentCity: string;
  cities: string[];
  onChangeCity: (city: string) => void;
}

const Locations: React.FunctionComponent<Props> = ({onChangeCity, currentCity, cities}) => {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((item, index) => index <= MAX_CITIES_LENGTH && (
          <li className="locations__item" key={item}>
            <a
              className={`${item === currentCity ? `tabs__item--active` : ``} locations__item-link tabs__item`}
              href="#"
              onClick={() => {
                onChangeCity(item);
              }}
            >
              <span>{item}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Locations;
