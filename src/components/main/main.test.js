import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const NUMBER_OFFERS = 56;
const OFFER_NAMES = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`];

it(`<Main /> should render cards offers`, () => {
  const tree = renderer
    .create(<Main
      numberRentalOffers={NUMBER_OFFERS}
      offerNames = {OFFER_NAMES}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
