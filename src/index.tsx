import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {OFFERS} from "./mocks/offers";

const NUMBER_OFFERS = 56;

const init = () => {
  ReactDOM.render(
      <App numberRentalOffers={NUMBER_OFFERS} offers={OFFERS}/>,
      document.getElementById(`root`)
  );
};

init();
