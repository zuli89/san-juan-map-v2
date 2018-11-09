/*global google*/
import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 18.46608, lng: -66.115531 }}
      options={{
        scrollwheel: true,
        styles: [
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on"
              },
              {
                color: "#e0efef"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on"
              },
              {
                hue: "#1900ff"
              },
              {
                color: "#c0e8e8"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                lightness: 100
              },
              {
                visibility: "simplified"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
              {
                visibility: "on"
              },
              {
                lightness: 700
              }
            ]
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [
              {
                color: "#7dcdcd"
              }
            ]
          }
        ]
      }}
    >
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, idx) => {
            const venueInfo = props.venues.find(
              venue => venue.id === marker.id
            );
            return (
              <Marker
                key={idx}
                position={{ lat: marker.lat, lng: marker.lng }}
                animation={marker.isOpen ? google.maps.Animation.BOUNCE : null}
                onClick={() => props.markerClick(marker)}
              >
                {marker.isOpen && venueInfo.bestPhoto && (
                  <InfoWindow>
                    <div id="info">
                      <p id="venue-name" tabIndex="1">
                        {" "}
                        {venueInfo.name}{" "}
                      </p>
                      <p id="venue-rating" tabIndex="1">
                        {" "}
                        <span className="item-desc"> Rating: </span>
                        {`${venueInfo.rating}/10`}
                      </p>
                      <p id="venue-price" tabIndex="1">
                        <span className="item-desc"> Price: </span>{" "}
                        {venueInfo.price.message}
                      </p>
                      <img
                        id="venue-img"
                        tabIndex="1"
                        src={`${venueInfo.bestPhoto.prefix}200x200${
                          venueInfo.bestPhoto.suffix
                        }`}
                        alt={`${venueInfo.name}`}
                      />
                      <p id="venue-address" tabIndex="1">
                        {venueInfo.location.address}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  render() {
    return (
      <div id="map-loader">
        <MyMapComponent
          {...this.props}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBLnDm2Kz95aYZj7970Lgo1shaeXodi-y4"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div style={{ height: `100%`, width: `100%`, marginLeft: `0%` }} />
          }
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
