import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {Sort} from './sort';
import {STORE_WITH_NO_AUTH} from "../../mocks/test-mocks";
import {SortType} from "../../models/models";

it(`should render Sort correctly`, () => {
  const tree = renderer
    .create(<Provider store={STORE_WITH_NO_AUTH}>
      <Sort
        activeSort={SortType.POPULAR}
        onSortItemClick={() => ({})}
        handleClick={() => ({})}
        isOpened={true}
      />
    </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
