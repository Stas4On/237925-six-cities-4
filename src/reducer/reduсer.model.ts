import {AuthStatus, OfferModel, User} from "../models";

export interface DataStore {
  offers: OfferModel[];
  favoriteOffers: OfferModel[];
}

export interface CityPlacesStore {
  cities: string[],
  currentCity: string,
  activeSort: string
}

export interface NearbyStore {
  nearby: OfferModel[]
}

export interface UserStore {
  authStatus: AuthStatus,
  userInfo: User,
}
