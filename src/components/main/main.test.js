import React from "react";
import renderer from "react-test-renderer";
import {cities, testOffers} from "../../mocks/test-mocks";
import Main from "./main";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {AuthStatus} from "../../models";
import {BrowserRouter} from "react-router-dom";

const mockStore = configureStore([]);
const store = mockStore({
  DATA: {
    offers: testOffers,
  },
  CITY_PLACES: {
    currentCity: cities[0],
    cities
  },
  USER: {
    authStatus: AuthStatus.NO_AUTH,
    userInfo: null
  }
});

it(`<Main /> should render cards offers`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <Main
              onChangeCity={() => {}}
              offers={testOffers}
              onTitleCardClick={() => {}}
              cities={cities}
              currentCity={cities[0]}
              authStatus={AuthStatus.NO_AUTH}
              userInfo={null}/>
          </BrowserRouter>
        </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});
