import {createSelector} from "reselect";
import {SortType} from "../../models";
import {NameSpace} from "../name-space";
import {getActiveSortType, getCurrentCity} from "../city-places/selectors";

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => (state[NAME_SPACE].offers);

export const getCityOffers = createSelector(
  getOffers,
  getCurrentCity,
  getActiveSortType,
  (offers, currentCity, activeSort) => {
    const result = offers.filter((it) => (it.city.name === currentCity));
    switch (activeSort) {
      case SortType.POPULAR:
        return result;
      case SortType.TO_LOW:
        return (
          result.slice().sort((a, b) => (b.price - a.price))
        );
      case SortType.TO_HIGH:
        return (
          result.slice().sort((a, b) => (a.price - b.price))
        );
      case SortType.TOP_RATED:
        return (
          result.slice().sort((a, b) => (b.rating - a.rating))
        );
    }
    return result;
  }
);
