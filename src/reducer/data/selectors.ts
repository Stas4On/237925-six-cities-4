import {createSelector} from "reselect";
import {SortType} from "../../models";
import {NameSpace} from "../name-space";

const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
}
const getActiveSortType = (state) => {
  return state[NameSpace.CITY_PLACES].activeSort;
}
const getCurrentCity = (state) => {
  return state[NameSpace.CITY_PLACES].currentCity;
}

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
