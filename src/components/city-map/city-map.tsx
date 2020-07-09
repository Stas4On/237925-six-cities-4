import * as React from "react";
import * as leaflet from "leaflet";
import {PureComponent} from "react";
import {Location, OfferModel} from "../../models";
import {Icon, LatLngExpression, LayerGroup, Map} from "leaflet";

interface Props {
  offers: OfferModel[];
  activeOfferId: number;
  city: Location;
}

class CityMap extends PureComponent<Props> {
  private readonly defaultIcon: Icon;
  private readonly activeIcon: Icon;
  private readonly mapRef: React.RefObject<HTMLDivElement>;
  private map: Map;
  private layerGroup: LayerGroup;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.map = null;
    this.layerGroup = null;
    this.defaultIcon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
    this.activeIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 30]
    });
  }

  private _getCoordinate(location: Location): LatLngExpression {
    return [location.latitude, location.longitude];
  }

  private _setView(city, zoom) {
    this.map.setView(city, zoom);
  }

  componentDidMount() {
    if (this.mapRef.current) {
      const {city} = this.props;
      const cityCoordinate = this._getCoordinate(city);
      const mapZoom = city.zoom;

      this.map = leaflet.map(this.mapRef.current.id, {
        center: cityCoordinate,
        zoom: mapZoom,
        zoomControl: false
      });

      this._setView(cityCoordinate, mapZoom);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this.map);

      this.layerGroup = leaflet.layerGroup().addTo(this.map);

      this.updateMap();
    }
  }

  componentDidUpdate() {
    const {city} = this.props;

    this._setView(this._getCoordinate(city), city.zoom);
    this.layerGroup.clearLayers();
    this.updateMap();
  }

  componentWillUnmount() {
    this.map = null;
  }

  updateMap() {
    this.props.offers.forEach((offer) => {
      leaflet
        .marker(this._getCoordinate(offer.location), {icon: offer.id === this.props.activeOfferId ? this.activeIcon : this.defaultIcon})
        .addTo(this.layerGroup);
    });
  }

  render() {
    return (
      <div id="map" ref={this.mapRef} style={{height: `100%`}}/>
    );
  }
}

export default CityMap;
