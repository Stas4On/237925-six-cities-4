import {CITIES} from "../../constants";
import {SortType} from "../../models";
import {ActionCreatorsMapObject, Reducer} from "redux";
import {extend} from "../../common/utils";

const initialCity: string = CITIES[0];

const initialState = {
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
  changeSort: (sortType = initialState.activeSort) => ({
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
        activeSort: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
