import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import SignIn from './sign-in';
import {CITIES, STORE_WITH_NO_AUTH} from "../../mocks/test-mocks";

const mockFn = jest.fn();

it(`should render SignIn correct`, () => {
  const tree = renderer
    .create(
        <Provider store={STORE_WITH_NO_AUTH}>
          <BrowserRouter>
            <SignIn
              onSubmit={mockFn}
              city={CITIES[0]}
            />
          </BrowserRouter>
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
