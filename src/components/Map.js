/*global google*/
import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 18.466080, lng: -66.115531 }}
    options={{ 
      scrollwheel: true,
    }}
  >
  
    {props.markers && props.markers
      .filter(marker => marker.isVisible)
      .map((marker, idx) => {
          const venueInfo = props.venues.find(venue => venue.id === marker.id);
        return <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng }} 
        animation={marker.isOpen  ? google.maps.Animation.BOUNCE : null}
        onClick={() => props.markerClick(marker)}>
          {marker.isOpen && venueInfo.bestPhoto && (<InfoWindow>
            <div id='info'>
              <p id = "venue-name" tabIndex='1'> {venueInfo.name} </p>
              <p id = "venue-rating" tabIndex='1'> <span className='item-desc'> Rating: </span>{`${venueInfo.rating}/10`}</p>
              <p id = "venue-price" tabIndex='1'><span className='item-desc'> Price: </span> {venueInfo.price.message}</p>
              <img id= "venue-img" tabIndex='1' src = {`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt ={`photo of ${venueInfo.name}`}/>
              <p id = "venue-address" tabIndex='1'>{venueInfo.location.address}</p>
            </div>
          </InfoWindow>
          )}
        </Marker>
    })}
  </GoogleMap>
))




export default class Map extends Component {
  render() {
    return (
      
      <div id='map-loader'>
        <MyMapComponent
          {...this.props}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBLnDm2Kz95aYZj7970Lgo1shaeXodi-y4"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, width: `80%`, marginLeft: `20%`}} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}
