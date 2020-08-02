import {reducer, ActionCreator, ActionType} from './city-places';
import {SortType} from "../../models/models";
import {AnyAction} from "redux";
import {CITIES} from "../../mocks/test-mocks";

const initialState = {
  currentCity: CITIES[0],
  activeSort: SortType.POPULAR,
  cities: CITIES
};
describe(`Reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(initialState, ({} as AnyAction))).toEqual(initialState);
  });

  it(`Reducer should change city`, () => {
    expect(reducer({
      cities: CITIES,
      currentCity: CITIES[0],
      activeSort: SortType.POPULAR,
      currentOffer: null,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: CITIES[1],
    })).toEqual({
      cities: CITIES,
      currentCity: CITIES[1],
      activeSort: SortType.POPULAR,
      currentOffer: null,
    });
  });

  it(`Reducer should change sort type`, () => {
    expect(reducer({
      cities: CITIES,
      currentCity: CITIES[0],
      activeSort: SortType.POPULAR,
      currentOffer: null,
    }, {
      type: ActionType.CHANGE_SORT,
      payload: SortType.TOP_RATED,
    })).toEqual({
      cities: CITIES,
      currentCity: CITIES[0],
      activeSort: SortType.TOP_RATED,
      currentOffer: null,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.changeCity(1)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: 1,
    });
  });

  it(`Action creator for change sort returns correct action`, () => {
    expect(ActionCreator.changeSort(1)).toEqual({
      type: ActionType.CHANGE_SORT,
      payload: 1,
    });
  });
});
