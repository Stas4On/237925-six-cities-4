import * as React from "react";
import {OfferModel} from "../../models";
import {OfferTypeNames} from "../../constants";

interface Props {
  offerCard: OfferModel;
  onFocus: (offerId) => void;
  onTitleCardClick: (offerId) => void;
}

class OfferCard extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
  }

  private _handleFocus(offerId) {
    this.props.onFocus(offerId);
  }

  private _handleTitleClick() {
    this.props.onTitleCardClick(this.props.offerCard.id);
  }

  render() {
    const {offerCard: card} = this.props;
    return (
      <article className="cities__place-card place-card" onMouseEnter={() => this._handleFocus(card.id)} onMouseLeave={() => this._handleFocus(null)}>
        {this.addPremiumLabel(card.premium)}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={card.imgUrl} width={260} height={200} alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€{card.price}</b>
              <span className="place-card__price-text">/&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width={18} height={19}>
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: Math.round(card.rating) * 20 + `%`}}/>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a className="place-card__name-link" href="#" onClick={this._handleTitleClick}>{card.name}</a>
          </h2>
          <p className="place-card__type">{OfferTypeNames[card.type]}</p>
        </div>
      </article>
    );
  }

  addPremiumLabel(isPremium) {
    return isPremium ?
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      : null;
  }
}

export default OfferCard;
