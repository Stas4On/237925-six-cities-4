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

export enum AuthStatus {
  NO_AUTH = `NO_AUTH`,
  AUTH = `AUTH`
}

export enum OfferCardPrefix {
  CITIES = `cities`,
  FAVORITES = `favorites`,
  NEAR_PLACES = `near-places`
}

export interface OfferModel {
  city: City,
  name: string,
  price: number,
  rating: number,
  type: OfferType,
  img_url: string,
  description: string,
  features: string[],
  photos: string[],
  location: Location,
  bedrooms: number,
  guests: number,
  owner: User,
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

export interface UserAuthenticationData {
  login: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  is_pro: boolean;
  avatar_url: string;
  email?: string;
}

export interface ReviewModel {
  id: number;
  comment: string;
  date: string;
  user: User;
  rating: number;
}
