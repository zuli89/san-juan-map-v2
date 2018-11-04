import React, { Component } from 'react'

export default class VenuesList extends Component {
  render() {
    return (
      <li className='venue-list-item'>
        {this.props.name}
       </li>
    )
  }
}
