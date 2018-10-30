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
  center: [30,90],
  zoom: 5,
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
    let URL = `https://secure.geonames.org/searchJSON?q=${this.state.query}&maxRows=1&username=nilanshbansal`
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

    const maleMarker = L.icon({
      // iconUrl: '/images/myAvatar (1).svg',
      iconUrl: '/images/marker_map_icon.png',
      iconSize: [40, 40],
      iconAnchor: [40, 40],
      popupAnchor: [-20, -25],
      tooltipAnchor: [-20, -25]
    });

    const femaleMarker = L.icon({
      // iconUrl: '/images/myAvatar (2).svg',
      iconUrl: '/images/marker_map_icon_blue.png',
      iconSize: [40, 40],
      iconAnchor: [40, 40],
      popupAnchor: [-20, -25],
      tooltipAnchor: [-20, -25]
    });

    const markers = [{
      options: { gender: 'M', icon: maleMarker },
      popup: '1',
      position: [76.222900390625, 27.56281321321839]
    },
    {
      options: { gender: 'F' , icon:femaleMarker},
      popup: '2',
      position: [77.200927734375, 28.6833592931406]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      popup: '3',
      position: [78.11578369140625, 29.618281599983852]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      popup: '4',
      position: [79.29156494140625, 30.65444085998448]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      popup: '4',
      position: [80.29156494140625, 31.65444085998448]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      popup: '4',
      position: [81.29156494140625, 32.65444085998448]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      popup: '1',
      position: [27.761329874505233, 73.4326171875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [30.06909396443887, 75.41015624999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [28.76765910569123, 80.2880859375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [26.115985925333536, 80.8154296875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [25.48295117535531, 85.2978515625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [23.039297747769726, 84.55078125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [22.187404991398775, 84.462890625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.002471054356725, 83.84765625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [21.69826549685252, 86.2646484375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [20.014645445341365, 84.72656249999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [20.756113874762082, 82.7490234375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [22.51255695405145, 82.79296874999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [24.44714958973082, 83.232421875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.367113562651262, 84.3310546875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.363882272740256, 81.5185546875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.287026865376436, 81.5625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.765236889758672, 81.9580078125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [23.241346102386135, 81.5185546875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [23.36242859340884, 80.2880859375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.20494115356912, 80.2880859375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.799891182088334, 79.2333984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.941659545381516, 79.3212890625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [28.536274512989916, 78.0029296875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [28.188243641850313, 75.1904296875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [27.916766641249065, 75.8056640625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.115985925333536, 77.431640625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.3241665257384, 75.2783203125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [27.176469131898898, 75.05859375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.902476886279832, 73.65234375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.284437746983055, 73.30078125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.839449402063185, 71.4990234375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.00632619875113, 72.1142578125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.206889622398023, 74.00390625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [22.06527806776582, 73.95996093749999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [20.92039691397189, 73.6083984375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [20.097206227083888, 74.7509765625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [19.02057711096681, 74.1357421875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [18.47960905583197, 75.76171875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [17.308687886770034, 75.322265625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [16.594081412718474, 77.2998046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [15.749962572748768, 76.11328125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [14.604847155053898, 77.47558593749999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [13.581920900545844, 76.5966796875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [16.04581345375217, 74.619140625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [11.221510260010541, 75.9814453125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [11.221510260010541, 77.080078125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [12.683214911818666, 77.0361328125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [12.039320557540572, 78.22265625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [10.703791711680736, 78.31054687499999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [10.14193168613103, 77.2998046875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [9.058702156392139, 77.3876953125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [10.012129557908155, 78.31054687499999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [10.746969318460001, 79.189453125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [12.683214911818666, 79.013671875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [14.00869637063467, 78.75]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [14.3069694978258, 78.134765625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [15.538375926292062, 78.7060546875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [15.411319377980993, 80.37597656249999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [18.06231230454674, 79.8046875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [17.26672782352052, 78.046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [19.559790136497412, 77.34374999999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [20.097206227083888, 76.201171875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.657428197370653, 75.1904296875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [23.079731762449878, 75.41015624999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [24.647017162630366, 75.3662109375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.56710835257599, 77.080078125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.350075806124867, 76.9921875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.755920681486405, 78.5302734375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [23.60426184707018, 78.2666015625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.3241665257384, 78.44238281249999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.806681353851964, 79.365234375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.96617587126503, 79.2333984375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [23.200960808078566, 79.8486328125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [22.187404991398775, 80.771484375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.37124437061831, 81.2548828125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [19.80805412808859, 81.2548828125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [19.601194161263145, 83.0126953125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [18.729501999072138, 83.1005859375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [17.936928637549443, 82.08984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [17.5602465032949, 81.6064453125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [18.521283325496277, 80.9033203125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [18.979025953255267, 81.123046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [19.80805412808859, 79.9365234375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [18.895892559415024, 79.6728515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [19.601194161263145, 79.013671875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [20.427012814257385, 77.9150390625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [20.838277806058933, 78.837890625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.861498734372567, 78.9697265625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [21.657428197370653, 78.0029296875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.248422235627014, 77.431640625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.39071391683855, 76.728515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [21.4121622297254, 76.37695312499999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [23.120153621695614, 75.89355468749999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [30.14512718337613, 58.71093750000001]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [37.43997405227057, 58.00781249999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [36.59788913307022, 47.8125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [46.558860303117164, 37.6171875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [56.36525013685606, 40.078125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [54.97761367069628, 10.8984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [50.736455137010665, 17.9296875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [49.61070993807422, 10.8984375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [45.82879925192134, -2.8125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [20.632784250388028, 3.1640625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [20.3034175184893, 17.9296875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [20.3034175184893, -15.8203125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [14.944784875088372, -7.734374999999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [12.211180191503997, 13.0078125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [-7.01366792756663, 16.171875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [-18.979025953255267, 32.6953125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [-28.30438068296277, 28.828124999999996]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [-20.3034175184893, 18.28125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-5.266007882805485, 33.75]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [6.664607562172573, 31.289062500000004]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [4.214943141390651, 24.2578125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [22.268764039073968, 20.390625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.206889622398023, 33.75]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [16.29905101458183, 40.78125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [2.4601811810210052, 35.5078125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [11.178401873711785, 30.937499999999996]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [28.613459424004414, 8.7890625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [27.371767300523047, 54.4921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [22.917922936146045, 48.8671875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [43.58039085560784, 22.148437499999996]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [49.15296965617042, 24.2578125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [64.01449619484472, 24.960937499999996]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [69.53451763078358, 32.34375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [65.36683689226321, 14.414062499999998]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [62.91523303947614, 12.3046875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [59.712097173322924, 46.05468749999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [57.89149735271034, 37.6171875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [64.32087157990324, 35.859375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [64.32087157990324, 54.4921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [57.70414723434193, 50.9765625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [49.61070993807422, 50.9765625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [51.39920565355378, 45]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [41.244772343082076, 45]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [43.068887774169625, 56.953125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [53.9560855309879, 59.4140625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [54.97761367069628, 59.4140625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [59.88893689676585, 59.4140625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [64.16810689799152, 58.71093750000001]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [69.16255790810501, 59.0625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [70.37785394109224, 81.5625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [72.18180355624855, 101.953125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [74.59010800882325, 101.6015625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [74.4021625984244, 94.5703125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [73.72659470212253, 88.9453125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [75.05035357407698, 109.6875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [72.39570570653261, 109.6875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [72.60712040027555, 122.34374999999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [70.37785394109224, 127.96875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [70.61261423801925, 135.35156249999997]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [68.9110048456202, 138.515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [69.53451763078358, 151.5234375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [68.78414378041504, 161.3671875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [68.78414378041504, 175.078125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [64.47279382008166, 173.671875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [64.47279382008166, 165.58593749999997]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [59.355596110016315, 165.58593749999997]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [62.431074232920906, 153.984375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [67.20403234340081, 142.3828125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [64.77412531292873, 136.0546875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [62.75472592723178, 139.5703125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [61.10078883158897, 130.78125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [63.54855223203644, 128.671875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [63.54855223203644, 115.31249999999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [62.431074232920906, 119.88281249999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [61.10078883158897, 125.859375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [55.97379820507658, 124.45312499999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [50.064191736659104, 115.6640625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [49.38237278700955, 93.1640625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [31.653381399664, 94.921875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [29.22889003019423, 83.671875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.59372606392931, 79.8046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [28.613459424004414, 79.8046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [28.613459424004414, 75.9375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [31.052933985705163, 66.4453125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [32.84267363195431, 72.0703125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [45.336701909968134, 63.6328125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [42.293564192170095, 79.1015625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [33.43144133557529, 78.3984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [8.059229627200192, 79.1015625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.268764039073968, 69.2578125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.59372606392931, 89.6484375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [42.5530802889558, 85.4296875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [60.413852350464914, 61.52343749999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [52.26815737376817, 60.8203125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [53.54030739150022, 74.8828125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [49.15296965617042, 67.1484375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [61.438767493682825, 89.6484375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [62.103882522897855, 74.53125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [64.32087157990324, 61.52343749999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [67.33986082559095, 64.6875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [66.08936427047088, 78.046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [60.413852350464914, 73.125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [58.07787626787517, 93.1640625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [50.064191736659104, 88.9453125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [53.74871079689897, 108.6328125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [58.07787626787517, 106.875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [64.01449619484472, 93.515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [65.94647177615738, 84.0234375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [66.79190947341796, 93.8671875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [69.53451763078358, 108.6328125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [64.62387720204688, 108.6328125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [65.5129625532949, 99.49218749999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [61.938950426660604, 106.171875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [60.75915950226991, 118.828125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [68.00757101804004, 118.828125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [68.65655498475735, 124.1015625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [49.38237278700955, 127.265625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [36.59788913307022, 109.3359375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [40.17887331434696, 95.97656249999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.94304553343818, 102.3046875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-25.48295117535531, 127.265625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-27.994401411046148, 117.7734375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [-27.059125784374054, 137.8125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-21.943045533438166, 137.8125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-27.68352808378776, 148.7109375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-34.016241889667015, 145.1953125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-0.3515602939922709, -75.9375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [5.61598581915534, -65.7421875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-1.0546279422758742, -52.3828125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [-19.973348786110602, -51.328125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-11.178401873711772, -67.1484375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-26.74561038219901, -62.57812500000001]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-35.46066995149529, -68.5546875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [-44.840290651397986, -67.5]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [43.068887774169625, -81.5625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [37.16031654673677, 78.75]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [34.30714385628804, 85.4296875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [31.052933985705163, 89.6484375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [33.137551192346145, 94.5703125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [31.653381399664, 98.7890625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [31.653381399664, 109.6875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [40.97989806962013, 109.6875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.84656534821976, 109.6875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [26.745610382199022, 120.58593749999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [34.88593094075317, 119.17968749999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [35.17380831799959, 115.6640625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [42.032974332441405, 115.6640625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [42.032974332441405, 123.04687499999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [49.83798245308484, 130.4296875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [46.800059446787316, 133.9453125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [54.97761367069628, 133.2421875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [41.77131167976407, 91.7578125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [40.97989806962013, 99.140625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [45.583289756006316, 114.60937499999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [49.15296965617042, 119.88281249999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [52.696361078274485, 77.6953125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [42.5530802889558, 84.0234375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [47.27922900257082, 86.484375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [39.90973623453719, 89.6484375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [38.8225909761771, 80.15625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [34.59704151614417, 108.6328125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [47.517200697839414, 92.10937499999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [56.75272287205736, 94.21875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [48.45835188280866, 76.9921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [47.754097979680026, 67.5]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [41.77131167976407, 73.47656249999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [42.5530802889558, 53.0859375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [52.26815737376817, 52.734375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [50.064191736659104, 34.453125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [50.064191736659104, 20.0390625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [47.040182144806664, 22.8515625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [43.32517767999296, 22.148437499999996]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [46.800059446787316, 13.7109375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [46.800059446787316, -0.703125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [48.45835188280866, 3.515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [51.83577752045248, 29.179687499999996]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [60.06484046010452, 22.5]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [69.16255790810501, 27.0703125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [65.2198939361321, 17.578125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [59.712097173322924, 16.875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [59.355596110016315, 52.734375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [67.20403234340081, 59.4140625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [63.860035895395306, 44.29687499999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [59.17592824927136, 50.2734375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [58.26328705248601, 47.109375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [60.06484046010452, 91.0546875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [69.41124235697256, 88.24218749999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [50.28933925329178, 69.60937499999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [61.938950426660604, 69.9609375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [64.32087157990324, 61.52343749999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [69.65708627301174, 82.265625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [71.18775391813158, 104.765625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [72.50172235139388, 104.765625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [70.49557354093136, 111.796875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [53.12040528310657, 97.734375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [33.394759218577995, 75.89355468749999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [33.284619968887675, 74.7509765625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [33.8339199536547, 75.2783203125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [33.7243396617476, 76.2890625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [32.95336814579932, 77.3876953125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [33.137551192346145, 78.486328125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [31.353636941500987, 77.6953125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [32.287132632616384, 76.46484375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [31.240985378021307, 75.5419921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [30.221101852485987, 75.41015624999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [29.305561325527698, 73.8720703125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [27.449790329784214, 72.2900390625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [27.21555620902969, 70.751953125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.07652055985697, 70.83984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.07652055985697, 72.99316406249999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.885837699862005, 72.1142578125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.12539261151203, 71.3671875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.059516273509303, 71.91650390625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.67484735118852, 70.90576171875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [22.370396344320053, 70.1806640625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [21.861498734372567, 69.89501953125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [21.53484700204879, 71.16943359375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.248428704383624, 71.96044921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.963424936844223, 70.83984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.301901124188877, 73.63037109375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [25.045792240303445, 73.10302734375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.588527147308614, 73.93798828125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.82407078047018, 73.388671875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [28.420391085674304, 73.7841796875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [28.497660832963472, 75.146484375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [29.82158272057499, 76.11328125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [30.031055426540206, 77.14599609375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [30.977609093348686, 77.84912109375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [30.50548389892728, 76.7724609375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [30.86451022625836, 80.17822265625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [29.53522956294847, 79.95849609375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [29.516110386062277, 78.06884765624999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [28.265682390146477, 77.36572265625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [28.323724553546015, 76.025390625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [28.9600886880068, 76.86035156249999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [29.05616970274342, 76.04736328125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [29.592565403314087, 77.58544921874999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [29.209713225868185, 77.58544921874999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [28.729130483430154, 77.080078125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [28.38173504322308, 78.046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [28.07198030177986, 76.728515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [27.430289738862594, 75.25634765625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.588527147308614, 75.5859375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [27.293689224852407, 76.9482421875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [27.371767300523047, 75.12451171875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [27.254629577800063, 74.3115234375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [25.46311452925943, 75.4541015625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.886436490787712, 74.70703125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [26.194876675795218, 74.33349609375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.293415004265796, 76.53076171875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.84656534821976, 75.69580078125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [24.56710835257599, 73.740234375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.38259828417886, 74.55322265625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [22.268764039073968, 73.89404296875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.471954507739227, 72.99316406249999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [20.879342971957897, 73.037109375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.002471054356725, 74.8388671875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [19.91138351415555, 74.24560546875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [20.097206227083888, 75.2783203125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [18.417078658661257, 72.88330078125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [19.145168196205297, 73.125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [20.488773287109836, 73.63037109375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [19.37334071336406, 74.1357421875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [17.748686651728807, 74.94873046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [17.20376982191752, 73.41064453125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [18.35452552912664, 73.54248046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [18.58377568837094, 75.4541015625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [19.642587534013032, 75.673828125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.105000275382064, 75.673828125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [21.80030805097259, 74.970703125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.90227796666864, 73.828125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.248428704383624, 74.68505859374999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.32208001137843, 75.146484375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.32208001137843, 76.17919921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.00632619875113, 76.17919921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.686952411999155, 78.134765625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.54244147012483, 77.87109375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.20494115356912, 76.5966796875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [27.488781168937997, 77.89306640625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.70635985763354, 78.81591796875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [28.57487404744697, 78.8818359375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [28.22697003891834, 80.48583984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [29.53522956294847, 80.61767578124999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [28.76765910569123, 82.37548828125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [27.916766641249065, 81.73828125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [28.38173504322308, 84.55078125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [29.267232865200878, 81.84814453125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [30.06909396443887, 82.3974609375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [30.12612436422458, 81.2109375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [28.786918085420226, 81.27685546875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [27.97499795326776, 84.5947265625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [27.430289738862594, 84.72656249999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [25.720735134412106, 78.3984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.391869671769022, 81.5185546875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [27.994401411046148, 80.5517578125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [27.994401411046148, 84.19921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [27.839076094777816, 87.7587890625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [26.941659545381516, 87.7587890625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [26.588527147308614, 84.72656249999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.59372606392931, 84.0673828125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [24.886436490787712, 79.89257812499999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.44714958973082, 80.0244140625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [19.062117883514652, 78.75]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.637005211106306, 78.662109375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [21.94304553343818, 76.92626953125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [22.43134015636061, 78.20068359374999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.695120184965695, 77.93701171875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.039297747769726, 75.56396484375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.654571520098994, 75.56396484375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.350781150679737, 77.607421875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [20.3034175184893, 76.09130859375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [18.417078658661257, 78.59619140625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [17.41354611437445, 76.2890625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [16.130262012034756, 74.20166015624999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [17.602139123350838, 74.81689453125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [17.623081791311755, 75.9375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [18.35452552912664, 75.9375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [18.417078658661257, 77.49755859375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [18.812717856407776, 77.080078125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [19.290405639497994, 77.783203125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [21.06399706324597, 77.6513671875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [19.31114335506464, 76.17919921875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [21.514406720030294, 76.04736328125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.53285370752713, 80.88134765625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.347096633808512, 78.92578124999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [23.443088931121785, 78.28857421875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.805449612314625, 77.1240234375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [25.661333498952683, 81.40869140625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [25.443274612305746, 79.40917968749999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.963424936844223, 82.08984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [24.70691524106633, 82.3974609375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.025884063244828, 81.23291015625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [27.059125784374068, 82.24365234375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [26.52956523826758, 82.24365234375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.93828707492375, 82.81494140625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [26.56887654795065, 84.462890625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.562265014427492, 83.91357421875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [25.54244147012483, 82.265625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [24.5271348225978, 83.86962890625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.120153621695614, 82.6611328125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [21.718679805703154, 83.75976562499999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [20.92039691397189, 82.08984375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.514406720030294, 80.00244140625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [19.580493479202527, 80.22216796875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [20.076570104545173, 82.33154296875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [20.24158281954221, 85.05615234375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [21.309846141087192, 84.96826171874999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [21.309846141087192, 83.78173828125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.350075806124867, 84.52880859375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [24.026396666017327, 84.638671875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [25.34402602913433, 85.5615234375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.43122806450644, 86.59423828125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [24.666986385216273, 86.66015624999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [23.68477416688374, 85.36376953125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [24.407137917727667, 87.4072265625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.16517336866393, 88.6376953125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [22.998851594142913, 87.6708984375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [23.079731762449878, 90.3515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.902476886279832, 92.10937499999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [22.268764039073968, 93.515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [27.527758206861886, 94.5703125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [19.642587534013032, 95.09765625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [16.804541076383455, 96.50390625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [17.14079039331665, 87.1875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [14.944784875088372, 81.5625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [16.804541076383455, 77.87109375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [11.178401873711785, 78.046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [12.726084296948196, 75.5859375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [15.114552871944115, 77.34374999999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [15.284185114076433, 75.41015624999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [13.923403897723347, 81.5625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [27.059125784374068, 109.6875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [49.32512199104001, 84.375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [50.12057809796008, 99.228515625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [46.558860303117164, 103.53515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [46.13417004624326, 92.8125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [48.28319289548349, 81.82617187499999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [53.067626642387374, 75.146484375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [47.81315451752768, 76.11328125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [41.57436130598913, 73.212890625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [45.27488643704891, 84.19921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [47.57652571374621, 79.89257812499999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [44.902577996288876, 78.31054687499999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [53.592504809039376, 79.189453125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [51.944264879028765, 84.0234375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [55.825973254619015, 87.978515625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [51.39920565355378, 95.361328125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [51.56341232867588, 85.4296875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [50.28933925329178, 84.19921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [49.61070993807422, 90.439453125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [54.97761367069628, 95.00976562499999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [53.225768435790194, 102.216796875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [49.15296965617042, 99.66796875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [52.96187505907603, 95.361328125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [51.890053935216926, 104.765625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [46.13417004624326, 107.666015625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [41.31082388091818, 96.94335937499999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [47.27922900257082, 92.021484375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [47.989921667414194, 82.177734375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [42.8115217450979, 83.583984375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [41.64007838467894, 75.498046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [36.1733569352216, 78.3984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [36.4566360115962, 84.19921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [40.78054143186033, 80.419921875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [42.35854391749705, 88.41796875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [46.73986059969267, 88.41796875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [47.100044694025215, 95.2734375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [43.32517767999296, 93.8671875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [41.64007838467894, 86.8359375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [35.96022296929667, 87.099609375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [34.23451236236987, 79.1015625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [31.952162238024975, 86.484375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [29.152161283318915, 85.166015625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [33.43144133557529, 81.03515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [40.97989806962013, 83.935546875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [38.41055825094609, 91.0546875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [43.644025847699496, 95.09765625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [38.41055825094609, 101.6015625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [46.195042108660154, 106.435546875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [44.213709909702054, 109.423828125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [40.44694705960048, 111.62109375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [38.89103282648846, 105.1171875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [43.197167282501276, 104.58984375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [34.30714385628804, 114.78515624999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [30.29701788337205, 102.39257812499999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [37.43997405227057, 104.4140625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [35.96022296929667, 114.78515624999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [39.57182223734374, 115.75195312499999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [38.41055825094609, 106.787109375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [48.63290858589535, 115.83984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [49.66762782262194, 107.138671875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [53.9560855309879, 108.896484375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [53.74871079689897, 101.6015625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [48.69096039092549, 108.369140625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [52.3755991766591, 111.4453125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [48.28319289548349, 98.96484375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [50.00773901463687, 92.373046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [44.402391829093915, 92.8125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [46.558860303117164, 110.478515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [51.01375465718821, 106.083984375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [51.34433866059924, 124.1015625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [46.01222384063236, 121.55273437499999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [48.516604348867475, 110.21484375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [43.004647127794435, 115.6640625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [42.8115217450979, 105.908203125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [35.88905007936091, 98.7890625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [44.15068115978094, 100.81054687499999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [42.16340342422401, 86.572265625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [38.47939467327645, 94.5703125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [38.13455657705411, 84.111328125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [32.10118973232094, 90.087890625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [30.751277776257812, 84.111328125]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [28.304380682962783, 98.0859375]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [26.03704188651584, 94.74609375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [23.483400654325642, 99.84374999999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [23.160563309048314, 92.10937499999999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [29.38217507514529, 92.900390625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [29.916852233070173, 85.95703125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [36.38591277287651, 93.603515625]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [29.916852233070173, 95.80078125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [36.24427318493909, 104.23828125]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [39.774769485295465, 89.82421875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [38.06539235133249, 98.525390625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [37.09023980307208, 91.0546875]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [35.02999636902566, 103.623046875]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [33.7243396617476, 90.791015625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [29.458731185355344, 98.0859375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [29.99300228455108, 106.25976562499999]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.509904531413927, 106.34765625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [26.194876675795218, 93.515625]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [25.085598897064752, 103.974609375]
    },
    {
      options: { gender: 'F', icon: femaleMarker },
      position: [29.76437737516313, 101.42578124999999]
    },
    {
      options: { gender: 'M', icon: maleMarker },
      position: [19.31114335506464, 98.4375]
    }];

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
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
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
              malePercent = malePercent.toFixed(2);
              let femalePercent = (femaleCount / totalCount) * 100;
              femalePercent = femalePercent.toFixed(2);
              console.log("Male cOUNT", maleCount);
              console.log("feMale cOUNT", femaleCount);
              this.setState({ tooltipPosition: { lat, lng }, malePercent, femalePercent })
              console.log(this.state)
            }}
          />
          <CircleMarker center={{ lat: this.state.tooltipPosition.lat, lng: this.state.tooltipPosition.lng }} radius={50} fillColor={'brown'} fillOpacity={this.state.malePercent / 100} stroke={false}
            onMouseout={(cluster) => {
              console.log('mouseout circle');
              this.setState({ tooltipPosition: { lat: null, lng: null } })
            }}
          >
            <Tooltip ><div style={{ height: 50, width: 300 }}> Male:{this.state.malePercent}% Female:{this.state.femalePercent}%</div></Tooltip>
          </CircleMarker>
        </Map>
        <div className="container">
          {/* <ol>
            <h3>ALL MARKERS</h3>
            {markers.map((marker, index) => {
              return <li key={index} >{marker.options.gender}---- Latitude-->{marker.position[0]}---Longitude-->{marker.position[1]}--Popup Text-->{marker.popup}</li>
            })}
          </ol> */}
          <h3>ViewPort Bounds</h3>
          <b>NorthEast:</b> Latitude-->{this.state.viewport_bounds._northEast.lat}--- Longitude-->{this.state.viewport_bounds._northEast.lng}<br />
          <b>SouthWest:</b> Latitude-->{this.state.viewport_bounds._southWest.lat}--- Longitude-->{this.state.viewport_bounds._southWest.lng}

          <h3>Markers Currently in Viewport </h3>
          <ol>
            {markers.map((marker, index) => {
              if ((this.state.viewport_bounds._southWest.lat <= marker.position[0] && marker.position[0] <= this.state.viewport_bounds._northEast.lat) && (this.state.viewport_bounds._southWest.lng <= marker.position[1] && marker.position[1] <= this.state.viewport_bounds._northEast.lng))
                return <li key={index} >{marker.options.gender}---- Latitude-->{marker.position[0]}---Longitude-->{marker.position[1]}</li>
              else
                return
            })}
          </ol>
        </div>
      </div>
    );
  }
}