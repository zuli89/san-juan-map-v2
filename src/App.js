import React, { Component } from 'react';
import Sidebar from './components/Sidebar'
import SquareAPI from './fsAPI'
import Map from "./components/Map"
import './App.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [], 
      markers: [],
      updateState: obj => { //used to set the state from the sidebar when filtering
        this.setState(obj);
      }
    };
  }

  markerClick = marker => { //manages the response when a  marker is clicked 
    this.closeOpenWindow(); //will close any windows that are already open
    marker.isOpen = true; //when clicked, sets marker to isOpen
    this.setState({markers: Object.assign(this.state.markers, marker) }); 
    const venue = this.state.venues.find(venue => venue.id === marker.id); //matches the selected marker with the venue information
    SquareAPI.getVenue(marker.id) //call for venue information
      .then(res => {
        const newVenue = Object.assign(venue, res.response.venue); //creates new object based on response
        this.setState({ venues: Object.assign(this.state.venues, newVenue)}); // updates the state of 'venues' based on response
      }).catch(error => {  //error handler
        console.log(error);
        alert('Error loading venue data');
      })
  };

  //closes window when another marker is clicked
  closeOpenWindow = () => { 
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers) });
  }
  //handles clicks on sidebar list
  handleListClick = venue => {  
    const marker = this.state.markers.find(marker => //matches the marker with venue on list
      marker.id === venue.id);
    this.markerClick(marker); // opens infowindow
  }

  componentDidMount = () => {
    SquareAPI.search({ //calls search method for foursqaure API
      ll:'18.466080,-66.115531', //lat long center for search
      radius : '450',  // search radius around center
      //I selected a number of category IDs to have more control on what was requested
      categoryId : '4bf58dd8d48988d144941735,4bf58dd8d48988d1be941735,4bf58dd8d48988d116941735,4bf58dd8d48988d11e941735,4bf58dd8d48988d16d941735',
      limit: 2 //number of results
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
    })
    .catch(error => { 
      console.log(error);
      alert('Error loading page');
    });
  
  }
  

  render() {
    return (
      <div>    
      <div id ='title'>
        <h1> Old San Juan Food & Drink Map </h1>
      </div>
      
      <Sidebar {...this.state} handleListClick={this.handleListClick} tabIndex="0"/>

      <Map {...this.state} markerClick={this.markerClick} role="application"/>

    </div>
    );
  }
}

export default App;
