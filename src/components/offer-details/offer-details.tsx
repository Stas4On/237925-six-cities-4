import * as React from "react";
import {connect} from 'react-redux';
import {Operation as DataOperation} from '../../reducer/data/data';
import {AuthStatus, OfferCardPrefix, OfferModel, ReviewModel, User} from "../../models/models";
import {AppRoute, MAX_NEAR_OFFERS_COUNT_TO_SHOW, OfferTypeNames} from "../../constants/constants";
import Header from "../header/header";
import OffersList from "../offers-list/offers-list";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {getNearOffers, getReviews} from "../../reducer/data/selectors";
import ReviewsList from "../reviews-list/reviews-list";
import {getRoundedPercentageRating} from "../../common/utils";
import ReviewsForm from "../reviews-form/reviews-form";
import withDisabled from "../../hocs/with-disabled/with-disabled";
import withRating from "../../hocs/with-rating/with-rating";
import CityMap from "../city-map/city-map";
import {Link} from "react-router-dom";
import Gallery from "../gallery/gallery";

interface Props {
  offer: OfferModel;
  id: number;
  authStatus: AuthStatus;
  errorStatus: number;
  userInfo: User;
  nearOffers: OfferModel[];
  reviews: ReviewModel[];
  onOfferPageLoad: (offerId: number) => void;
  onReviewSubmit: (id: number, userComment: ReviewModel) => void;
  onFavoriteClick: (id: number, status: boolean) => void;
}

const OffersListWrapped = withActiveItem(OffersList);
const ReviewsFormWrapped = withDisabled(withRating(ReviewsForm));

class OfferDetails extends React.PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onOfferPageLoad(this.props.id);
  }

  componentDidUpdate({id}) {
    if (!id || id !== this.props.id) {
      this.props.onOfferPageLoad(this.props.id);
    }
  }

  render() {
    const {offer, id, authStatus, errorStatus, userInfo, nearOffers, reviews, onReviewSubmit, onFavoriteClick} = this.props;
    if (!offer) {
      return ``;
    }
    const favoriteClass = offer.favorite ? `property__bookmark-button--active` : ``;
    return (
      <div className="page">
        <Header authStatus={authStatus} userInfo={userInfo}/>
        <main className="page__main page__main--property">
          <section className="property">
            <Gallery images={offer.photos}/>
            <div className="property__container container">
              <div className="property__wrapper">
                <div className="property__mark">
                  <span>Premium</span>
                </div>
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offer.name}
                  </h1>
                  {authStatus === AuthStatus.AUTH
                    ? <button
                      className={`property__bookmark-button button ${favoriteClass}`}
                      type="button"
                      onClick={() => onFavoriteClick(offer.id, offer.favorite)}
                    >
                      <svg className="property__bookmark-icon" width={31} height={33}>
                        <use xlinkHref="#icon-bookmark"/>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                    : <Link
                      className={`property__bookmark-button button ${favoriteClass}`}
                      type="button"
                      to={AppRoute.LOGIN}
                    >
                      <svg className="property__bookmark-icon" width={31} height={33}>
                        <use xlinkHref="#icon-bookmark"/>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </Link>
                  }
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: getRoundedPercentageRating(offer.rating)}}/>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {OfferTypeNames[offer.type]}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {offer.guests} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offer.features.map((feature) => (
                      <li key={offer.id - Math.random()} className="property__inside-item">
                        {feature}
                      </li>
                    )
                    )}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`${offer.owner.is_pro ? `property__avatar-wrapper--pro` : ``} property__avatar-wrapper user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={offer.owner.avatar_url} width={74} height={74} alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {offer.owner.name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  <ReviewsList
                    reviews={reviews}
                  />
                  {authStatus === AuthStatus.AUTH
                    ? <ReviewsFormWrapped
                      reviewsCount={reviews.length}
                      offerId={id}
                      errorStatus={errorStatus}
                      onReviewSubmit={onReviewSubmit}
                    />
                    : ``
                  }
                </section>
              </div>
            </div>
            <section className="property__map map">
              <CityMap
                city={offer.city.location}
                offers={[...nearOffers, offer]}
                activeOfferId={offer.id}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OffersListWrapped offers={nearOffers} prefix={OfferCardPrefix.NEAR_PLACES}/>
            </section>
          </div>
        </main>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  nearOffers: getNearOffers(state).slice(0, MAX_NEAR_OFFERS_COUNT_TO_SHOW),
  reviews: getReviews(state)
});

const mapDispatchToProps = (dispatch) => ({
  onReviewSubmit(id, userComment) {
    dispatch(DataOperation.updateReviews(id, userComment));
  },
  onFavoriteClick(id, status) {
    dispatch(DataOperation.toggleFavorite(id, status));
  },
  onOfferPageLoad(offerId) {
    dispatch(DataOperation.loadNearOffers(offerId));
    dispatch(DataOperation.loadReviews(offerId));
  },
});

export {OfferDetails};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);
