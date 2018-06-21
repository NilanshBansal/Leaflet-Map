import React from "react";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup,Circle } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
export default class SimpleExample extends React.Component {
    constructor() {
      super();
      this.state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
      };
    }
  
    componentDidMount() {
      console.log(this.refs.map.leafletElement.getBounds())
    }
  
    render() {
        const markers = [
            { position: [27.56281321321839, 76.222900390625] ,popup: '1'},
            { position: [28.6833592931406, 77.200927734375] ,popup: '2'},
            { position: [29.618281599983852, 78.11578369140625], popup: '3' },
            { position: [30.65444085998448, 79.29156494140625],  popup: '4' },
            // {position:[31.61973338042743,80.26946716308594],options:{icon:redCircle}, popup: getLeafletPopup('5') }
        ];
      const position = [this.state.lat, this.state.lng];
      return (
        <Map center={position} zoom={this.state.zoom} ref='map'
        onViewportChanged={(e)=>console.log(e,this.refs.map.leafletElement.getBounds())}
        onclick={(e)=>alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)}
        onMouseover={(e)=>console.log("see",this.refs.map.leafletElement)}
        
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />

          <MarkerClusterGroup
                markers={markers}
                onMarkerClick={(marker) => console.log(marker, marker.getLatLng())}
                onClusterClick={(cluster) => console.log(cluster, cluster.getBounds())}
                onPopupClose={(popup) => console.log(popup, popup.getContent())}
                markerOptions={{ title: 'Default title' }}
            />
        </Map>
      );
    }
  }

  /* {
    "_southWest": {
      "lat": 51.40456914959206,
      "lng": 0.030825664289295677
    },
    "_northEast": {
      "lat": 51.43133264701218,
      "lng": 0.11356644798070194
    }
  } */


  /* To check coordinates 
  if southWest lat > and <northeast lat
        and 
  southWest lng > and <northeast lng */