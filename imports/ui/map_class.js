import React from "react";
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
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

const DEFAULT_VIEWPORT = {
  center: [22, 70],
  zoom: 13,
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
      femalePercent: null,
      viewport: DEFAULT_VIEWPORT,
      query: "",
      viewport_bounds: { _northEast: { lat: null, lng: null }, _southWest: { lat: null, lng: null } }

    };
  }

  componentDidMount() {
    console.log(this.refs.map.leafletElement.getBounds())
    this.setState({ viewport_bounds: { _northEast: this.refs.map.leafletElement.getBounds()['_northEast'], _southWest: this.refs.map.leafletElement.getBounds()['_southWest'] } })
  }

  getCoordinates() {
    console.log('here')
    let URL = `http://api.geonames.org/searchJSON?q=${this.state.query}&maxRows=1&username=sanchittanwar7`
    fetch(URL, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        let center = [], zoom
        center.push(parseFloat(json.geonames[0].lat))
        center.push(parseFloat(json.geonames[0].lng))
        if (json.geonames[0].fcl === 'A')
          zoom = 4
        else
          zoom = 10
        let viewport = {
          center: center,
          zoom: zoom
        }
        console.log(viewport)
        this.setState({ viewport })
        // console.log('artist', artist);
        // this.setState({artist, stats: artist.stats, bio: artist.bio, images: artist.image});
      });
  }



  render() {
    const redMarker = L.icon({
      iconUrl: '/images/marker_map_icon.png',
      iconSize: [40, 40],
      iconAnchor: [40, 40],
      popupAnchor: [-20, -25],
      tooltipAnchor: [-20, -25]
    });
    const markers = [
      { position: [27.56281321321839, 76.222900390625], popup: '1', options: { gender: 'M', icon: redMarker } },
      { position: [28.6833592931406, 77.200927734375], popup: '2', options: { gender: 'F' } },
      { position: [29.618281599983852, 78.11578369140625], popup: '3', options: { gender: 'M', icon: redMarker } },
      { position: [30.65444085998448, 79.29156494140625], popup: '4', options: { gender: 'M', icon: redMarker } },
    ];

    const position = [this.state.lat, this.state.lng];
    return (
      <div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an place"
              value={this.state.query}
              onChange={event => { this.setState({ query: event.target.value }) }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.getCoordinates();
                }
              }}
            />
            <InputGroup.Addon className="searchButton" onClick={() => this.getCoordinates()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Map center={position} zoom={this.state.zoom} ref='map'
          onViewportChanged={(e) => { console.log(e, this.refs.map.leafletElement.getBounds()); this.setState({ viewport_bounds: { _northEast: this.refs.map.leafletElement.getBounds()['_northEast'], _southWest: this.refs.map.leafletElement.getBounds()['_southWest'] } }) }}
          onclick={(e) => {
            alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
            this.setState({ viewport: DEFAULT_VIEWPORT })
          }}
          onMouseover={(e) => console.log("see", this.refs.map.leafletElement)}
          viewport={this.state.viewport}

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
          <CircleMarker center={{ lat: this.state.tooltipPosition.lat, lng: this.state.tooltipPosition.lng }} radius={50} fillColor={'brown'} fillOpacity={this.state.malePercent/100} stroke={false}
            onMouseout={(cluster) => {
              console.log('mouseout circle');
              this.setState({ tooltipPosition: { lat: null, lng: null } })
            }}
          >
            <Tooltip ><div style={{ height: 50, width: 300 }}> Male:{this.state.malePercent}% Female:{this.state.femalePercent}%</div></Tooltip>
          </CircleMarker>
        </Map>
        <div className="container">
          <ol>
            <h3>ALL MARKERS</h3>
            {markers.map((marker, index) => {
              return <li key={index} >{marker.options.gender}---- Latitude-->{marker.position[0]}---Longitude-->{marker.position[1]}--Popup Text-->{marker.popup}</li>
            })}
          </ol>
          <h3>ViewPort Bounds</h3>
          <b>NorthEast:</b> Latitude-->{this.state.viewport_bounds._northEast.lat}--- Longitude-->{this.state.viewport_bounds._northEast.lng}<br />
          <b>SouthWest:</b> Latitude-->{this.state.viewport_bounds._southWest.lat}--- Longitude-->{this.state.viewport_bounds._southWest.lng}

          <h3>Markers Currently in Viewport </h3>
          <ol>
            {markers.map((marker, index) => {
              if ((this.state.viewport_bounds._southWest.lat <= marker.position[0] && marker.position[0] <= this.state.viewport_bounds._northEast.lat) && (this.state.viewport_bounds._southWest.lng <= marker.position[1] && marker.position[1] <= this.state.viewport_bounds._northEast.lng))
                return <li key={index} >{marker.options.gender}---- Latitude-->{marker.position[0]}---Longitude-->{marker.position[1]}--Popup Text-->{marker.popup}</li>
              else
                return
            })}
          </ol>
        </div>
      </div>
    );
  }
}