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



  filterCategories = () => { //filters restaurants by category depending on state
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
      return this.props.venues
    }
  }

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
    this.props.updateState({ markers }); //updates markers arrays after filtering so markers don't show up if it's not at a location being searched for
  };*/

  filterMarkers = () => {
    const markers = this.state.markers.map(marker => {
      const result = this.props.markers.find(m => m.venueInfo.id === marker.venueInfo.id); 
      marker.isVisiblie = true;
      //console.log(result)
    return result;
    });
    //console.log(markers)
    this.props.updateState({ markers })
  }

  resetMarkers = () => {
    const markers = this.props.markerCopy.map(marker => {marker.isVisible = true;
      console.log(markers)
    return markers
    });
    //this.props.updateState({ markers })
  }

    

  render() {
    return (
      <div id = 'categories-filter'>
        <p id='cat-link' onClick={this.resetMarkers}> Filter by Category </p> 
        <img className='icon' src={restaurant} 
          onClick={() => {this.toggleRestaurant(); 
          setTimeout(() => this.filterMarkers(), 300);
          }
        } 
          alt='restaurant icon'/>
        <img className='icon' src={coffee} onClick={() =>{ this.toggleCoffee(); setTimeout(() => this.filterMarkers(), 300) }} alt='coffee icon'/> 
        <img className='icon' src={cocktail} onClick={ ()=> {this.toggleBars(); setTimeout(() => this.filterMarkers(), 300)}} alt='bars icon'/>

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
