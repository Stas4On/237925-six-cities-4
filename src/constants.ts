import {OfferType, SortType} from "./models";

export const MAX_CITIES_LENGTH = 6;

export const CITIES: string[] = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

export const OfferTypeNames = {
  [OfferType.PRIVATE_ROOM]: `Private room`,
  [OfferType.APARTMENT]: `Apartment`,
  [OfferType.HOUSE]: `House`,
  [OfferType.HOTEL]: `Hotel`
}

export const SortTypeNames = {
  [SortType.POPULAR]: `Popular`,
  [SortType.TO_HIGH]: `Price: low to high`,
  [SortType.TO_LOW]: `Price: high to low`,
  [SortType.TOP_RATED]: `Top rated first`,
}

export const AppRoute = {
  ROOT: `/`,
  OFFER: `/offer`,
  FAVORITES: `/favorites`,
  LOGIN: `/login`
};
