import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as cityPlaces} from "./city-places/city-places";
import {NameSpace} from "./name-space";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.CITY_PLACES]: cityPlaces,
})
