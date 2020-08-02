import {AuthStatus, OfferModel, OfferType, ReviewModel, SortType, User} from "../models/models";
import configureStore from 'redux-mock-store';
import {CombineStore} from "../reducer/reduсer.model";
import {NameSpace} from "../reducer/name-space";
import {ServerModels} from "../models/server-models";
import City = ServerModels.City;
import OfferServerModel = ServerModels.OfferServerModel;

export const TEST_OFFERS: OfferModel[] = [
  {
    city: {
      name: `Paris`,
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    name: `Beautiful &amp; luxurious apartment at great location`,
    price: 120,
    rating: 4,
    type: OfferType.APARTMENT,
    img_url: `img/room.jpg`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    features: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    photos: [`img/room.jpg`, `img/apartment-03.jpg`, `img/room.jpg`, `img/apartment-02.jpg`, `img/room.jpg`, `img/apartment-01.jpg`],
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 13
    },
    bedrooms: 2,
    guests: 4,
    owner: {
      avatar_url: "img/avatar-angelina.jpg",
      id: 25,
      is_pro: true,
      name: "Angelina"
    },
    favorite: false,
    premium: true,
    id: 12
  },
  {
    city: {
      name: `Hamburg`,
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    name: `Wood and stone place`,
    price: 80,
    rating: 3.5,
    type: OfferType.PRIVATE_ROOM,
    img_url: `img/room.jpg`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    features: [`Wi-Fi`, `Washing machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    photos: [`img/room.jpg`, `img/apartment-03.jpg`, `img/room.jpg`, `img/apartment-02.jpg`, `img/room.jpg`, `img/apartment-01.jpg`],
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 13
    },
    bedrooms: 2,
    guests: 4,
    owner: {
      avatar_url: "img/avatar-angelina.jpg",
      id: 25,
      is_pro: true,
      name: "Angelina"
    },
    favorite: false,
    premium: false,
    id: 31
  },
  {
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    name: `Canal View Prinsengracht`,
    price: 132,
    rating: 2.33,
    type: OfferType.APARTMENT,
    img_url: `img/room.jpg`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    features: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`],
    photos: [`img/room.jpg`, `img/apartment-03.jpg`, `img/room.jpg`, `img/apartment-02.jpg`, `img/room.jpg`, `img/apartment-01.jpg`],
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 13
    },
    bedrooms: 2,
    guests: 4,
    owner: {
      avatar_url: "img/avatar-angelina.jpg",
      id: 25,
      is_pro: true,
      name: "Angelina"
    },
    favorite: false,
    premium: false,
    id: 23
  },
  {
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    name: `Nice, cozy, warm big bed apartment`,
    price: 180,
    rating: 4.5,
    type: OfferType.APARTMENT,
    img_url: `img/room.jpg`,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    features: [`Wi-Fi`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    photos: [`img/room.jpg`, `img/apartment-03.jpg`, `img/room.jpg`, `img/apartment-02.jpg`, `img/room.jpg`, `img/apartment-01.jpg`],
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 13
    },
    bedrooms: 2,
    guests: 4,
    owner: {
      avatar_url: "img/avatar-angelina.jpg",
      id: 25,
      is_pro: true,
      name: "Angelina"
    },
    favorite: false,
    premium: true,
    id: 1
  }
];

export const IMAGES = [`img/room.jpg`, `img/apartment-03.jpg`, `img/room.jpg`, `img/apartment-02.jpg`, `img/room.jpg`, `img/apartment-01.jpg`];

export const CITIES: string[] = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

export const DATES: string[] = [
  `2020-08-01T17:23:20.868Z`,
  `2020-05-12T10:45:26.234Z`
];

export const SENTENCES: string[] = [
  `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!`,
  `Bathed in the nature. Completely unplugged. Unforgettable.`
];

export const USERS: User[] = [
  {
    avatar_url: `/user1_avatar`,
    id: 10,
    is_pro: true,
    name: `Anna`
  },
  {
    avatar_url: `/user2_avatar`,
    id: 20,
    is_pro: true,
    name: `Peter`
  }
];

export const APP_USERS = USERS.map((user) => Object.assign({}, user, {email: `user@gmail.com`}));

export const REVIEWS: ReviewModel[] = [{
  id: 1,
  user: USERS[0],
  rating: 4,
  comment: SENTENCES[0],
  date: DATES[0]
}, {
  id: 2,
  user: USERS[1],
  rating: 5,
  comment: SENTENCES[1],
  date: DATES[1]
}];

const mockStore = configureStore([]);

export const STORE_WITH_AUTH = mockStore({
  [NameSpace.USER]: {
    authStatus: AuthStatus.AUTH,
    userInfo: APP_USERS[0]
  },
  [NameSpace.CITY_PLACES]: {
    cities: CITIES,
    activeSort: SortType.POPULAR,
    currentCity: `Paris`
  },
  [NameSpace.DATA]: {
    offers: TEST_OFFERS,
    nearOffers: TEST_OFFERS.slice(0, 2),
    reviews: REVIEWS,
    favoriteOffers: TEST_OFFERS.filter((offer) => offer.favorite)
  },
  [NameSpace.ERRORS]: {
    errorStatus: null
  }
} as CombineStore);

export const STORE_WITH_NO_AUTH = mockStore({
  [NameSpace.USER]: {
    authStatus: AuthStatus.NO_AUTH,
    userInfo: null
  },
  [NameSpace.CITY_PLACES]: {
    cities: CITIES,
    activeSort: SortType.POPULAR,
    currentCity: `Paris`
  },
  [NameSpace.DATA]: {
    offers: TEST_OFFERS,
    nearOffers: [],
    reviews: [],
    favoriteOffers: []
  },
  [NameSpace.ERRORS]: {
    errorStatus: null
  }
} as CombineStore);

export const STORE_WITHOUT_OFFERS = mockStore({
  [NameSpace.USER]: {
    authStatus: AuthStatus.NO_AUTH,
    userInfo: null
  },
  [NameSpace.CITY_PLACES]: {
    cities: CITIES,
    activeSort: SortType.POPULAR,
    currentCity: `Paris`
  },
  [NameSpace.DATA]: {
    offers: [],
    nearOffers: [],
    reviews: [],
    favoriteOffers: []
  },
  [NameSpace.ERRORS]: {
    errorStatus: null
  }
} as CombineStore);

export const LOCATIONS: City[] = [
  {
    name: `Paris`,
    location: {
      latitude: 1,
      longitude: 1,
      zoom: 13
    }
  },
  {
    name: `Dusseldorf`,
    location: {
      latitude: 2,
      longitude: 2,
      zoom: 13
    }
  }
];

export const API_MOCK_OFFERS: OfferServerModel[] = [{
  'bedrooms': 3,
  'city': LOCATIONS[1],
  'description': SENTENCES[1],
  'goods': [`Breakfast`, `Laptop friendly workspace`, `Washer`],
  'host': {
    'avatar_url': `avatar`,
    'id': 1,
    'is_pro': true,
    'name': `Alena`
  },
  'id': 1,
  'images': IMAGES,
  'is_favorite': true,
  'is_premium': true,
  'location': LOCATIONS[1].location,
  'max_adults': 3,
  'preview_image': IMAGES[0],
  'price': 600,
  'rating': 3,
  'title': `Amazing and Extremely Central Flat`,
  'type': OfferType.PRIVATE_ROOM
}];

export const API_MOCK_REVIEWS = [{
  'comment': SENTENCES[1],
  'date': DATES[1],
  'id': 1,
  'rating': 3.5,
  'user': {
    'avatar_url': `img/avatar-angelina.jpg`,
    'id': 1,
    'is_pro': true,
    'name': `Alena`
  }
}];

export const API_MOCK_APP_USER = {
  'id': 1,
  'email': `angelina@gmail.com`,
  'name': `Angelina`,
  'avatar_url': `img/avatar-angelina.jpg`,
  'is_pro': true
};
