import {ServerModels} from "./server-models";
import OfferServerModel = ServerModels.OfferServerModel;
import {OfferModel} from "../models";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const noop = () => {
  // do nothing
};

export const getCityOffers = (currentCity, offers) => {
  return offers.filter((offer) => offer.city.name === currentCity);
};
export const getCities = (offers) => {
  const cities = offers.map((offer) => offer.city.name);
  return Array.from(new Set(cities));
};

export const getEnumKeys = <T>(obj: T) => {
  return (Object.keys(obj) as Array<keyof T>);
}

export const mapOfferFromAPI = (offers: OfferServerModel[]):OfferModel[]  => {
  if(!offers) {
    return null;
  }

  return (offers.map((offer) => {
    return ({
      city: offer.city,
      name: offer.title,
      imgUrl: offer.preview_image,
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
      owner: offer.host.name,
      avatar: offer.host.avatar_url,
      price: offer.price
    })
  }))
}
