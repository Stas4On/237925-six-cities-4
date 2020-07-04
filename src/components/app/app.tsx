import * as React from "react";
import Main from "../main/main";
import {OfferCardModel} from "../../models";

interface Props {
  numberRentalOffers: number;
  offers: OfferCardModel[];
}
const App: React.FunctionComponent<Props> = (props: Props) => {
  const titleLinkHandler = () => {};

  return (
    <React.Fragment>
      <Main numberRentalOffers={props.numberRentalOffers} offers={props.offers} onTitleCardClick={titleLinkHandler}/>
    </React.Fragment>
  );
};

export default App;
