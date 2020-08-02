import * as React from 'react';
import {Subtract} from 'utility-types';

type InjectingProps = {
  rating: number;
  text: string;
  onChange: (evt: React.ChangeEvent) => void;
}

interface State {
  rating: number;
  comment: string;
}

const withRating = (Component) => {
  type InitialProps = React.ComponentProps<typeof Component>;
  type Props = Subtract<InitialProps, InjectingProps>;

  class WithRating extends React.PureComponent<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
      super(props);
      this.state = {
        rating: 0,
        comment: ``
      };
      this._handleChange = this._handleChange.bind(this);
    }

    componentDidUpdate({reviewsCount}) {
      if (reviewsCount < this.props.reviewsCount) {
        this.setState({
          rating: 0,
          comment: ``
        });
      }
    }

    _handleChange({currentTarget}) {
      switch (currentTarget.name) {
        case `rating`:
          this.setState({
            rating: parseInt(currentTarget.value, 10)
          });
          break;
        case `review`:
          this.setState({
            comment: currentTarget.value
          });
          break;
      }
    }

    render() {
      const {
        rating,
        comment
      } = this.state;

      return (
        <Component
          {...this.props}
          rating={rating}
          comment={comment}
          onChange={this._handleChange}
        />
      );
    }
  }

  return WithRating;
};

export default withRating;
