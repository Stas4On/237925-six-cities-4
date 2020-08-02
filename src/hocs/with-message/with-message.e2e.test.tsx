import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, mount} from 'enzyme';
import withMessage from './with-message';

configure({adapter: new Adapter()});
const MockComponent = () => <div />;
const mockFn = jest.fn();
const MockComponentWrapped = withMessage(MockComponent);

describe(`withMessage HOC`, () => {
  it(`should render wrapped component with error message`, () => {
    const wrapper = mount(
        <MockComponentWrapped
          errorStatus={404}
          resetError={mockFn}
        />
    );
    expect(wrapper.exists(`.message`)).toBe(true);
    expect(wrapper.find(`.message__title`).text()).toBe(`404. Undefined system error.`);
  });

  it(`should render wrapped component without error message`, () => {
    const wrapper = mount(
        <MockComponentWrapped
          errorStatus={0}
          resetError={mockFn}
        />
    );
    expect(wrapper.exists(`.message`)).toBe(false);
  });
});
