export enum OfferType {
  PRIVATE_ROOM = `Private room`,
  APARTMENT = `Apartment`,
  HOUSE = `House`,
  HOTEL = `Hotel`
}

export interface Offer {
  type: OfferType
}

export interface OfferModel {
  city: City,
  name: string,
  price: number,
  rating: number,
  type: string,
  imgUrl: string,
  description: string,
  features: string[],
  photos: string[],
  coordinates: number[],
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

interface Location {
  latitude: number,
  longitude: number,
  zoom: number
}
