import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {LocationsItem} from "./locations-item";

const CITY = `Amsterdam`;

configure({
  adapter: new Adapter(),
});

describe(`LocationsItem`, () => {
  it(`should LocationsItem be pressed and invoke cb with Amsterdam city`, () => {
    const onChangeCity = jest.fn();
    const locationsListItem = shallow(
        <LocationsItem
          isNavigation={true}
          city={CITY}
          currentCity={CITY}
          onChangeCity={onChangeCity}
        />
    );
    locationsListItem.find(`a.locations__item-link`).simulate(`click`);
    expect(onChangeCity).toHaveBeenCalledTimes(1);
  });
});

