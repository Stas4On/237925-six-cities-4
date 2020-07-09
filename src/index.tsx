import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createAPI} from "./api";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperation} from "./reducer/user/user";

const init = () => {
  const api = createAPI(() => { /* do nothing */ });
  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  store.dispatch(UserOperation.checkAuth());
  store.dispatch(DataOperation.loadOffers())
    .then(() => {
      ReactDOM.render(
          <Provider store={store}>
            <App/>
          </Provider>,
          document.getElementById(`root`)
      );
    });
};

init();
