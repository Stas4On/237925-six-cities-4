import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

const NUMBER_OFFERS = 56;
const OFFER_NAMES = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`];

it(`<App /> should render <Main />`, () => {
  const tree = renderer
    .create(<App
      numberRentalOffers={NUMBER_OFFERS}
      offerNames={OFFER_NAMES}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
