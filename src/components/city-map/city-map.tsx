import * as React from "react";
import * as leaflet from "leaflet";
import {PureComponent} from "react";
import {OfferModel} from "../../models";
import {Icon, LatLngExpression, LayerGroup, Map} from "leaflet";

interface Props {
  offers: OfferModel[];
  activeOfferId: number;
}

class CityMap extends PureComponent<Props> {
  private readonly defaultIcon: Icon;
  private readonly activeIcon: Icon;
  private readonly mapRef: React.RefObject<HTMLDivElement>;
  private mapConf: {
    city: LatLngExpression;
    zoom: number;
  };
  private map: Map;
  private layerGroup: LayerGroup;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.mapConf = {
      city: [52.38333, 4.9],
      zoom: 12
    };
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

  componentDidMount() {
    if (this.mapRef.current) {
      this.map = leaflet.map(this.mapRef.current.id, {
        center: this.mapConf.city,
        zoom: this.mapConf.zoom,
        zoomControl: false
      });

      this.map.setView(this.mapConf.city, this.mapConf.zoom);

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
    this.map.setView(this.mapConf.city, this.mapConf.zoom);
    this.layerGroup.clearLayers();
    this.updateMap();
  }

  componentWillUnmount() {
    this.map = null;
  }

  updateMap() {
    this.props.offers.forEach((offer) => {
      leaflet
        .marker(offer.coordinates, {icon: offer.id === this.props.activeOfferId ? this.activeIcon : this.defaultIcon})
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
