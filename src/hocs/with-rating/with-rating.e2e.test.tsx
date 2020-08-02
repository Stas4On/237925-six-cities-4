import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import withRating from './with-rating';

configure({adapter: new Adapter()});
const MockComponent = () => <div />;
const MockComponentWrapped = withRating(MockComponent);
const mockEvents = [
  {currentTarget: {value: 5, name: `rating`}},
  {currentTarget: {value: `Some text`, name: `review`}}
];

describe(`withRating HOC`, () => {
  it(`should render wrapped component with initial state`, () => {
    const wrapper = shallow(
        <MockComponentWrapped reviewsCount={1} />
    );
    expect(wrapper.props().rating).toEqual(0);
    expect(wrapper.props().comment).toHaveLength(0);
  });

  it(`should update wrapped component with user data`, () => {
    const wrapper = shallow(
        <MockComponentWrapped reviewsCount={1} />
    );
    wrapper.props().onChange(mockEvents[0]);
    expect(wrapper.props().rating).toEqual(5);
    wrapper.props().onChange(mockEvents[1]);
    expect(wrapper.props().comment).toEqual(`Some text`);
  });
});
