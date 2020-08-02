import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Header from './header';
import {AuthStatus} from "../../models/models";
import {APP_USERS} from "../../mocks/test-mocks";

describe(`Header`, () => {
  it(`should render Header with Auth correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Header
            authStatus={AuthStatus.AUTH}
            userInfo={APP_USERS[0]}
          />
        </BrowserRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render Header with no Auth correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <Header
            authStatus={AuthStatus.NO_AUTH}
            userInfo={null}
          />
        </BrowserRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
