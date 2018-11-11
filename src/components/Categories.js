import React, { Component } from 'react'
import Venues from './Venues'
import restaurant from '../restaurant.png'
import coffee from '../coffee.png'
import cocktail from '../cocktail.png'

export default class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: false,
      coffee: false,
      bar: false,
      markers: []
    };
  }



  filterCategories = () => { //filters restaurants by category
    if (this.state.restaurant) {
      const venues = this.props.venues.filter(venue => venue.categories[0].id === '4bf58dd8d48988d144941735' || venue.categories[0].id === "4bf58dd8d48988d117941735" )
      return venues;
    } else if (this.state.coffee) {
      const venues = this.props.venues.filter(venue => venue.categories[0].id === '4bf58dd8d48988d1e0931735')
      return venues;
    } else if (this.state.bar) {
      const venues = this.props.venues.filter(venue => venue.categories[0].id === '4bf58dd8d48988d11e941735' || venue.categories[0].id === "4bf58dd8d48988d116941735")
      return venues;
    } else {
      return this.props.venues //returns all if a filter is not selected
    }
  }

  //these three function set the state for elements needed to display each category 
  toggleRestaurant = () => { 
    const marker = this.props.markers.filter(marker => marker.venueInfo.categories[0].id === '4bf58dd8d48988d144941735' || marker.venueInfo.categories[0].id === "4bf58dd8d48988d117941735" )
    this.setState({
      restaurant: true,
      coffee: false,
      bar: false, 
      markers: marker
    });
  }

  toggleCoffee= () => {
    const marker = this.props.markers.filter(marker => marker.venueInfo.categories[0].id === '4bf58dd8d48988d1e0931735')
    this.setState({
      restaurant: false,
      coffee: true,
      bar: false,
      markers: marker
    });
  }

  toggleBars= () => {
    const marker = this.props.markers.filter(marker => marker.venueInfo.categories[0].id === '4bf58dd8d48988d11e941735' || marker.venueInfo.categories[0].id === "4bf58dd8d48988d116941735")
    this.setState({
      restaurant: false,
      coffee: false,
      bar: true,
      markers: marker
    });
  }

  //filters the markers based on selected category
  filterMarkers = () => {
    const markers = this.state.markers.map(marker => { 
      const result = this.props.markers.find(m => m.venueInfo.id === marker.venueInfo.id); 
      marker.isVisiblie = true;
      //console.log(result)
    return result;
    });
    //console.log(markers)
    this.props.updateState({ markers }) //updates map markers by updating state of the original markers array
  }

  //needed to reset the markers every time a new category is selected
  resetMarkers = () => {
    const markers = this.props.markerCopy
    this.props.updateState({ markers }) 
  }

  render() {
    return (
      <div id = 'categories-filter'>
        <p id='cat-link' tabIndex='0'> Filter by Category </p> 
        <p id='icons>'>
          <img className='icon' src={restaurant} aria-label='filter restaurant' role='button' tabIndex='0'
            onClick={() => {this.resetMarkers();
              //Needed these three functions to run in a certain order, so I used setTimeout to make sure they did
              // There has to be a better way to do this, but this works
              setTimeout(() => this.toggleRestaurant(), 1);
              setTimeout(() => this.filterMarkers(), 2);
            }
            } 
            alt='restaurant icon'/>
          <img role='button' aria-label='filter coffee shop' tabIndex='0' className='icon' src={coffee} onClick={() =>{ this.resetMarkers(); setTimeout(() =>  this.toggleCoffee(), 1); setTimeout(() => this.filterMarkers(), 2) }} alt='coffee icon'/> 
          <img role='button' aria-label='filter bars' tabIndex='0' className='icon' src={cocktail} onClick={ ()=> {  this.resetMarkers(); setTimeout(() => this.toggleBars(), 1); setTimeout(() => this.filterMarkers(), 2)}} alt='bars icon'/>
        </p>
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
