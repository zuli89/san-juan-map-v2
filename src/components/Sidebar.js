import React, { Component } from 'react'
import Search from './Search'
import VenuesList from './VenuesList'


export class Sidebar extends Component {

  

  render() {
    return (
      <div id = 'sidebar'>
        <span id='sidebar-title'>Points of Interest</span>
        
        <Search/>
        <ul className='venue-list'>
          {this.props.venues && this.props.venues.map((venue,key)=>
            <VenuesList key={key} {...venue} {...this.props} />
          )}
        </ul>
        
      </div>
    )
  }
}

export default Sidebar;