import * as React from "react";
import {connect} from 'react-redux';
import {AppRoute} from "../../constants/constants";
import {Link} from "react-router-dom";
import {ActionCreator} from "../../reducer/city-places/city-places";

interface Props {
  city: string;
  currentCity: string;
  onChangeCity: (city: string) => void;
  isNavigation: boolean;
}

const LocationsItem: React.FunctionComponent<Props> = ({city, currentCity, onChangeCity, isNavigation}) => {
  const activeClass = city === currentCity ? `tabs__item--active` : ``;

  return isNavigation ? (
    <li className="locations__item" key={city}>
      <a
        className={`locations__item-link tabs__item ${activeClass}`}
        href="#"
        onClick={() => {
          onChangeCity(city);
        }}
      >
        <span>{city}</span>
      </a>
    </li>
  ) : (
    <div className="locations__item" key={city}>
      <Link to={AppRoute.ROOT} className={`locations__item-link tabs__item ${activeClass}`}
        onClick={() => {
          onChangeCity(city);
        }}
      >
        <span>{city}</span>
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch, props) => ({
  onChangeCity(city) {
    if (props.currentCity === city) {
      return;
    }
    dispatch(ActionCreator.changeCity(city));
  }
});

export {LocationsItem};
export default connect(null, mapDispatchToProps)(LocationsItem);
