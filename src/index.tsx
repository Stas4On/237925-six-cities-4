import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";

const NUMBER_OFFERS: number = 56;

const init = () => {
  ReactDOM.render(
    <App numberRentalOffers = { NUMBER_OFFERS } />,
  document.getElementById(`root`)
);
};

init();
