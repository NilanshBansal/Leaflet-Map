import React from "react";

import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

export const MAP_CENTER_COORDINATES = [51.0, 19.0];
export const MAP_ZOOM = 4;
export const MAP_MAX_ZOOM = 18;

const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: 'marker-cluster-custom',
        iconSize: L.point(20, 20, true),
    });
};

/* const redMarker = L.icon({
    iconUrl: '../../assets/images/marker_map_icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }); */

const Map1 = () => {
    return (
        <Map className="markercluster-map" center={MAP_CENTER_COORDINATES} zoom={MAP_ZOOM} maxZoom={MAP_MAX_ZOOM}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <MarkerClusterGroup
                showCoverageOnHover={true}
                spiderfyDistanceMultiplier={4}
                iconCreateFunction={createClusterCustomIcon}
                zoomToBoundsOnClick={false}
            >

                <Marker position={[49.8397, 24.0297]}>
                    <Popup minWidth={200} closeButton={false}>
                        <div>
                            <b>Hello world!</b>
                            <p>I am a lonely popup.</p>
                        </div>
                    </Popup>
                </Marker>
                <Marker position={[50.4501, 30.5234]} />
                <Marker position={[52.2297, 21.0122]} />
                <Marker position={[50.0647, 19.9450]} />
                <Marker position={[48.9226, 24.7111]} />
                <Marker position={[48.7164, 21.2611]} />
                <Marker position={[51.5, -0.09]} />
                <Marker position={[51.5, -0.09]} />
                <Marker position={[51.5, -0.09]} />

            </MarkerClusterGroup>


        </Map>
    );
}

export default Map1;