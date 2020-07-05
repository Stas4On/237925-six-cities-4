import React from "react";
import renderer from "react-test-renderer";
import {cities, testOffers} from "../../mocks/test-mocks";
import Main from "./main";

it(`<Main /> should render cards offers`, () => {
  const tree = renderer
    .create(<Main
      onChangeCity = {() => {}}
      offers={testOffers}
      onTitleCardClick={() => {}}
      city = {cities[0]}
      cities={cities}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
