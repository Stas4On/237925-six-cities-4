import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {APP_USERS, REVIEWS, STORE_WITH_AUTH, TEST_OFFERS} from "../../mocks/test-mocks";
import {OfferDetails} from "./offer-details";
import {AuthStatus} from "../../models/models";

const mockFn = jest.fn();

describe(`OfferDetails`, () => {
  it(`should render OfferDetails correctly`, () => {
    const tree = renderer.create(
        <Provider store={STORE_WITH_AUTH}>
          <BrowserRouter>
            <OfferDetails
              authStatus={AuthStatus.AUTH}
              userInfo={APP_USERS[0]}
              errorStatus={0}
              id={TEST_OFFERS[0].id}
              offer={TEST_OFFERS[0]}
              nearOffers={TEST_OFFERS.slice(1)}
              reviews={REVIEWS}
              onReviewSubmit={mockFn}
              onOfferPageLoad={mockFn}
              onFavoriteClick={mockFn}/>
          </BrowserRouter>
        </Provider>,
        {createNodeMock: () => document.createElement(`div`)}
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
