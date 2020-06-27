export enum OfferType {
  PRIVATE_ROOM = `Private room`,
  APARTMENT = `Apartment`,
  HOUSE = `House`,
  HOTEL = `Hotel`
}

export interface Offer {
  type: OfferType
}
