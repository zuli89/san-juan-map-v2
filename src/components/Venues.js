import React, { Component } from "react";
import VenuesList from "./VenuesList";

export default class Venues extends Component {

  /*filterMarkers = () => {
    const markers = this.props.markers.map(marker => {
      const venue = this.props.markers.find((venue) => marker.venueInfo.id === venue.id)
    });
    return console.log(markers);
  }*/


    /*const markers= this.props.markers.filter((marker) => marker.venueInfo.id === this.props.venues.id); //matches the marker corresponding to the venue
       console.log(markers)
    
    //this.props.updateState({ markers }); //updates arkers arrays after filtering so markers don't show up if it's not at a location being searched for
  };
  
  .filter(marker => marker.isVisible) //shows only markers that are set to visible
          .map((marker, key) => {
            const venueData = props.venues.find(
              venue => venue.id === marker.venueInfo.id //matches markers with venue list
            );*/

  render() {
    return (
      
      <ul className="venue-list" tabIndex="0" aria-label="venueslist" >
      <p onClick={this.filterMarkers}> </p>
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
