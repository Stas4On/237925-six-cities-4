import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CityMap from "./city-map";
import {TEST_OFFERS} from "../../mocks/test-mocks";

describe(`CityMap`, () => {
  it(`should render CityMap correctly`, () => {
    const tree = renderer.create(
        <CityMap
          offers={TEST_OFFERS}
          activeOfferId={TEST_OFFERS[0].id}
          city={TEST_OFFERS[0].city.location}
        />,
        {createNodeMock: () => document.createElement(`div`)}
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
