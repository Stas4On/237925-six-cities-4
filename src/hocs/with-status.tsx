import {PureComponent} from "react";
import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  isOpened: boolean;
}

interface InjectingProps {
  handleClick: (index) => void;
}

const withStatus = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithStatus extends PureComponent<T, State> {
    constructor(props) {
      super(props);

      this._handleClick = this._handleClick.bind(this);

      this.state = {
        isOpened: false
      };
    }

    private _handleClick() {
      this.setState((prevState) => ({isOpened: !prevState.isOpened}));
    }

    render() {
      return (
        <Component {...this.props} isOpened = {this.state.isOpened} handleClick = {this._handleClick}/>
      );
    }
  }

  return WithStatus;
};

export default withStatus;
