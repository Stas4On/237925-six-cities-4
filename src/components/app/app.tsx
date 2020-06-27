import * as React from "react";
import Main from "../main/main";

interface Props {
  numberRentalOffers: number;
  offerNames: string[];
}
const App = (props: Props) => {
  return (
    <React.Fragment>
      <Main numberRentalOffers={props.numberRentalOffers} offerNames={props.offerNames}/>
    </React.Fragment>
  );
};

export default App;
