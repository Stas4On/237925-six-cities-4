import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as cityPlaces} from "./city-places/city-places";
import {reducer as user} from "./user/user";
import {NameSpace} from "./name-space";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.CITY_PLACES]: cityPlaces,
  [NameSpace.USER]: user
})
