import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewsForm from './reviews-form';

const mockFn = jest.fn();

describe(`ReviewsForm`, () => {
  it(`should render ReviewsForm with initial state`, () => {
    const tree = renderer.create(
        <ReviewsForm
          rating={0}
          comment={``}
          errorStatus={0}
          reviewsCount={1}
          offerId={1}
          isDisabled={false}
          setDisabled={mockFn}
          onChange={mockFn}
          onReviewSubmit={mockFn}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render ReviewsForm disabled`, () => {
    const tree = renderer.create(
        <ReviewsForm
          rating={0}
          comment={``}
          errorStatus={0}
          reviewsCount={1}
          offerId={1}
          isDisabled={true}
          setDisabled={mockFn}
          onChange={mockFn}
          onReviewSubmit={mockFn}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
