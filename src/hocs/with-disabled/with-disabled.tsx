import * as React from 'react';
import {Subtract} from 'utility-types';

type InjectingProps = {
  isDisabled: boolean;
  setDisabled: (status: boolean) => void;
}

type State = {
  isDisabled: boolean;
}

const withDisabled = (Component) => {
  type InitialProps = React.ComponentProps<typeof Component>;
  type Props = Subtract<InitialProps, InjectingProps>;

  class WithDisabled extends React.PureComponent<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
      super(props);
      this.state = {
        isDisabled: false
      };
      this._setDisabled = this._setDisabled.bind(this);
    }

    _setDisabled(status) {
      this.setState({
        isDisabled: status
      });
    }

    render() {
      const {isDisabled} = this.state;

      return (
        <Component
          {...this.props}
          isDisabled={isDisabled}
          setDisabled={this._setDisabled}
        />
      );
    }
  }

  return WithDisabled;
};

export default withDisabled;
