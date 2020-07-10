import {NameSpace} from "../name-space";

const NAME_SPACE = NameSpace.CITY_PLACES;

export const getCities = (state) => (state[NAME_SPACE].cities);
export const getCurrentCity = (state) => (state[NAME_SPACE].currentCity);
export const getActiveSort = (state) => (state[NAME_SPACE].activeSort);
export const getActiveSortType = (state) => (state[NAME_SPACE].activeSort);
