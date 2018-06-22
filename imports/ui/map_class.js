import React from "react";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Circle, Tooltip, CircleMarker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
class CustomMarkerClusterGroup extends MarkerClusterGroup {
  initEventListeners(markerClusterGroup) {
    const ON_CLUSTER = 'onCluster';
    const ON_MARKER = 'onMarker';
    const ON_POPUP = 'onPopup'
    Object.keys(this.props).forEach(k => {
      if (k.indexOf(ON_CLUSTER) === 0) {
        const eventName = k.replace(ON_CLUSTER, 'cluster').toLowerCase();
        markerClusterGroup.on(eventName, (cluster) => {
          this.props[k](cluster.layer);
        });
      } else if (k.indexOf(ON_MARKER) === 0) {
        const eventName = k.replace(ON_MARKER, '').toLowerCase();
        markerClusterGroup.on(eventName, (marker) => {
          this.props[k](marker.layer);
        });
      } else if (k.indexOf(ON_POPUP) === 0) {
        const eventName = k.replace(ON_POPUP, '').toLowerCase();
        markerClusterGroup.on(eventName, (map) => {
          this.props[k](map.popup);
        });
      }
    })
  }
}
export default class SimpleExample extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 27.56281321321839,
      lng: 76.222900390625,
      zoom: 4,
      tooltipPosition: { lat: null, lng: null },
      malePercent: null,
      femalePercent: null
    };
  }

  componentDidMount() {
    console.log(this.refs.map.leafletElement.getBounds())
  }

  render() {
    const markers = [
      { position: [27.56281321321839, 76.222900390625], tooltip: '1', options: { gender: 'M' } },
      { position: [28.6833592931406, 77.200927734375], popup: '2', options: { gender: 'F' } },
      { position: [29.618281599983852, 78.11578369140625], popup: '3', options: { gender: 'M' } },
      { position: [30.65444085998448, 79.29156494140625], popup: '4', options: { gender: 'M' } },
      // {position:[31.61973338042743,80.26946716308594],options:{icon:redCircle}, popup: getLeafletPopup('5') }
    ];
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref='map'
        onViewportChanged={(e) => console.log(e, this.refs.map.leafletElement.getBounds())}
        onclick={(e) => alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)}
        onMouseover={(e) => console.log("see", this.refs.map.leafletElement)}

      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />

        <CustomMarkerClusterGroup
          markers={markers}
          onMarkerClick={(marker) => console.log(marker, marker.getLatLng())}
          onClusterClick={(cluster) => console.log(cluster, cluster.getBounds())}
          onPopupClose={(popup) => console.log(popup, popup.getContent())}
          markerOptions={{ title: 'Default title' }}
          onClusterMouseover={(cluster) => {
            console.log(cluster.getAllChildMarkers())
            console.log(cluster.getBounds())
            let childMarkers = cluster.getAllChildMarkers();
            let bounds = cluster.getBounds();
            let lat = (bounds['_northEast'].lat + bounds['_southWest'].lat) / 2;
            let lng = (bounds['_northEast'].lng + bounds['_southWest'].lng) / 2;
            let maleCount = 0;
            let femaleCount = 0;

            childMarkers.forEach(el => {
              console.log(el.options.gender)
              if (el.options.gender == 'M') {
                maleCount++;
              }
              else if (el.options.gender == 'F') {
                femaleCount++;
              }
            })
            let totalCount = maleCount + femaleCount;
            let malePercent = (maleCount / totalCount) * 100;
            let femalePercent = (femaleCount / totalCount) * 100;
            console.log("Male cOUNT", maleCount);
            console.log("feMale cOUNT", femaleCount);
            this.setState({ tooltipPosition: { lat, lng }, malePercent, femalePercent })
            console.log(this.state)
          }}
        />
        <CircleMarker center={{ lat: this.state.tooltipPosition.lat, lng: this.state.tooltipPosition.lng }} radius={50} fillColor={'red'} stroke={false}
          onMouseout={(cluster) => {
            console.log('mouseout circle');
            this.setState({ tooltipPosition: { lat: null, lng: null } })
          }}
        >
          <Tooltip ><div style={{ height: 50, width: 300 }}> Male:{this.state.malePercent}% Female:{this.state.femalePercent}%</div></Tooltip>
        </CircleMarker>
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