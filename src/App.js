import React, { Component } from 'react';
import Sidebar from './components/Sidebar'
import fsAPI from './fsAPI'
import Map from "./components/Map"

import './App.css';

class App extends Component {
  render() {
    return (
      <div>    
      <div id ='title'>
        <h1> Old San Juan Food & Drink Map </h1>
      </div>
      
      <Sidebar/>
      <Map/>

    </div>
    );
  }
}

export default App;
