import * as React from 'react';
import {ReviewModel} from "../../models/models";
import {formatDate, getDatetime, getRoundedPercentageRating} from "../../common/utils";

type Props = {
  review: ReviewModel;
}

const ReviewsItem: React.FunctionComponent<Props> = ({review}) => {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatar_url} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRoundedPercentageRating(review.rating)}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={getDatetime(review.date)}>{formatDate(review.date)}</time>
      </div>
    </li>
  );
};

export default ReviewsItem;
