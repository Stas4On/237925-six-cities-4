import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import FavoritesList from './favorites-list';
import {STORE_WITH_AUTH, TEST_OFFERS} from "../../mocks/test-mocks";

describe(`FavoritesList`, () => {
  it(`should render FavoritesList correctly`, () => {
    const tree = renderer.create(
        <Provider store={STORE_WITH_AUTH}>
          <BrowserRouter>
            <FavoritesList favorites={TEST_OFFERS}/>
          </BrowserRouter>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

