import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Favorites} from './favorites';
import {APP_USERS, STORE_WITH_AUTH, TEST_OFFERS} from "../../mocks/test-mocks";
import {AuthStatus} from "../../models/models";

const mockFn = jest.fn();

describe(`Favorites`, () => {
  it(`should render Favorites with no empty favorites offers`, () => {
    const tree = renderer.create(
        <Provider store={STORE_WITH_AUTH}>
          <BrowserRouter>
            <Favorites
              authStatus={AuthStatus.AUTH}
              userInfo={APP_USERS[0]}
              favorites={TEST_OFFERS}
              onLoadFavoriteOffers={mockFn}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render Favorites with empty favorites offers`, () => {
    const tree = renderer.create(
        <Provider store={STORE_WITH_AUTH}>
          <BrowserRouter>
            <Favorites
              authStatus={AuthStatus.AUTH}
              userInfo={APP_USERS[0]}
              favorites={[]}
              onLoadFavoriteOffers={mockFn}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

