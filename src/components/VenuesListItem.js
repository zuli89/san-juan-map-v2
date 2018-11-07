import React, { Component } from "react";

export default class VenuesList extends Component {
  handleClick() {
    //gaClickEvent('home-where-to-buy', 'submit', undefined);
    this.props.handleListClick(this.props);
    this.props.closeMenu();
  }

  render() {
    return (
      <li
        tabIndex="0"
        className="venue-list-item"
        onClick={e => this.handleClick(e)}
      >
        {this.props.name}
      </li>
    );
  }
}
