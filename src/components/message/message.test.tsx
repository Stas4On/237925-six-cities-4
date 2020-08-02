import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Message from './message';

const mockFn = jest.fn();

describe(`Message`, () => {
  it(`should render Message correctly`, () => {
    const tree = renderer.create(
        <Message
          status={400}
          onClose={mockFn}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it(`should render Message with 401 status`, () => {
    const tree = renderer.create(
        <Message
          status={401}
          onClose={mockFn}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
