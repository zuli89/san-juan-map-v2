import React, { Component } from 'react';
import Sidebar from './components/Sidebar'
import fsAPI from './fsAPI'
import Map from "./components/Map"
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: []
    };
  }

  markerClick = marker => { //manages clicks on markers
    this.closeOpenWindow();
    marker.isOpen = true; //when clicked, sets marker to isOpen
    this.setState({markers: Object.assign(this.state.markers, marker) }); 
    const venue = this.state.venues.find(venue => venue.id === marker.id); //matches the selected marker with the venue information
    fsAPI.getVenue(marker.id) //call for venue information
      .then(res => {
        const newVenue = Object.assign(venue, res.response.venue);
        this.setState({ venues: Object.assign(this.state.venues, newVenue)});
        console.log(newVenue)
      })
  };

  closeOpenWindow = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers) });
  }



  componentDidMount = () => {
    fsAPI.search({ //calls search method for foursqaure API
      ll:'18.466080,-66.115531',
      radius : '450',
      categoryId : '4bf58dd8d48988d144941735,4bf58dd8d48988d1be941735,4bf58dd8d48988d116941735,4bf58dd8d48988d11e941735,4bf58dd8d48988d16d941735',
      limit: 40
    })
    .then(results => {
      const {venues} = results.response;
      const markers = venues.map(venue=> {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          id: venue.id,
          isOpen: false,
          isVisible: true
        }
      });
    this.setState({venues, markers});
    });
  }
  

  render() {
    return (
      <div>    
      <div id ='title'>
        <h1> Old San Juan Food & Drink Map </h1>
      </div>
      
      <Sidebar/>
      <Map {...this.state} markerClick={this.markerClick}/>

    </div>
    );
  }
}

export default App;
