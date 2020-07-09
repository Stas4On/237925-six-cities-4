import {LatLngExpression} from "leaflet";

export enum OfferType {
  PRIVATE_ROOM = `room`,
  APARTMENT = `apartment`,
  HOUSE = `house`,
  HOTEL = `hotel`
}

export enum SortType {
  POPULAR =`popular`,
  TO_HIGH = `to-high`,
  TO_LOW = `to-low`,
  TOP_RATED = `top-rated`,
}

export interface OfferModel {
  city: City,
  name: string,
  price: number,
  rating: number,
  type: OfferType,
  imgUrl: string,
  description: string,
  features: string[],
  photos: string[],
  location: Location,
  bedrooms: number,
  guests: number,
  owner: string,
  avatar: string,
  favorite: boolean,
  premium: boolean,
  id: number
}

export interface City {
  name: string,
  location: Location
}

export interface Location {
  latitude: number,
  longitude: number,
  zoom: number
}
