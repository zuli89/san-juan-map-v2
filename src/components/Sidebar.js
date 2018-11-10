import React, { Component } from "react";
import Venues from "./Venues";
import { push as Menu } from "react-burger-menu";

export class Sidebar extends Component {
  constructor() {
    super();
    this.closeHandler = this.closeHandler.bind(this)
    this.state = {
      query: "",
      venues: [],
      menuOpen: true
    };
  }

  closeHandler() {  //helpr close menu when list item clicked
    this.setState({
      menuOpen: false
    })
  }

  inputChange = e => {
    //filters search bar input
    this.setState({ query: e.target.value });
    //filter venues when typing and match it to correspondig marker
    const markers = this.props.venues.map(venue => {
      const matched = venue.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase()); //looks for match between venue name and typed input
      const marker = this.props.markers.find(marker => marker.id === venue.id); //matches the marker corresponding to the venue
      if (matched) {
        //if the venue name matches the input, marker is set to visible and it will render on map
        marker.isVisible = true;
      } else {
        marker.isVisible = false; //if no match is found, marker is set to not visible and it will not render
      }
      return marker;
    });
    this.props.updateState({ markers });
  };

  filterSidebar = () => {
    //filters the venue list on sidebar based on search bar input
    if (this.state.query.trim() !== "") {
      //will run if there is something typed
      const venues = this.props.venues.filter((
        venue // filters venues based on what is typed on search input
      ) => venue.name.toLowerCase().includes(this.state.query.toLowerCase()));
      return venues; //the filter results are returned
    }
    return this.props.venues; //else all venues are returned
  };

  /*filterCategories = () => {
    const restaurants =  this.state.venues.find(venue => 
      venue.id.categories=== "4bf58dd8d48988d144941735");
      console.log(restaurants);
    }*/
    handleStateChange (state) {
      this.setState({menuOpen: state.isOpen})  
    }


  render() {


    return (
      
      <Menu className='sidebar' noOverlay isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
        <span id="sidebar-title"> Old San Juan Restaurants and Bars </span>
        <p>
          <input
            type="search"
            id="search-bar"
            aria-label="search text"
            placeholder="Filter Venues..."
            onChange={this.inputChange}
          />
        </p>
        <Venues
          {...this.props}
          closeHandler = {this.closeHandler}
          handleListClick={this.props.handleListClick}
          venues={this.filterSidebar()}
          tabIndex="0"
        />
      </Menu>
      
    );
  }
}

export default Sidebar;
