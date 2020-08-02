import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as cityPlaces} from "./city-places/city-places";
import {reducer as user} from "./user/user";
import {reducer as errors} from "./errors/errors";
import {NameSpace} from "./name-space";
import {CombineStore} from "./reduсer.model";

export default combineReducers<CombineStore>({
  [NameSpace.DATA]: data,
  [NameSpace.CITY_PLACES]: cityPlaces,
  [NameSpace.USER]: user,
  [NameSpace.ERRORS]: errors
})
