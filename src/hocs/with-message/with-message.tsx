import * as React from 'react';
import {Subtract} from 'utility-types';
import Message from '../../components/message/message';

interface InjectingProps {
  status: number;
  onClose: () => void;
}

const withMessage = (Component) => {
  type InitialProps = React.ComponentProps<typeof Component>;
  type Props = Subtract<InitialProps, InjectingProps>;

  class WithMessage extends React.PureComponent<Props> {
    props: Props;

    render() {
      const {errorStatus, resetError} = this.props;
      return (
        <>
          {errorStatus ? <Message
            status={errorStatus}
            onClose={resetError}
          /> : ``}
          <Component {...this.props} />
        </>
      );
    }
  }

  return WithMessage;
};

export default withMessage;
