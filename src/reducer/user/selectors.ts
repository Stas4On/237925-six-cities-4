import {NameSpace} from "../name-space";

const NAME_SPACE = NameSpace.USER;

export const getAuthStatus = (state) => (state[NAME_SPACE].authStatus);
export const getUserInfo = (state) => (state[NAME_SPACE].userInfo);
