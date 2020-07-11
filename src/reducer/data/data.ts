import {extend, mapOfferFromAPI, mapOffersFromAPI} from "../../common/utils";
import {ActionCreatorsMapObject, Reducer} from "redux";
import {OfferModel} from "../../models";
import {AxiosInstance} from "axios";
import {ServerModels} from "../../common/server-models";
import OfferServerModel = ServerModels.OfferServerModel;
import {DataStore} from "../reduсer.model";
import {getOffers} from "./selectors";

const initialState: DataStore = {
  offers: [],
  favoriteOffers: []
};

enum ActionType {
  LOAD_OFFERS = `LOAD_OFFERS`,
  LOAD_FAVORITE_OFFERS = `LOAD_FAVORITE_OFFERS`,
  TOGGLE_FAVORITE = `TOGGLE_FAVORITE`
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
  })
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
        dispatch(Operation.loadFavoriteOffers());
      })
  },
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
      })
      return extend(state, {
        offers: updatedOffers
      })
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
