import React, { Component } from 'react'

export default class Search extends Component {

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
      <div>
        <p><input type="search" placeholder="Search.." id="search-bar" onChange={this.inputChange}></input></p>
      </div>
    )
  }
}

