import * as React from "react";
import * as leaflet from "leaflet";
import {PureComponent} from "react";
import {OfferModel} from "../../models";

interface Props {
  offers: OfferModel[];
}

class Map extends PureComponent<Props> {
  private coordinates: number[];
  private mapRef: React.RefObject<HTMLDivElement>;
  private mapConf: { city: number[]; iconSize: number[]; zoom: number; iconUrl: string };
  private map: any;

  constructor(props) {
    super(props);
    this.coordinates = props.offers.map((offer) => offer.coordinates);
    this.mapRef = React.createRef();
    this.mapConf = {
      city: [52.38333, 4.9],
      zoom: 12,
      iconSize: [30, 30],
      iconUrl: `img/pin.svg`,

    };
    this.map = null;
  }

  componentDidMount() {
    if (this.mapRef.current) {
      this.map = leaflet.map(this.mapRef.current.id, {
        center: this.mapConf.city,
        zoom: this.mapConf.zoom,
        zoomControl: false,
        marker: true
      });

      const icon = leaflet.icon({
        iconUrl: this.mapConf.iconUrl,
        iconSize: this.mapConf.iconSize
      });

      this.map.setView(this.mapConf.city, this.mapConf.zoom);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(this.map);

      this.coordinates.forEach((cord) => {
        leaflet
          .marker(cord, {icon})
          .addTo(this.map);
      });
    }
  }

  render() {
    return (
      <div id="map" ref={this.mapRef} style={{height: `100%`}} />
    );
  }
}

export default Map;
