import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CityPlacesEmpty from "./city-places-empty";
import {CITIES} from "../../mocks/test-mocks";

it(`should render CityPlacesEmpty correctly`, () => {
  const tree = renderer
    .create(<CityPlacesEmpty
      currentCity={CITIES[0]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
