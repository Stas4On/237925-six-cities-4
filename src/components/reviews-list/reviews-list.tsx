import * as React from 'react';
import ReviewsItem from '../reviews-item/reviews-item';
import {ReviewModel} from "../../models/models";

type Props = {
  reviews: ReviewModel[];
}

const ReviewsList: React.FunctionComponent<Props> = ({reviews}) => (
  <ul className="reviews__list">
    {reviews.map((review) => (
      <ReviewsItem
        review={review}
        key={review.id}
      />
    ))}
  </ul>
);

export default ReviewsList;
