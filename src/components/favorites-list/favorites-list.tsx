import * as React from 'react';
import {OfferModel} from "../../models/models";
import FavoritesListItem from "../favorites-list-item/favorites-list-item";
import {getOffersByCity} from "../../common/utils";

interface Props {
  favorites: OfferModel[];
}

const FavoritesList: React.FC<Props> = ({favorites}) => {
  const favoritesLocations = Array.from(new Set(favorites.map((favorite) => favorite.city.name)));
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favoritesLocations.map((location, i) => (
          <FavoritesListItem
            key={location}
            city={location}
            offers={getOffersByCity(favorites, favoritesLocations[i])}
          />
        ))}
      </ul>
    </section>
  );
};

export default FavoritesList;
