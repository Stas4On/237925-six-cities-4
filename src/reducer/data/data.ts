import {extend, mapOfferFromAPI, mapOffersFromAPI} from "../../common/utils";
import {ActionCreatorsMapObject, Reducer} from "redux";
import {ReviewModel, OfferModel} from "../../models/models";
import {AxiosInstance} from "axios";
import {ServerModels} from "../../models/server-models";
import OfferServerModel = ServerModels.OfferServerModel;
import {DataStore} from "../reduсer.model";

const initialState: DataStore = {
  offers: [],
  favoriteOffers: [],
  nearOffers: [],
  reviews: []
};

enum ActionType {
  LOAD_OFFERS = `LOAD_OFFERS`,
  LOAD_FAVORITE_OFFERS = `LOAD_FAVORITE_OFFERS`,
  TOGGLE_FAVORITE = `TOGGLE_FAVORITE`,
  LOAD_NEAR_OFFERS = `LOAD_NEARBY`,
  LOAD_REVIEWS = `LOAD_REVIEWS`,
  UPDATE_REVIEWS = `UPDATE_REVIEWS`,
};

const ActionCreator: ActionCreatorsMapObject = {
  loadOffers: (offers: OfferModel[]) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  }),
  loadFavoriteOffers: (offers: OfferModel[]) => ({
    type: ActionType.LOAD_FAVORITE_OFFERS,
    payload: offers
  }),
  toggleFavorite: (offer: OfferModel) => ({
    type: ActionType.TOGGLE_FAVORITE,
    payload: offer
  }),
  loadNearOffers: (nearOffers: OfferModel[]) => ({
    type: ActionType.LOAD_NEAR_OFFERS,
    payload: nearOffers,
  }),
  loadReviews: (reviews: ReviewModel[]) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews
  }),
  updateReviews: (review: ReviewModel) => ({
    type: ActionType.UPDATE_REVIEWS,
    payload: review
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api: AxiosInstance) => {
    return api.get<OfferServerModel[]>(`/hotels`)
      .then((response) => {
        const offers = mapOffersFromAPI(response.data);
        dispatch(ActionCreator.loadOffers(offers));
      })
  },
  loadFavoriteOffers: () => (dispatch, getState, api: AxiosInstance) => {
    return api.get<OfferServerModel[]>(`/favorite`)
      .then((response) => {
        const offers = mapOffersFromAPI(response.data);
        dispatch(ActionCreator.loadFavoriteOffers(offers));
      })
  },
  toggleFavorite: (id, isFavorite) => (dispatch, getState, api: AxiosInstance) => {
    return api.post<OfferServerModel>(`/favorite/${id}/${isFavorite ? 0 : 1}`)
      .then((response) => {
        const offer = mapOfferFromAPI(response.data);
        dispatch(ActionCreator.toggleFavorite(offer));
      })
  },
  loadNearOffers: (id) => (dispatch, getState, api: AxiosInstance) => {
    return api.get<OfferServerModel[]>(`/hotels/${id}/nearby`)
      .then((response) => {
        const offers = mapOffersFromAPI(response.data);
        dispatch(ActionCreator.loadNearOffers(offers));
      })
      .catch(() => {});
  },

  loadReviews: (id) => (dispatch, getState, api: AxiosInstance) => {
    return api.get<ReviewModel[]>(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      })
      .catch(() => {});
  },

  updateReviews: (id, review) => (dispatch, getState, api: AxiosInstance) => {
    return api.post(`/comments/${id}`, {
      rating: review.rating,
      comment: review.comment
    })
      .then((response) => {
        dispatch(ActionCreator.updateReviews(response.data));
      })
      .catch(() => {});
  }
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload
      });
    case ActionType.LOAD_FAVORITE_OFFERS:
      return extend(state, {
        favoriteOffers: action.payload
      });
    case ActionType.TOGGLE_FAVORITE:
      const updatedOffers = state.offers.map((offer) => {
        return offer.id === action.payload.id ? action.payload : offer;
      });
      const updatedNearOffers = state.nearOffers.map((nearOffer) => {
        return nearOffer.id === action.payload.id ? action.payload : nearOffer;
      });

      return extend(state, {
        offers: updatedOffers,
        nearOffers: updatedNearOffers,
        favoriteOffers: action.payload.favorite ? [...state.favoriteOffers, action.payload] : state.favoriteOffers.filter((offer) => offer.id !== action.payload.id)
      })
    case ActionType.LOAD_NEAR_OFFERS:
      return extend(state, {
        nearOffers: action.payload
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload
      });
    case ActionType.UPDATE_REVIEWS:
      return extend(state, {
        reviews: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
