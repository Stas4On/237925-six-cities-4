import {NameSpace} from "../name-space";

const NAME_SPACE = NameSpace.ERRORS;

export const getErrorStatus = (state) => {
  return state[NAME_SPACE].errorStatus
};
