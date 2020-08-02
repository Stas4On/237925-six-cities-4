import * as React from 'react';
import {MessageStyles, MessageTitleStyles, ButtonStyles} from './message.styles';

interface Props {
  status: number;
  onClose: () => void;
}

class Message extends React.PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleClose() {
    this.props.onClose();
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.props.onClose();
    }
  }

  render() {
    const {status} = this.props;
    const text = {
      title: ``,
      message: ``
    };
    if (status === 401) {
      text.title = `Unauthorized.`;
      text.message = `You are not authorized. Please, Sign in to access your account.`;
    } else {
      text.title = `Undefined system error.`;
      text.message = `Something went wrong. Please, try again later.`;
    }

    return (
      <section
        className="message message--error"
        style={MessageStyles}
      >
        <div className="message__title"
          style={MessageTitleStyles}
        >
          <b>{status}. {text.title}</b>
        </div>
        <div className="message__body">
          {text.message}
        </div>
        <button
          className="message__button button"
          style={ButtonStyles}
          onClick={this._handleClose} />
      </section>
    );
  }
}

export default React.memo(Message);
