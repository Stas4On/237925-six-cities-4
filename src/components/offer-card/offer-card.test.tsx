import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {STORE_WITH_AUTH, TEST_OFFERS} from "../../mocks/test-mocks";
import {AuthStatus, OfferCardPrefix} from "../../models/models";
import {OfferCard} from "./offer-card";

const PREFIXES = OfferCardPrefix;
const mockFn = jest.fn();

describe(`OfferCard`, () => {
  it(`should render cities OfferCard`, () => {
    const tree = renderer.create(
        <Provider store={STORE_WITH_AUTH}>
          <BrowserRouter>
            <OfferCard
              prefix={PREFIXES.CITIES}
              offerCard={TEST_OFFERS[0]}
              onFocus={mockFn}
              onFavoriteClick={mockFn}
              authStatus={AuthStatus.AUTH}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render near places OfferCard`, () => {
    const tree = renderer.create(
        <Provider store={STORE_WITH_AUTH}>
          <BrowserRouter>
            <OfferCard
              prefix={PREFIXES.NEAR_PLACES}
              offerCard={TEST_OFFERS[0]}
              onFocus={mockFn}
              onFavoriteClick={mockFn}
              authStatus={AuthStatus.AUTH}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
