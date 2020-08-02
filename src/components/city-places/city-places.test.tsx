import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {CITIES, STORE_WITH_AUTH, TEST_OFFERS} from "../../mocks/test-mocks";
import CityPlaces from "./city-places";

const mockFn = jest.fn();

describe(`CityPlaces`, () => {
  it(`should render CityPlaces correctly`, () => {
    const tree = renderer.create(
        <Provider store={STORE_WITH_AUTH}>
          <BrowserRouter>
            <CityPlaces
              offers={TEST_OFFERS}
              activeItemId={TEST_OFFERS[0].id}
              currentCity={CITIES[3]}
              handleItemEvent={mockFn}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
