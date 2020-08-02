import * as React from "react";
import * as renderer from "react-test-renderer";
import withActiveItem from "./with-active-item";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const MockComponentWrapped = withActiveItem(MockComponent);

it(`should render HOC withActiveIndex correct`, () => {
  const tree = renderer
      .create((
        <MockComponentWrapped activeItemId = {0}/>
      ), {
        createNodeMock() {
          return {};
        }
      })
      .toJSON();

  expect(tree).toMatchSnapshot();
});
