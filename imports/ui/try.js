import React, { Component } from 'react'
import MarkerClusterGroup from 'react-leaflet-markercluster';

import {
  Circle,
  FeatureGroup,
  LayerGroup,
  Map,
  Popup,
  Rectangle,
  TileLayer,
  Tooltip,
  CircleMarker
} from 'react-leaflet'

export default class OtherLayersExample extends Component {
  render() {
    const center = [51.505, -0.09]
    const rectangle = [[51.49, -0.08], [51.5, -0.06]]

    return (
      <Map center={center} zoom={13}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayerGroup>
          <CircleMarker center={center} fillColor="black" radius={200} >
            <Tooltip ><div style={{ height: 50, width: 300 }}> Male:% Female:%</div></Tooltip>
            <Circle center={center} fillColor="red" radius={100} stroke={false} >
              <Tooltip ><div style={{ height: 150, width: 300 }}> Inner :%</div></Tooltip>

            </Circle>
            <MarkerClusterGroup />

          </CircleMarker>

        </LayerGroup>

      </Map>
    )
  }
}