import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {CITIES, STORE_WITH_AUTH} from "../../mocks/test-mocks";
import Locations from "./locations";

const mockFn = jest.fn();

describe(`Locations`, () => {
  it(`should render Locations correctly`, () => {
    const tree = renderer.create(
        <Provider store={STORE_WITH_AUTH}>
          <Locations
            cities={CITIES}
            currentCity={CITIES[2]}
            onChangeCity={mockFn}
          />
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
