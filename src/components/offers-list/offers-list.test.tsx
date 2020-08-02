import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {OfferCardPrefix} from "../../models/models";
import {STORE_WITH_AUTH, TEST_OFFERS} from "../../mocks/test-mocks";
import OffersList from "./offers-list";

const PREFIXES = OfferCardPrefix;
const mockFn = jest.fn();

describe(`OffersList`, () => {
  it(`should render cities OffersList`, () => {
    const tree = renderer.create(
        <Provider store={STORE_WITH_AUTH}>
          <BrowserRouter>
            <OffersList
              prefix={PREFIXES.CITIES}
              offers={TEST_OFFERS}
              handleItemEvent={mockFn}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render near places OffersList`, () => {
    const tree = renderer.create(
        <Provider store={STORE_WITH_AUTH}>
          <BrowserRouter>
            <OffersList
              prefix={PREFIXES.NEAR_PLACES}
              offers={TEST_OFFERS}
              handleItemEvent={mockFn}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
