import React, { Component } from "react";
import Sidebar from "./components/SidebarMenu";
import {searchVenues, getVenueInfo} from "./fsAPI";
import Map from "./components/Map";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      updateState: marker => {
        //used to set the state from the sidebar when filtering
        this.setState(marker);
      }
    };
  }

  markerClick = marker => {
    //manages the response when a  marker is clicked
    this.closeOpenWindow(); //will close any windows that are already open
    marker.isOpen = true; //when clicked, sets marker to isOpen
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id); //matches the selected marker with the venue information
    getVenueInfo(marker.id).then(resp => {
        const updateVenue = Object.assign(venue, resp.response.venue); //creates new object based on response
        // updates the state of 'venues' with details ontained through venue API request:
        this.setState({ venues: Object.assign(this.state.venues, updateVenue) });
      })
      .catch(error => {
        //error handler
        console.log(error);
        alert("Error loading venue data");
      });
  };

  //closes window when another marker is clicked
  closeOpenWindow = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  //handles clicks on sidebar list
  handleListClick = venue => {
    const marker = this.state.markers.find(
      (marker) => marker.id === venue.id //matches the marker with venue on list
    );
    this.markerClick(marker); // opens infowindow
  };

  componentDidMount = () => {
    searchVenues().then(results => {
        const { venues } = results.response; //master list of venues
        //creates a copy of the results that will be used for rendering markers
        const markers = venues.map(venue => {  
          //I tired maping over venues and adding an isVisible and isOpen elements instead of this, but for some reason it always maxed out my request limit
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            id: venue.id,
            isVisible: true,
            isOpen: false
          };
        });
        this.setState({ venues, markers });
      })
      .catch(error => {
        console.log(error);
        alert("Error loading venue information");
      });
  };

  render() {
    return (
      <div id="App">
        <Sidebar
          pageWrapId={"page-wrap"} 
          outerContainerId={"App"}
          {...this.state}
          handleListClick={this.handleListClick}
          tabIndex="0"
        />
        <section id="page-wrap">
          <div id="title">
            <h1> Old San Juan Food & Drink Map </h1>
          </div>

          <Map
            {...this.state}
            markerClick={this.markerClick}
            role="application"
          />
        </section>
      </div>
    );
  }
}

export default App;
