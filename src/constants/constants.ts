import {OfferType, SortType} from "../models/models";

export const MAX_CITIES_LENGTH = 6;
export const MAX_NEAR_OFFERS_COUNT_TO_SHOW = 3;
export const MAX_COMMENTS_COUNT_TO_SHOW = 10;
export const RATING_MULTIPLIER: number = 20;
export const BASE_URL = `https://htmlacademy-react-3.appspot.com/six-cities`;

export const MONTHS = [
  `January`, `February`, `March`,
  `April`, `May`, `June`, `July`, `August`,
  `September`, `October`, `November`, `December`
];

export const RATINGS = [
  {
    value: 5,
    title: `perfect`
  },
  {
    value: 4,
    title: `good`
  },
  {
    value: 3,
    title: `not bad`
  },
  {
    value: 2,
    title: `badly`
  },
  {
    value: 1,
    title: `terribly`
  }
];

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
