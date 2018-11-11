import React, { Component } from "react";
import Venues from "./Venues";
import { push as Menu } from "react-burger-menu";
import Categories from './Categories'


export class Sidebar extends Component {
  constructor() {
    super();
    this.closeHandler = this.closeHandler.bind(this)
    this.state = {
      query: "",
      menuOpen: true,
      categories: false,
      textFilter: true
    };
  }

  closeHandler() {  //helps close menu when list item clicked
    this.setState({
      menuOpen: false
    })
  }

  handleStateChange (state) { //handles state change of sidebar (https://github.com/negomi/react-burger-menu/wiki/FAQ#i-want-to-control-the-open-state-programmatically-but-i-dont-understand-how-to-use-the-isopen-prop)
    this.setState({menuOpen: state.isOpen})  
  }

  inputChange = e => {
    //filters search bar input
    this.setState({ query: e.target.value });
    //filter venues when typing and matches it to correspondig marker
    const markers = this.props.venues.map(venue => {
      const findMatch = venue.name.toLowerCase().includes(e.target.value.toLowerCase()); //looks for match between venue name and typed input
      const marker = this.props.markers.find(marker => marker.venueInfo.id === venue.id); //matches the marker corresponding to the venue
      findMatch ? marker.isVisible = true :  marker.isVisible = false;
      return marker;
    });
    console.log(markers)
    this.props.updateState({ markers }); //updates markers arrays after filtering so markers don't show up if it's not at a location being searched for
  };

  filterSidebar = () => {
    //filters the venue list on sidebar based on search bar input
    if (this.state.query.trim() !== "") {//ensures only runs filter function if something is tyes
      //will run if there is something typed
      const venues = this.props.venues.filter(// filters venues based on what is typed on search input
        venue => venue.name.toLowerCase().includes(this.state.query.toLowerCase()));
      return venues; //the filter results are returned
    } else {
      return this.props.venues; //else all venues are returned
    } 
  };

  handleSidebars = () => { //used to switch between filtering options
    if (this.state.textFilter) {
      this.setState ({textFilter: false, categories: true}) 
    } else {
      this.setState ({textFilter: true, categories: false})
    }
  }

  render() {
    return (
      <Menu className='sidebar' noOverlay isOpen={this.state.menuOpen} 
      onStateChange={(state) => this.handleStateChange(state)}>
      <button id='filter' onClick= {this.handleSidebars}>Change Filter Method</button>

      {this.state.textFilter && ( //Filters by input search only when textFilter is true
      <div id='text-filter'>
        <span id="sidebar-title"> Filter by Name </span>
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
      </div>)}

      {this.state.categories && ( //filters by category
        <Categories {...this.props} closeHandler = {this.closeHandler} handleListClick={this.props.handleListClick} />

      )}
      </Menu>
      
    );
  }
}
export default Sidebar;
