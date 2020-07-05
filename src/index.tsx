import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {ActionCreator, reducer} from "./reducer/reducer";
import {composeWithDevTools} from "redux-devtools-extension";

const init = () => {
  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware()
      )
  );

  store.dispatch(ActionCreator.loadOffers());

  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
