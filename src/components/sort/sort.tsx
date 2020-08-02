import * as React from "react";
import {connect} from "react-redux";
import {SortTypeNames} from "../../constants/constants";
import {SortType} from "../../models/models";
import {getEnumKeys} from "../../common/utils";
import {ActionCreator} from "../../reducer/city-places/city-places";

interface Props {
  activeSort: string;
  onSortItemClick: (type: SortType) => void;
  handleClick: () => void;
  isOpened: boolean;
}

const Sort: React.FunctionComponent<Props> = ({activeSort, onSortItemClick, handleClick: onSortClick, isOpened}) => {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onSortClick}>
        {SortTypeNames[activeSort] || SortTypeNames[SortType.POPULAR]}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={isOpened
        ? `places__options places__options--custom places__options--opened`
        : `places__options places__options--custom`}
      >
        {getEnumKeys(SortType).map((type) => {
          return (
            <li
              className={activeSort === SortType[type] ?
                `places__option places__option--active` :
                `places__option`}
              tabIndex={0}
              onClick={() => {
                onSortItemClick(SortType[type]);
                onSortClick();
              }}
              key={type}
            >
              {SortTypeNames[SortType[type]]}
            </li>
          );
        })}
      </ul>
    </form>
  );
};

const mapStateToProps = (state) => ({
  activeSort: state.activeSort,
});

const mapDispatchToProps = (dispatch) => ({
  onSortItemClick(sort) {
    dispatch(ActionCreator.changeSort(sort));
  },
});

export {Sort};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
