import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";

const NUMBER_OFFERS = 56;
const OFFER_NAMES = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`];

const init = () => {
  ReactDOM.render(
      <App numberRentalOffers={NUMBER_OFFERS} offerNames={OFFER_NAMES}/>,
      document.getElementById(`root`)
  );
};

init();
