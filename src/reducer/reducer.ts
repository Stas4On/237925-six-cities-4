import {OFFERS} from "../mocks/offers";
import {extend, getCities, getCityOffers} from "../common/utils";
import {ActionCreator, ActionCreatorsMapObject, Reducer} from "redux";
import {SortType} from "../models";

const initialCity = OFFERS[0].city.name;
const initialOffers = getCityOffers(initialCity, OFFERS);

const initialState = {
  currentCity: initialCity,
  activeSort: SortType.POPULAR,
  offers: initialOffers,
  cities: null
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT: `CHANGE_SORT`,
  LOAD_OFFERS: `LOAD_OFFERS`
};

const ActionCreator: ActionCreatorsMapObject = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: {city}
  }),
  changeSort: (sortType = initialState.activeSort) => ({
    type: ActionType.CHANGE_SORT,
    payload: sortType
  }),
  loadOffers: (currentCity = initialState.currentCity) => ({
    type: ActionType.LOAD_OFFERS,
    payload: {currentCity}
  })
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: action.payload.city,
        offers: getCityOffers(action.payload.city, OFFERS)
      });
    case ActionType.CHANGE_SORT:
      return extend(state, {
        activeSort: action.payload,
      });
    case ActionType.LOAD_OFFERS:
      return extend(state, {offers: getCityOffers(action.payload.currentCity, OFFERS), cities: getCities(OFFERS)});
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
