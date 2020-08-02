import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Sort} from './sort';
import {SortType} from "../../models/models";
import {getEnumKeys} from "../../common/utils";

const activeSort = `popular`;

Enzyme.configure({
  adapter: new Adapter(),
});

it(`When user change sort types`, () => {
  const onSortItemClick = jest.fn();
  const onSortClick = jest.fn();

  const sort = Enzyme.mount(
      <Sort
        activeSort={activeSort}
        onSortItemClick={onSortItemClick}
        handleClick={onSortClick}
        isOpened={true}
      />
  );

  const sortElements = sort.find(`.places__option`);
  const keys = getEnumKeys(SortType);

  sortElements.forEach((elem, i) => {
    elem.simulate(`click`);
    expect(onSortItemClick).toBeCalledWith(SortType[keys[i]]);
  });
});
