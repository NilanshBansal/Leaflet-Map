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

const redMarker = L.icon({
    iconUrl: '/images/marker_map_icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

const markers = [
    { position: [49.8397, 24.0297] },
    { position: [52.2297, 21.0122] },
    { position: [51.5074, -0.0901], popup: 'Hello world' },
    { position: [51.5, -0.09], options: { icon: redMarker } }
];

const Map1 = () => {
    return (
        <Map className="markercluster-map" center={MAP_CENTER_COORDINATES} zoom={MAP_ZOOM} maxZoom={MAP_MAX_ZOOM}>
            <MarkerClusterGroup
                markers={markers}
                onMarkerClick={(marker) => console.log(marker, marker.getLatLng())}
                onClusterClick={(cluster) => console.log(cluster, cluster.getAllChildMarkers())}
                onPopupClose={(popup) => console.log(popup, popup.getContent())}
                markerOptions={{ icon: redMarker, title: 'Default title' }}
            />
        </Map>
    );
}

export default Map1;