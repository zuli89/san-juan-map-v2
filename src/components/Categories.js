import React, { Component } from 'react'
import Venues from './Venues'
import restaurant from '../restaurant.png'
import coffee from '../coffee.png'
import cocktail from '../cocktail.png'

export default class Categories extends Component {

  constructor() {
    super();
    this.state = {
      restaurant: true,
      coffee: false,
      bar: false,
    };
  }


  filterCategories = () => { //filters restaurants by category depending on state
    if (this.state.restaurant) {
      const venues = this.props.venues.filter(venue => venue.categories[0].id === '4bf58dd8d48988d144941735' || venue.categories[0].id === "4bf58dd8d48988d117941735" )
      return venues;
    } else if (this.state.coffee) {
      const venues = this.props.venues.filter(venue => venue.categories[0].id === '4bf58dd8d48988d1e0931735')
      return venues;
    } else {
      const venues = this.props.venues.filter(venue => venue.categories[0].id === '4bf58dd8d48988d11e941735' || venue.categories[0].id === "4bf58dd8d48988d116941735")
      return venues;
    }
    
  }

  toggleRestaurant = () => {
    this.setState({
      restaurant: true,
      coffee: false,
      bar: false
    }) ;
  }

  toggleCoffee= () => {
    this.setState({
      restaurant: false,
      coffee: true,
      bar: false
    }) ;
  }

  toggleBars= () => {
    this.setState({
      restaurant: false,
      coffee: false,
      bar: true
    }) ;
  }

    //handles clicks on sidebar list
    handleListClick = venue => {
      const marker = this.state.markers.find(
        (marker) => marker.venueInfo.id === venue.id //matches the marker with venue on list
      );
      this.markerClick(marker); // opens infowindow
    };

  /*inputChange = e => {
    //filters search bar input
    this.setState({ query: e.target.value });
    //filter venues when typing and matches it to correspondig marker
    const markers = this.props.venues.map(venue => {
      const findMatch = venue.name.toLowerCase().includes(e.target.value.toLowerCase()); //looks for match between venue name and typed input
      const marker = this.props.markers.find(marker => marker.venueInfo.id === venue.id); //matches the marker corresponding to the venue
      findMatch ? marker.isVisible = true :  marker.isVisible = false;
      return marker;
    });
    this.props.updateState({ markers }); //updates arkers arrays after filtering so markers don't show up if it's not at a location being searched for
  };*/




  render() {
    return (
      <div id = 'categories-filter'>
        <p id='cat-link'>Filter by Category</p> 
        <img className='rest-icon' src={restaurant} onClick={this.toggleRestaurant}/>
        <img className='rest-icon' src={coffee} onClick={this.toggleCoffee}/> 
        <img className='rest-icon' src={cocktail} onClick={this.toggleBars}/> 

        <Venues
          {...this.props}
          closeHandler = {this.props.closeHandler}
          handleListClick={this.props.handleListClick}
          venues={this.filterCategories()}
          tabIndex="0"
        />
        
      </div>
    )
  }
}
