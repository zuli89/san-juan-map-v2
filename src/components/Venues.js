import React, { Component } from "react";
import VenuesListItem from "./VenuesListItem";

export default class Venues extends Component {
  render() {
    return (
      <ul className="venue-list" tabIndex="0" aria-label="venueslist">
        {this.props.venues &&
          this.props.venues.map((venue, key) => (
            <VenuesListItem 
              closeHandler = {this.closeHandler}
              key={key}
              {...venue}
              {...this.props}
              handleListClick={this.props.handleListClick}
            />
          ))}
      </ul>
    );
  }
}
