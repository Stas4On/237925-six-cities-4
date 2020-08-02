import MockAdapter from 'axios-mock-adapter';
import {createAPI} from "../../api/api";
import {ActionCreator, ActionType, Operation, reducer} from "./user";
import {AuthStatus} from "../../models/models";
import {API_MOCK_APP_USER} from "../../mocks/test-mocks";
import {AnyAction} from "redux";

const api = createAPI(() => {}, () =>{});

describe(`User reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, ({} as AnyAction))).toEqual({
      authStatus: AuthStatus.NO_AUTH,
      userInfo: null
    });
  });

  it(`Reducer should change authStatus by a given value`, () => {
    expect(reducer({
      authStatus: AuthStatus.NO_AUTH,
      userInfo: null
    }, {
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: AuthStatus.AUTH
    })).toEqual({
      authStatus: AuthStatus.AUTH,
      userInfo: null
    });

    expect(reducer({
      authStatus: AuthStatus.AUTH,
      userInfo: null
    }, {
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: AuthStatus.NO_AUTH
    })).toEqual({
      authStatus: AuthStatus.NO_AUTH,
      userInfo: null
    });

    expect(reducer({
      authStatus: AuthStatus.AUTH,
      userInfo: null
    }, {
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: AuthStatus.AUTH,
    })).toEqual({
      authStatus: AuthStatus.AUTH,
      userInfo: null
    });

    expect(reducer({
      authStatus: AuthStatus.NO_AUTH,
      userInfo: null
    }, {
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: AuthStatus.NO_AUTH
    })).toEqual({
      authStatus: AuthStatus.NO_AUTH,
      userInfo: null
    });
  });

  it(`Reducer should set user`, () => {
    const nextUser = {
      id: 1,
      email: `ivan@gmail.com`,
      name: `Ivan`,
      isPro: true,
      avatarUrl: `img/ivan.png`
    };
    expect(reducer({
      authStatus: AuthStatus.AUTH,
      userInfo: null
    }, {
      type: ActionType.USER_AUTH,
      payload: nextUser
    })).toEqual({
      authStatus: AuthStatus.AUTH,
      userInfo: nextUser
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.changeAuthStatus(AuthStatus.NO_AUTH)).toEqual({
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: AuthStatus.NO_AUTH
    });

    expect(ActionCreator.changeAuthStatus(AuthStatus.AUTH)).toEqual({
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: AuthStatus.AUTH
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /login - check auth success`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authChecker = Operation.checkAuth();
    apiMock
      .onGet(`/login`)
      .reply(200, API_MOCK_APP_USER);

    return authChecker(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: AuthStatus.AUTH
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.USER_AUTH,
          payload: API_MOCK_APP_USER
        });
      });
  });
  it(`Should make a correct API call to /login - login success`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const signIn = Operation.logIn({
      login: `angelina@gmail.com`,
      password: `6_cities`
    });
    apiMock
      .onPost(`/login`)
      .reply(200, API_MOCK_APP_USER);

    return signIn(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: AuthStatus.AUTH
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.USER_AUTH,
          payload: API_MOCK_APP_USER
        });
      });
  });
});
