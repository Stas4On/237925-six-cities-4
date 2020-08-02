import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {APP_USERS, CITIES, STORE_WITH_AUTH, STORE_WITH_NO_AUTH, TEST_OFFERS} from "../../mocks/test-mocks";
import App from "./app";
import {AuthStatus} from "../../models/models";

const mockFn = jest.fn();

describe(`App`, () => {
  it(`<App /> should render correctly with no auth user`, () => {
    const tree = renderer
      .create(
          <Provider store={STORE_WITH_NO_AUTH}>
            <App
              onChangeCity={mockFn}
              currentCity={CITIES[0]}
              authStatus={AuthStatus.NO_AUTH}
              userInfo={null}
              cities={CITIES}
              offers={TEST_OFFERS}
              errorStatus={null}
              resetError={mockFn}
            />
          </Provider>, {
            createNodeMock: () => document.createElement(`div`)
          }
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`<App /> should render correctly with auth user`, () => {
    const tree = renderer
      .create(
          <Provider store={STORE_WITH_AUTH}>
            <App
              onChangeCity={mockFn}
              currentCity={CITIES[0]}
              authStatus={AuthStatus.AUTH}
              userInfo={APP_USERS[0]}
              cities={CITIES}
              offers={TEST_OFFERS}
              errorStatus={null}
              resetError={mockFn}
            />
          </Provider>, {
            createNodeMock: () => document.createElement(`div`)
          }
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
