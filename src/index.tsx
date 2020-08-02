import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createAPI} from "./api/api";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperation, ActionCreator as UserActionCreator} from "./reducer/user/user";
import {ActionCreator as ErrorActionCreator} from "./reducer/errors/errors";
import {AuthStatus} from "./models/models";
import withMessage from "./hocs/with-message/with-message";

const init = () => {
  const AppWrapped = withMessage(App);

  const onUnauthorized = (status: number) => {
    store.dispatch(UserActionCreator.changeAuthStatus(AuthStatus.NO_AUTH));
    store.dispatch(ErrorActionCreator.setErrorStatus(status));
  };

  const onRequestError = (status: number) => {
    store.dispatch(ErrorActionCreator.setErrorStatus(status));
  };

  const api = createAPI(onUnauthorized, onRequestError);
  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  store.dispatch(UserOperation.checkAuth()).catch(() => { /* do nothing */
  });
  store.dispatch(DataOperation.loadOffers())
    .then(() => {
      ReactDOM.render(
          <Provider store={store}>
            <AppWrapped/>
          </Provider>,
          document.getElementById(`root`)
      );
    });
};

init();
