import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {LocationsItem} from "./locations-item";
import {CITIES} from "../../mocks/test-mocks";

const mockFn = jest.fn();

describe(`LocationsItem`, () => {
  it(`should render LocationsItem as listItem with active class`, () => {
    const tree = renderer.create(
        <LocationsItem
          isNavigation={true}
          city={CITIES[3]}
          currentCity={CITIES[3]}
          onChangeCity={mockFn}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render LocationsItem as div`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <LocationsItem
            isNavigation={false}
            city={CITIES[3]}
            currentCity={CITIES[4]}
            onChangeCity={mockFn}
          />
        </BrowserRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
