import {OFFERS} from "../mocks/offers";
import {extend, getCities, getCityOffers} from "../common/utils";


const initialCity = OFFERS[0].city.name;
const initialOffers = getCityOffers(initialCity, OFFERS);

const initialState = {
  currentCity: initialCity,
  offers: initialOffers,
  cities: null
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: {city}
  }),
  loadOffers: (currentCity = initialState.currentCity) => ({
    type: ActionType.LOAD_OFFERS,
    payload: {currentCity}
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: action.payload.city,
        offers: getCityOffers(action.payload.city, OFFERS)
      });
    case ActionType.LOAD_OFFERS:
      return extend(state, {offers: getCityOffers(action.payload.currentCity, OFFERS), cities: getCities(OFFERS)});
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
