import React, { Component } from 'react'
import VenuesList from './VenuesList'


export class Sidebar extends Component {

  constructor(){
    super();
    this.state = {
      query: ''
    };
  }

  inputChange = e => {
    this.setState({query: e.target.value}); 
    //filter venues when typing and match it to correspondig marker
    const markers = this.props.venues.map(venue => { 
      const matched = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
    const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (matched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      } 
      return marker;
    });
    this.props.updateState({ markers });
  }

  

  render() {
    return (
      <div id = 'sidebar'>
        <span id='sidebar-title'>Points of Interest</span>
        
        <p><input type="search" placeholder="Search.." id="search-bar" onChange={this.inputChange}></input></p>


        <ul className='venue-list'>
          {this.props.venues && this.props.venues.map((venue,key)=>
            <VenuesList key={key} {...venue} {...this.props} handleListClick={this.props.handleListClick}/>
          )}
        </ul>
        
      </div>
    )
  }
}

export default Sidebar;