import {ServerModels} from "../models/server-models";
import OfferServerModel = ServerModels.OfferServerModel;
import {OfferModel} from "../models/models";
import {MONTHS, RATING_MULTIPLIER} from "../constants/constants";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getOffersByCity = (offers, city) => {
  return offers.filter((offer) => offer.city.name === city);
};

export const getRoundedPercentageRating = (rating: number): string => `${Math.round(rating) * RATING_MULTIPLIER}%`;

export const getEnumKeys = <T>(obj: T) => {
  return (Object.keys(obj) as Array<keyof T>);
}

export const mapOffersFromAPI = (offers: OfferServerModel[]): OfferModel[] => {
  if (!offers) {
    return [];
  }

  return offers.map((offer) => mapOfferFromAPI(offer));
}

export const mapOfferFromAPI = (offer: OfferServerModel): OfferModel => {
  if (!offer) {
    return null;
  }

  return ({
    city: offer.city,
    name: offer.title,
    img_url: offer.preview_image,
    photos: offer.images,
    rating: offer.rating,
    type: offer.type,
    description: offer.description,
    features: offer.goods,
    id: offer.id,
    bedrooms: offer.bedrooms,
    guests: offer.max_adults,
    favorite: offer.is_favorite,
    premium: offer.is_premium,
    location: offer.location,
    owner: offer.host,
    price: offer.price
  })
}

const setLeadingZero = (value) => parseInt(value, 10) > 9 ? `${value}` : `0${value}`;

export const getDatetime = (DateString: string) => {
  const date = new Date(DateString);
  const year = date.getUTCFullYear();
  const month = setLeadingZero(date.getUTCMonth() + 1);
  const day = setLeadingZero(date.getUTCDate());
  const hours = setLeadingZero(date.getUTCHours());
  const minutes = setLeadingZero(date.getUTCMinutes());
  return `${year}:${month}:${day}T${hours}:${minutes}`;
};

export const formatDate = (DateString: string) => {
  const date = new Date(DateString);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};
