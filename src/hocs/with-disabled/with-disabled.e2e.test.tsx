import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import withDisabled from './with-disabled';

configure({
  adapter: new Adapter()
});
const MockComponent = () => <div />;
const MockComponentWrapped = withDisabled(MockComponent);

describe(`withDisabled HOC`, () => {
  it(`should render wrapped component with initial state`, () => {
    const wrapper = shallow(
        <MockComponentWrapped />
    );
    expect(wrapper.props().isDisabled).toBeFalsy();
  });

  it(`should set wrapped component disabled status`, () => {
    const wrapper = shallow(
        <MockComponentWrapped />
    );
    wrapper.props().setDisabled(true);
    expect(wrapper.props().isDisabled).toBeTruthy();
    wrapper.props().setDisabled(false);
    expect(wrapper.props().isDisabled).toBeFalsy();
  });
});
