import {extend, mapOfferFromAPI} from "../../common/utils";
import {ActionCreatorsMapObject, Reducer} from "redux";
import {SortType} from "../../models";
import {AxiosInstance} from "axios";
import {CITIES} from "../../constants";
import {ServerModels} from "../../common/server-models";
import OfferServerModel = ServerModels.OfferServerModel;
import {DataStore} from "../reduser.model";

const initialCity: string = CITIES[0];

const initialState: DataStore = {
  offers: []
};

enum ActionType {
  LOAD_OFFERS = `LOAD_OFFERS`
};

const ActionCreator: ActionCreatorsMapObject = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  })
};

const Operation = {
  loadOffers: () => (dispatch, getState, api: AxiosInstance) => {
    return api.get<OfferServerModel[]>(`/hotels`)
      .then((response) => {
        const offers = mapOfferFromAPI(response.data);
        dispatch(ActionCreator.loadOffers(offers));
      })
  }
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
