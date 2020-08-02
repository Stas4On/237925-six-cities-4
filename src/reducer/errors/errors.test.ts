import {reducer, ActionType} from './errors';

describe(`Errors reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void null, {})).toEqual({
      errorStatus: null
    });
  });

  it(`Reducer should set error status`, () => {
    expect(reducer({
      errorStatus: null
    }, {
      type: ActionType.SET_ERROR_STATUS,
      payload: 404
    })).toEqual({
      errorStatus: 404
    });
  });

  it(`Reducer should reset error status`, () => {
    expect(reducer({
      errorStatus: 404
    }, {
      type: ActionType.RESET_ERROR,
      payload: null
    })).toEqual({
      errorStatus: null
    });
  });
});
