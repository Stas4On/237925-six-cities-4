import MockAdapter from 'axios-mock-adapter';
import {reducer, ActionCreator, ActionType, Operation} from './data';
import {createAPI} from "../../api/api";
import {AnyAction} from "redux";
import {API_MOCK_OFFERS, API_MOCK_REVIEWS, REVIEWS, TEST_OFFERS} from "../../mocks/test-mocks";
import {mapOfferFromAPI, mapOffersFromAPI} from "../../common/utils";

const mockFn = jest.fn();
const api = createAPI(mockFn, mockFn);

const initialState = {
  offers: [],
  favoriteOffersOffers: [],
  nearOffers: [],
  reviews: []
};

const id = 1;

describe(`Reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(initialState, ({} as AnyAction))).toEqual(initialState);
  });

  it(`Reducer should load offers`, () => {
    expect(reducer({
      offers: [],
      favoriteOffers: [],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: TEST_OFFERS,
    })).toEqual({
      offers: TEST_OFFERS,
      favoriteOffers: [],
    });
  });

  it(`Reducer should load favoriteOffers`, () => {
    expect(reducer({
      offers: [],
      favoriteOffers: [],
    }, {
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: TEST_OFFERS,
    })).toEqual({
      offers: [],
      favoriteOffers: TEST_OFFERS,
    });
  });

  it(`Reducer should load comments`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: REVIEWS,
    })).toEqual({
      reviews: REVIEWS,
    });
  });

  it(`Reducer should post comments`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.UPDATE_REVIEWS,
      payload: [1, 2, 3],
    })).toEqual({
      reviews: [1, 2, 3],
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for load offers returns correct action`, () => {
    expect(ActionCreator.loadOffers(1)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: 1,
    });
  });

  it(`Action creator for load favoriteOffers returns correct action`, () => {
    expect(ActionCreator.loadFavoriteOffers(1)).toEqual({
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: 1,
    });
  });

  it(`Action creator for toggle city returns correct action`, () => {
    expect(ActionCreator.toggleFavorite(1)).toEqual({
      type: ActionType.TOGGLE_FAVORITE,
      payload: 1,
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();
    const adaptedApiMockOffers = mapOffersFromAPI(API_MOCK_OFFERS);

    apiMock
      .onGet(`/hotels`)
      .reply(200, API_MOCK_OFFERS);

    return offersLoader(dispatch, () => ({}), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: adaptedApiMockOffers
        });
      });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteOffersLoader = Operation.loadFavoriteOffers();
    const adaptedApiMockOffers = mapOffersFromAPI(API_MOCK_OFFERS);

    apiMock
      .onGet(`/favorite`)
      .reply(200, API_MOCK_OFFERS);

    return favoriteOffersLoader(dispatch, () => ({}), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE_OFFERS,
          payload: adaptedApiMockOffers
        });
      });
  });

  it(`Should make a correct API call to /favorite/${id}/0`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteOffersToggle = Operation.toggleFavorite(id, true);
    const adaptedApiMockOffer = mapOfferFromAPI(API_MOCK_OFFERS[0]);

    apiMock
      .onPost(`/favorite/${id}/0`)
      .reply(200, API_MOCK_OFFERS[0]);

    return favoriteOffersToggle(dispatch, () => ({}), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.TOGGLE_FAVORITE,
          payload: adaptedApiMockOffer,
        });
      });
  });

  it(`Should make a correct API call to /hotels/:id/nearby`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const nearOffersLoader = Operation.loadNearOffers(id);
    const adaptedApiMockOffers = mapOffersFromAPI(API_MOCK_OFFERS);

    apiMock
      .onGet(`/hotels/${id}/nearby`)
      .reply(200, API_MOCK_OFFERS);

    return nearOffersLoader(dispatch, mockFn, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_NEAR_OFFERS,
          payload: adaptedApiMockOffers
        });
      });
  });

  it(`Should make a correct API call to /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadReviews(id);

    apiMock
      .onGet(`/comments/${id}`)
      .reply(200, API_MOCK_REVIEWS);

    return commentsLoader(dispatch, mockFn, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: API_MOCK_REVIEWS
        });
      });
  });

  it(`Should make a correct API call to /comments/:id - add comment case`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsUpdater = Operation.updateReviews(id, {
      rating: 4,
      text: `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country.`
    });

    apiMock
      .onPost(`/comments/${id}`)
      .reply(200, API_MOCK_REVIEWS);

    return commentsUpdater(dispatch, mockFn, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_REVIEWS,
          payload: API_MOCK_REVIEWS
        });
      });
  });
});
