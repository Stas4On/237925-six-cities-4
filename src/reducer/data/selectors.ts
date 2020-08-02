import {createSelector} from "reselect";
import {ReviewModel, SortType} from "../../models/models";
import {NameSpace} from "../name-space";
import {getActiveSortType, getCurrentCity} from "../city-places/selectors";
import {MAX_COMMENTS_COUNT_TO_SHOW} from "../../constants/constants";

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => (state[NAME_SPACE].offers);

export const getNearOffers = (state) => state[NAME_SPACE].nearOffers;

export const getFavoriteOffers = (state) => (state[NAME_SPACE].favoriteOffers);

export const getCityOffers = createSelector(
  getOffers,
  getCurrentCity,
  getActiveSortType,
  (offers, currentCity, activeSort) => {
    const result = offers.filter((it) => (it.city.name === currentCity));
    switch (activeSort) {
      case SortType.POPULAR:
        return result;
      case SortType.TO_LOW:
        return (
          result.slice().sort((a, b) => (b.price - a.price))
        );
      case SortType.TO_HIGH:
        return (
          result.slice().sort((a, b) => (a.price - b.price))
        );
      case SortType.TOP_RATED:
        return (
          result.slice().sort((a, b) => (b.rating - a.rating))
        );
    }
    return result;
  }
);

export const getRawReviews = (state) => state[NAME_SPACE].reviews;

export const getSortedReviews = createSelector(
  getRawReviews,
  (reviews) => reviews.slice().sort((firstComment: ReviewModel, secondComment: ReviewModel) => {
    const dateA = new Date(firstComment.date).getTime();
    const dateB = new Date(secondComment.date).getTime();
    return dateA < dateB ? 1 : -1;
  })
);

export const getReviews = createSelector(
  getSortedReviews,
  (reviews) => reviews.slice(0, MAX_COMMENTS_COUNT_TO_SHOW)
);
