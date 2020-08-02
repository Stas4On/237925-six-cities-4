import {AuthStatus, OfferModel, User} from "../../models/models";
import Header from "../header/header";
import * as React from "react";
import {connect} from "react-redux";
import {getFavoriteOffers} from "../../reducer/data/selectors";
import FavoritesEmpty from "../favorites-empty/favorites-empty";
import Footer from "../footer/footer";
import FavoritesList from "../favorites-list/favorites-list";
import {Operation as DataOperation} from "../../reducer/data/data";

interface Props {
  authStatus: AuthStatus;
  userInfo: User;
  favorites: OfferModel[];
  onLoadFavoriteOffers: () => OfferModel[];
}

class Favorites extends React.PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoadFavoriteOffers();
  }

  render() {
    const {authStatus, userInfo, favorites} = this.props;
    const isEmpty = favorites.length === 0;

    return (
      <div className={`page page--favorites ${isEmpty ? `page--favorites-empty` : ``}`}>
        <Header authStatus={authStatus} userInfo={userInfo}/>
        <main className={`page__main page__main--favorites ${isEmpty ? `page__main--favorites-empty` : ``}`}>
          <div className="page__favorites-container container">
            {isEmpty ?
              <FavoritesEmpty/> :
              <FavoritesList favorites={favorites}/>
            }
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favorites: getFavoriteOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFavoriteOffers() {
    dispatch(DataOperation.loadFavoriteOffers());
  },
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
