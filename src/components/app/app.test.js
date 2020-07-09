import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {cities, testOffers} from "../../mocks/test-mocks";
import App from "./app";

const mockStore = configureStore([]);

it(`<App /> should render correctly`, () => {
  const store = mockStore({
    DATA: {
      offers: testOffers,
    },
    CITY_PLACES: {
      currentCity: cities[0],
      cities
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            onChangeCity = {() => {}}
            onTitleCardClick={() => {}}
            currentCity = {cities[0]}
            cities={cities}
            offers = {testOffers}
          />
        </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});
