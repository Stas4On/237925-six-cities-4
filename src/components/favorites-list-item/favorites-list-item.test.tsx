import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import FavoritesListItem from './favorites-list-item';
import {Provider} from 'react-redux';
import {CITIES, STORE_WITH_AUTH, TEST_OFFERS} from "../../mocks/test-mocks";

describe(`FavoritesListItem`, () => {
  it(`should render FavoritesListItem correctly`, () => {
    const tree = renderer.create(
        <Provider store={STORE_WITH_AUTH}>
          <BrowserRouter>
            <FavoritesListItem
              city={CITIES[0]}
              offers={TEST_OFFERS}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

