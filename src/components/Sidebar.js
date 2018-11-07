import React, { Component } from 'react'
import Venues from './Venues'


export class Sidebar extends Component {

  constructor(){
    super();
    this.state = {
      query: '',
      venues: []
    };
  }

  inputChange = e => { //filters search bar input
    this.setState({query: e.target.value}); 
    //filter venues when typing and match it to correspondig marker
    const markers = this.props.venues.map(venue => { 
      const matched = venue.name.toLowerCase().includes(e.target.value.toLowerCase());  //looks for match between venue name and typed input
    const marker = this.props.markers.find(marker => marker.id === venue.id); //matches the marker corresponding to the venue
      if (matched) { //if the venue name matches the input, marker is set to visible and it will render on map
        marker.isVisible = true; 
      } else {
        marker.isVisible = false; //if no match is found, marker is set to not visible and it will not render
      } 
      return marker;
    });
    this.props.updateState({ markers });
  };

  filterSidebar = () => { //filters the venue list on sidebar based on search bar input
    if (this.state.query.trim() !== "") { //will run if there is something typed
      const venues = this.props.venues.filter(venue =>  // filters venues based on what is typed on search input
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return venues; //the filter results are returned
    }
    return this.props.venues; //else all venues are returned
  };

    
  /*filterCategories = () => {
    const restaurants =  this.state.venues.find(venue => 
      venue.id.categories=== "4bf58dd8d48988d144941735");
      console.log(restaurants);
    }*/
  


  render() {
    return (
      <div id = 'sidebar'>
        <span id='sidebar-title' > Restaurants and Bars </span>
        <p><input type="search" id="search-bar"  aria-label="search text"  placeholder="Filter Venues..."  onChange={this.inputChange}></input></p>
        <Venues {...this.props}  handleListClick={this.props.handleListClick} venues={this.filterSidebar()} tabIndex="0" />
        
      </div>
    )
  }
}

export default Sidebar;