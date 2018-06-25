import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Circle, Polygon, Rectangle, FeatureGroup, LayerGroup, } from 'react-leaflet'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'

import L from 'leaflet'

    const center = [51.505, -0.09]
    const outer = [[50.505, -29.09], [52.505, 29.09]]
    const inner = [[49.505, -2.09], [53.505, 2.09]]
    const polygon = [[51.505, -0.09], [51.51, -0.1], [51.51, -0.12]]
    const rectangle = [[51.49, -0.08], [51.5, -0.06]]
    const DEFAULT_VIEWPORT = {
      center: [51.505, -0.09],
      zoom: 13,
    }   

export default class SimpleExample extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
    bounds: "outer",
    viewport: DEFAULT_VIEWPORT,
    query: ""
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
        if(json.geonames[0].fcl === 'A')
            zoom = 4
        else
            zoom = 10
        let viewport = {
            center: center,
            zoom: zoom
        }
        console.log(viewport)
        this.setState({viewport})
        // console.log('artist', artist);
        // this.setState({artist, stats: artist.stats, bio: artist.bio, images: artist.image});
    });
  }



  render() {
    const position = [this.state.lat, this.state.lng]

    onClickInner = () => {
        this.setState({ bounds: inner })
    }

      onClickOuter = () => {
        this.setState({ bounds: outer })
    }

      onClickReset = () => {
        this.setState({ viewport: DEFAULT_VIEWPORT })
      }

      onViewportChanged = viewport => {
        console.log(viewport)
        this.setState({ viewport })
      }



      // geocodeAddress() {
        // let geocoder = new google.maps.Geocoder();
        // let address = 'India'
        // (new google.maps.Geocoder()).geocode({'address': 'India'}, function(results, status) {
        //   if (status === 'OK') {
        //     // resultsMap.setCenter(results[0].geometry.location);
        //     // var marker = new google.maps.Marker({
        //     //   map: resultsMap,
        //     //   position: results[0].geometry.location
        //     // });
        //     console.log(results[0].geometry.location)
        //   } else {
        //     alert('Geocode was not successful for the following reason: ' + status);
        //   }
        // });
      // }

    // componentDidMount() {
    //     var geoJSON = {
    //       "type": "FeatureCollection",
    //       "features": [
    //         {
    //           "type": "Feature",
    //           "properties": {},
    //           "geometry": {
    //             "type": "Point",
    //             "coordinates": [
    //               -0.1263427734375,
    //               51.49891200625809
    //             ]
    //           }
    //         },
    //         {
    //           "type": "Feature",
    //           "properties": {},
    //           "geometry": {
    //             "type": "Point",
    //             "coordinates": [
    //               -0.07553100585937499,
    //               51.5177162373547
    //             ]
    //           }
    //         },
    //         {
    //           "type": "Feature",
    //           "properties": {},
    //           "geometry": {
    //             "type": "Point",
    //             "coordinates": [
    //               -0.015106201171874998,
    //               51.572802100290254
    //             ]
    //           }
    //         }
    //       ]
    //     }
    //     var addedGeoJSON = L.geoJSON(geoJSON).addTo(map)
    //     map.fitBounds(addedGeoJSON.getBounds(), {
    //         padding: [20, 20]
    //     })
    // }

    return (
    <div>
      <FormGroup>
            <InputGroup>
                <FormControl
                    type = "text"
                    placeholder = "Search for an place"
                    value = {this.state.query}
                    onChange = {event => {this.setState({query: event.target.value})}}
                    onKeyPress = { event => {
                        if(event.key === 'Enter'){
                            this.getCoordinates();
                        }
                    }}
                />
                <InputGroup.Addon className =  "searchButton" onClick = {() => this.getCoordinates()}>
                    <Glyphicon glyph = "search"></Glyphicon>
                </InputGroup.Addon>
            </InputGroup>
        </FormGroup>
      <Map className = "mapid"
        onClick={() => {
            this.setState({ viewport: DEFAULT_VIEWPORT })
            }
        }
        onViewportChanged={viewport => {
            console.log(viewport)
            this.setState({ viewport })
          }
        }
        viewport={this.state.viewport}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={center} fillColor="blue" radius={200} />
        <Polygon color="purple" positions={polygon} />
        <Marker position={position}>
          <Popup>
            <img height="100" width="100" src = "https://cdn.londonandpartners.com/-/media/images/london/visit/london-organisations/tower-bridge-exhibition/tower-bridge-homepage-image.jpg?mw=1920&hash=E19E0136A57855A8ED61B4E66EA72F1646CA8DAC" />
          </Popup>
        </Marker>

        <Rectangle
          bounds={outer}
          color={this.state.bounds === 'outer' ? 'red' : 'blue'}
          onClick={this.onClickOuter}
        />
        <Rectangle
          bounds={inner}
          color={this.state.bounds === 'inner' ? 'red' : 'blue'}
          onClick={this.onClickInner}
        />





      </Map>
    </div>
    )
  }
}