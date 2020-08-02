import * as React from "react";
import * as renderer from "react-test-renderer";
import {CITIES, STORE_WITH_AUTH, STORE_WITHOUT_OFFERS, TEST_OFFERS} from "../../mocks/test-mocks";
import Main from "./main";
import {Provider} from "react-redux";
import {AuthStatus} from "../../models/models";
import {BrowserRouter} from "react-router-dom";

const mockFn = jest.fn();

describe(`Main`, () => {

  it(`should render cards offers`, () => {
    const tree = renderer
      .create(
          <Provider store={STORE_WITH_AUTH}>
            <BrowserRouter>
              <Main
                onChangeCity={mockFn}
                offers={TEST_OFFERS}
                cities={CITIES}
                currentCity={CITIES[0]}
                authStatus={AuthStatus.NO_AUTH}
                userInfo={null}/>
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it(`should render correctly without offers`, () => {
    const tree = renderer
      .create(
          <Provider store={STORE_WITHOUT_OFFERS}>
            <BrowserRouter>
              <Main
                onChangeCity={mockFn}
                offers={TEST_OFFERS}
                cities={CITIES}
                currentCity={CITIES[0]}
                authStatus={AuthStatus.NO_AUTH}
                userInfo={null}/>
            </BrowserRouter>
          </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
