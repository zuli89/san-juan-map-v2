import React, { Component } from "react";
import VenuesList from "./VenuesList";

export default class Venues extends Component {

 /*filterMarkers = () => {
    const markers =this.props.venues.map(venue => {
      const marker = this.props.markers.find(marker => marker.venueInfo.id === venue.id);
      marker.isVisible = true;
      console.log(marker)
      return marker
    });
    this.props.updateState({ markers })
  };*/
            

  render() {
    return (
      
      <ul className="venue-list" tabIndex="0" aria-label="venueslist" >
        <p onClick={this.filterMarkers}> test </p>
          {this.props.venues.map((venue, key) => (
            <VenuesList
              key={key}
              {...venue}
              {...this.props}
              closeHandler = {this.closeHandler}
              handleListClick={this.props.handleListClick}
            />
          ))}
      </ul>
    );
  }
}
