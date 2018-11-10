import React, { Component } from "react";
import VenuesList from "./VenuesList";

export default class Venues extends Component {
  render() {
    return (
      <ul className="venue-list" tabIndex="0" aria-label="venueslist">
        {this.props.venues &&
          this.props.venues.map((venue, key) => (
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
