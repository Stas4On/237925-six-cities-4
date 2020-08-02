import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewsList from './reviews-list';
import {REVIEWS} from "../../mocks/test-mocks";

describe(`ReviewsList`, () => {
  it(`should render ReviewsList correctly`, () => {
    const tree = renderer.create(
        <ReviewsList reviews={REVIEWS}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
