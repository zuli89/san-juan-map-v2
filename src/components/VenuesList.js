import React, { Component } from 'react'

export default class VenuesList extends Component {
  render() {
    return (
      <li className='venue-list-item' onClick={()=>this.props.handleListClick(this.props)}>
        {this.props.name}
       </li>
    )
  }
}
