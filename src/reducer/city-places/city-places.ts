import {CITIES} from "../../constants/constants";
import {SortType} from "../../models/models";
import {ActionCreatorsMapObject, Reducer} from "redux";
import {extend} from "../../common/utils";
import {CityPlacesStore} from "../reduсer.model";

const initialCity: string = CITIES[0];

const initialState: CityPlacesStore = {
  currentCity: initialCity,
  activeSort: SortType.POPULAR,
  cities: CITIES
};

enum ActionType {
  CHANGE_CITY = `CHANGE_CITY`,
  CHANGE_SORT = `CHANGE_SORT`
};

const ActionCreator: ActionCreatorsMapObject = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  changeSort: (sortType) => ({
    type: ActionType.CHANGE_SORT,
    payload: sortType
  })
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: action.payload
      });
    case ActionType.CHANGE_SORT:
      return extend(state, {
        activeSort: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
