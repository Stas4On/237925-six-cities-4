import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Gallery from './gallery';
import {IMAGES} from "../../mocks/test-mocks";

describe(`Gallery`, () => {
  it(`should render Gallery with max count 6`, () => {
    const tree = renderer.create(
        <Gallery images={IMAGES} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
