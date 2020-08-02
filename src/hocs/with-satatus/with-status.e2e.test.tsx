import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withStatus from './with-status';

Enzyme.configure({
  adapter: new Adapter(),
});

const Component = () => (<div />);
const ComponentWithStatus = withStatus(Component);

it(`When click`, () => {
  const componentWithStatus = Enzyme.shallow(<ComponentWithStatus />);
  const prevState = componentWithStatus.state(`isOpened`);

  componentWithStatus.props().handleClick();

  expect(componentWithStatus.state(`isOpened`)).toBe(!prevState);
});
