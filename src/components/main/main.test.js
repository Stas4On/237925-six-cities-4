import React from "react";
import renderer from "react-test-renderer";
import {cities, testOffers} from "../../mocks/test-mocks";
import Main from "./main";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";


const mockStore = configureStore([]);
const store = mockStore({
  offers: testOffers,
  currentCity: cities[0],
  cities,
});

it(`<Main /> should render cards offers`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            onChangeCity={() => {}}
            offers={testOffers}
            onTitleCardClick={() => {}}
            cities={cities}
            currentCity={cities[0]}/>
        </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});
