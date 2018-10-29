import React from "react";
import { Map, TileLayer, Marker, Popup, Circle, Tooltip, CircleMarker } from 'react-leaflet';
export default class SimpleExample extends React.Component {
  constructor() {
    super();
    this.state = {
      markers: [[51.505, -0.09]]
    };
  }

  addMarker = (e) => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
  }

  render() {
    return (
      <Map 
        center={[51.505, -0.09]} 
        onClick={this.addMarker}
        zoom={13} 
        >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.state.markers.map((position, idx) => 
          <Marker key={`marker-${idx}`} position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
        )}
      </Map>
    );
  }
}