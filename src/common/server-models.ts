import {OfferType} from "../models";

export namespace ServerModels {

  export interface City {
    name: string;
    location: Location;
  }

  export interface Host {
    id: number;
    name: string;
    is_pro: boolean;
    avatar_url: string;
  }

  export interface Location {
    latitude: number;
    longitude: number;
    zoom: number;
  }

  export interface OfferServerModel {
    city: City;
    preview_image: string;
    images: string[];
    title: string;
    is_favorite: boolean;
    is_premium: boolean;
    rating: number;
    type: OfferType;
    bedrooms: number;
    max_adults: number;
    price: number;
    goods: string[];
    host: Host;
    description: string;
    location: Location;
    id: number;
  }

}

