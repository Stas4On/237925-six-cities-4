import * as React from 'react';
import {RATINGS} from "../../constants/constants";

interface Props {
  rating: number;
  comment: string;
  errorStatus: number;
  reviewsCount: number;
  offerId: number;
  isDisabled: boolean;
  setDisabled: (status: boolean) => void;
  onChange: (evt: React.ChangeEvent) => void;
  onReviewSubmit: (id: number, userComment: { rating: number; comment: string }) => void;
}

class ReviewsForm extends React.PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidUpdate({errorStatus, reviewsCount}) {
    if (errorStatus || reviewsCount !== this.props.reviewsCount) {
      this.props.setDisabled(false);
    }
  }

  _checkSubmitDisabled() {
    const {rating, comment} = this.props;
    return rating === 0 || comment.length <= 50 || comment.length >= 300;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const {
      offerId,
      setDisabled,
      onReviewSubmit
    } = this.props;

    setDisabled(true);

    onReviewSubmit(offerId, {
      rating: this.props.rating,
      comment: this.props.comment
    });
  }

  render() {
    const {
      rating,
      comment,
      isDisabled,
      onChange
    } = this.props;

    const isSubmitDisabled = isDisabled || this._checkSubmitDisabled();

    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={this._handleSubmit}
      >
        <fieldset
          disabled={isDisabled}
          style={{border: `none`, padding: `0`}}
        >
          <label className="reviews__label form__label" htmlFor="review">Your review</label>
          <div className="reviews__rating-form form__rating">
            {RATINGS.map((inputRating) => (
              <React.Fragment key={inputRating.value}>
                <input
                  className="form__rating-input visually-hidden"
                  type="radio"
                  name="rating"
                  value={inputRating.value}
                  id={`${inputRating.value}-stars`}
                  checked={inputRating.value === rating}
                  onChange={onChange}
                />
                <label
                  className="reviews__rating-label form__rating-label"
                  htmlFor={`${inputRating.value}-stars`}
                  title={inputRating.title}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star" />
                  </svg>
                </label>
              </React.Fragment>
            ))}
          </div>
          <textarea
            className="reviews__textarea form__textarea"
            id="review"
            name="review"
            placeholder="Tell how was your stay, what you like and what can be improved"
            value={comment}
            onChange={onChange}
          />
        </fieldset>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            disabled={isSubmitDisabled}
            className="reviews__submit form__submit button"
            type="submit"
          >Submit</button>
        </div>
      </form>
    );
  }
}

export default ReviewsForm;
