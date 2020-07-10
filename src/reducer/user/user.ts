import {AuthStatus, UserAuthenticationData} from "../../models";
import {ActionCreatorsMapObject, Reducer} from "redux";
import {extend} from "../../common/utils";
import {AxiosInstance} from "axios";
import {UserStore} from "../reduser.model";

const initialState: UserStore = {
  authStatus: AuthStatus.NO_AUTH,
  userInfo: null
}

enum ActionType {
  CHANGE_AUTHORIZATION_STATUS = `CHANGE_AUTHORIZATION_STATUS`,
  USER_AUTH = `USER_AUTH`
}

const ActionCreator: ActionCreatorsMapObject = {
  changeAuthStatus: (status: AuthStatus) => ({
    type: ActionType.CHANGE_AUTHORIZATION_STATUS,
    payload: status
  }),
  userInfo: (userInfo: UserAuthenticationData) => ({
    type: ActionType.USER_AUTH,
    payload: userInfo
  })
}

const Operation = {
  checkAuth: () => (dispatch, getState, api: AxiosInstance) => {
    return api.get(`/login`)
      .then((authInfo) => {
        dispatch(ActionCreator.changeAuthStatus(AuthStatus.AUTH))
        dispatch(ActionCreator.userInfo(authInfo.data))
      })
  },
  logIn: (authData: UserAuthenticationData) => (dispatch, getState, api: AxiosInstance) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password
    })
      .then((authInfo) => {
        dispatch(ActionCreator.changeAuthStatus(AuthStatus.AUTH))
        dispatch(ActionCreator.userInfo(authInfo.data))
      })
  }
}

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_AUTHORIZATION_STATUS:
      return extend(state, {
        authStatus: action.payload
      })
    case ActionType.USER_AUTH:
      return extend(state, {
        userInfo: action.payload
      })
  }

  return state;
}

export {reducer, ActionType, ActionCreator, Operation};
