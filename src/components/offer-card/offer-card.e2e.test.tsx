import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, mount} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {STORE_WITH_AUTH, TEST_OFFERS} from "../../mocks/test-mocks";
import {OfferCard} from "./offer-card";
import {AuthStatus, OfferCardPrefix} from "../../models/models";

const PREFIX = OfferCardPrefix.CITIES;

configure({
  adapter: new Adapter(),
});
const mockFn = jest.fn();

describe(`OfferCard`, () => {
  it(`should card on hover to call cb with offer on mouseenter and null on mouseleave`, () => {
    const offerCard = TEST_OFFERS[0];
    const onFocus = jest.fn();
    const placeCard = mount(
        <Provider store={STORE_WITH_AUTH}>
          <BrowserRouter>
            <OfferCard
              prefix={PREFIX}
              offerCard={offerCard}
              onFocus={onFocus}
              onFavoriteClick={mockFn}
              authStatus={AuthStatus.AUTH}
            />
          </BrowserRouter>
        </Provider>
    );
    const card = placeCard.find(`article.place-card`);
    card.simulate(`mouseenter`);
    expect(onFocus).toHaveBeenNthCalledWith(1, offerCard.id);
    card.simulate(`mouseleave`);
    expect(onFocus).toHaveBeenNthCalledWith(2, null);
  });
});
