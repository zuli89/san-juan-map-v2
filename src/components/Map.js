import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 18.466080, lng: -66.115531 }}
    options={{ scrollwheel: true}}
  >
    {props.isMarkerShown && <Marker position={{ lat: 18.466080, lng: -66.115531 }} />}
  </GoogleMap>
))




export default class Map extends Component {
  render() {
    return (
      
      <div id='map-loader'><MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBLnDm2Kz95aYZj7970Lgo1shaeXodi-y4"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%`}} />}
        mapElement={<div style={{ height: `100%` }} />
      }
        />
      </div>
    )
  }
}
