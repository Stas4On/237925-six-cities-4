import * as React from "react";
import Main from "../main/main";

interface Props {
  numberRentalOffers: number
}
const App = (props: Props) => {
  return (
    <React.Fragment>
      <Main numberRentalOffers={props.numberRentalOffers}/>
    </React.Fragment>
  );
};

export default App;
