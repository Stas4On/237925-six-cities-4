import * as React from "react";
import * as leaflet from "leaflet";
import {PureComponent} from "react";
import {Location, OfferModel} from "../../models/models";
import {Icon, LatLngExpression, LayerGroup, Map} from "leaflet";

interface Props {
  offers: OfferModel[];
  activeOfferId: number;
  city: Location;
}

class CityMap extends PureComponent<Props> {
  private readonly _defaultIcon: Icon;
  private readonly _activeIcon: Icon;
  private readonly _mapRef: React.RefObject<HTMLDivElement>;
  private _map: Map;
  private _layerGroup: LayerGroup;

  constructor(props) {
    super(props);
    this._mapRef = React.createRef();
    this._map = null;
    this._layerGroup = null;
    this._defaultIcon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
    this._activeIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 30]
    });
  }

  private _getCoordinate(location: Location): LatLngExpression {
    return [location.latitude, location.longitude];
  }

  private _setView(city, zoom) {
    this._map.setView(city, zoom);
  }

  componentDidMount() {
    if (this._mapRef.current) {
      const {city} = this.props;
      const cityCoordinate = this._getCoordinate(city);
      const mapZoom = city.zoom;

      this._map = leaflet.map(this._mapRef.current.id, {
        center: cityCoordinate,
        zoom: mapZoom,
        zoomControl: false
      });

      this._setView(cityCoordinate, mapZoom);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this._map);

      this._layerGroup = leaflet.layerGroup().addTo(this._map);

      this.updateMap();
    }
  }

  componentDidUpdate() {
    const {city} = this.props;

    this._setView(this._getCoordinate(city), city.zoom);
    this._layerGroup.clearLayers();
    this.updateMap();
  }

  componentWillUnmount() {
    this._map = null;
  }

  updateMap() {
    this.props.offers.forEach((offer) => {
      leaflet
        .marker(this._getCoordinate(offer.location), {icon: offer.id === this.props.activeOfferId ? this._activeIcon : this._defaultIcon})
        .addTo(this._layerGroup);
    });
  }

  render() {
    return (
      <div id="map" ref={this._mapRef} style={{height: `100%`}}/>
    );
  }
}

export default CityMap;
