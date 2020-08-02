import {PureComponent} from "react";
import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  activeItemId: number;
}

interface InjectingProps {
  activeItemId: number;
  handleItemEvent: (index) => void;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveItem extends PureComponent<T, State> {
    constructor(props) {
      super(props);

      this._handleItemEvent = this._handleItemEvent.bind(this);

      this.state = {
        activeItemId: null
      };
    }

    private _handleItemEvent(index: number) {
      this.setState(() => ({activeItemId: index}));
    }

    render() {
      return (
        <Component {...this.props} activeItemId = {this.state.activeItemId} handleItemEvent = {this._handleItemEvent}/>
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
