import React from "react";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
export const MAP_CENTER_COORDINATES = [27.56281321321839, 76.222900390625];
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
const redCircle = L.circle([28.61973338042743, 77.26946716308594], {
    color: '#FF0000',
    fillColor: '#000',
    radius: 500
});

const markers = [
    { position: [27.56281321321839, 76.222900390625], popup: getLeafletPopup('1') },
    { position: [28.6833592931406, 77.200927734375], popup: getLeafletPopup('2') },
    { position: [29.618281599983852, 78.11578369140625], popup: getLeafletPopup('3'), options: { icon: redMarker, property: 'xyz' } },
    { position: [30.65444085998448, 79.29156494140625], options: { icon: redMarker }, popup: getLeafletPopup('4') },
    // {position:[31.61973338042743,80.26946716308594],options:{icon:redCircle}, popup: getLeafletPopup('5') }
];

function getStringPopup(name) {
    return (`
      <div>
        <b>Hello world!</b>
        <p>I am a ${name} popup.</p>
      </div>
    `);
}

// that function returns Leaflet.Popup
function getLeafletPopup(name) {
    return L.popup({ minWidth: 200, closeButton: false })
        .setContent(`
        <div>
          <b>Hello world!</b>
          <p>I am a ${name} popup.</p>
        </div>
      `);
}

const Map2 = () => {
    return (
        <Map className="markercluster-map" center={MAP_CENTER_COORDINATES} zoom={MAP_ZOOM} maxZoom={MAP_MAX_ZOOM}
            onMoveend={(e) => console.log("dekh bhai dekh", e)}
            onMovestart={(e) => console.log("dekh bhai dekh2", e)}
            onDblclick={() => console.log("dekh bhai dekh3")}
            onViewportChanged={(e) => console.log("viewport", e)}
            onclick={(e) => alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)}
        >
            {/* <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            /> */}
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup
                markers={markers}
                onMarkerClick={(marker) => console.log(marker, marker.getLatLng())}
                onClusterClick={(cluster) => console.log(cluster, cluster.getAllChildMarkers())}
                onPopupClose={(popup) => console.log(popup, popup.getContent())}
                markerOptions={{ title: 'Default title' }}
            >
                <Circle radius={500} center={{ lat: 31.61973338042743, lng: 80.26946716308594 }} color={'red'} fillColor={'green'} />
            </MarkerClusterGroup>

        </Map>
    );
}

export default Map2;