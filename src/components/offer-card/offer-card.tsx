import * as React from "react";
import {connect} from 'react-redux';
import {AuthStatus, OfferCardPrefix, OfferModel} from "../../models/models";
import {AppRoute, OfferTypeNames} from "../../constants/constants";
import {Link} from "react-router-dom";
import {Operation as DataOperation} from '../../reducer/data/data';
import {getAuthStatus} from "../../reducer/user/selectors";
import {getRoundedPercentageRating} from "../../common/utils";

interface Props {
  offerCard: OfferModel;
  onFocus: (offerId) => void;
  onFavoriteClick: (id: number, isFavorite: boolean) => void;
  authStatus: AuthStatus;
  prefix: OfferCardPrefix;
}

class OfferCard extends React.PureComponent<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleBookmarksButtonClick = this._handleBookmarksButtonClick.bind(this);
  }

  private _handleFocus(offerId, prefix) {
    if (prefix === OfferCardPrefix.CITIES) {
      this.props.onFocus(offerId);
    }
  }

  private _handleBookmarksButtonClick(id, isFavorite) {
    const {authStatus, onFavoriteClick} = this.props;

    if (authStatus === AuthStatus.AUTH) {
      onFavoriteClick(id, isFavorite);
    }
  }

  render() {
    const {offerCard: card, onFavoriteClick, authStatus, prefix} = this.props;
    const favoriteClass = card.favorite ? `place-card__bookmark-button--active` : ``;
    const cardClass = prefix === OfferCardPrefix.CITIES ? `cities__place-card` : `${prefix}__card`;

    return (
      <article className={`${cardClass} place-card`} onMouseEnter={() => this._handleFocus(card.id, prefix)} onMouseLeave={() => this._handleFocus(null, prefix)}>
        {this.addPremiumLabel(card.premium)}
        <div className={`${prefix}__image-wrapper place-card__image-wrapper`}>
          <img
            className="place-card__image"
            src={card.img_url}
            width={prefix === `favorites` ? 150 : 260}
            height={prefix === `favorites` ? 110 : 200}
            alt="Place image"/>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€{card.price}</b>
              <span className="place-card__price-text">/&nbsp;night</span>
            </div>
            {authStatus === AuthStatus.AUTH
              ? <button
                className={`place-card__bookmark-button button ${favoriteClass}`}
                type="button"
                onClick={() => onFavoriteClick(card.id, card.favorite)}
              >
                <svg className="place-card__bookmark-icon" width={18} height={19}>
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
              : <Link
                className={`place-card__bookmark-button button ${favoriteClass}`}
                type="button"
                to={AppRoute.LOGIN}
              >
                <svg className="place-card__bookmark-icon" width={18} height={19}>
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </Link>
            }
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: getRoundedPercentageRating(card.rating)}}/>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link className="place-card__name-link" to={AppRoute.OFFER + `/${card.id}`}>{card.name}</Link>
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

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteClick(id, isFavorite) {
    dispatch(DataOperation.toggleFavorite(id, isFavorite));
  }
});

export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
