import {AuthStatus, OfferModel, ReviewModel, User} from "../models/models";
import {NameSpace} from "./name-space";

export interface DataStore {
  offers: OfferModel[];
  favoriteOffers: OfferModel[];
  nearOffers: OfferModel[];
  reviews: ReviewModel[];
}

export interface CityPlacesStore {
  cities: string[],
  currentCity: string,
  activeSort: string
}

export interface UserStore {
  authStatus: AuthStatus,
  userInfo: User,
}

export interface ErrorsStore {
  errorStatus: number
}

export interface CombineStore {
  [NameSpace.DATA]: DataStore,
  [NameSpace.CITY_PLACES]: CityPlacesStore,
  [NameSpace.USER]: UserStore,
  [NameSpace.ERRORS]: ErrorsStore
}
