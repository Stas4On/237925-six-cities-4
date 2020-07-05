import * as React from "react";
import * as leaflet from "leaflet";
import {PureComponent} from "react";
import {OfferModel} from "../../models";
import {Icon, LatLngExpression, LayerGroup, Map, PointExpression} from "leaflet";

interface Props {
  offers: OfferModel[];
}

class CityMap extends PureComponent<Props> {
  private readonly icon: Icon;
  private readonly mapRef: React.RefObject<HTMLDivElement>;
  private mapConf: {
    city: LatLngExpression;
    iconSize: PointExpression;
    zoom: number;
    iconUrl: string;
  };
  private map: Map;
  private layerGroup: LayerGroup;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.mapConf = {
      city: [52.38333, 4.9],
      zoom: 12,
      iconSize: [30, 30],
      iconUrl: `img/pin.svg`,
    };
    this.map = null;
    this.layerGroup = null;
    this.icon = leaflet.icon({
      iconUrl: this.mapConf.iconUrl,
      iconSize: this.mapConf.iconSize
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

  getCords(offers): LatLngExpression[] {
    return offers.map((offer) => offer.coordinates);
  }

  updateMap() {
    const coordinates: LatLngExpression[] = this.getCords(this.props.offers);

    coordinates.forEach((cord) => {
      leaflet
        .marker(cord, {icon: this.icon})
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
