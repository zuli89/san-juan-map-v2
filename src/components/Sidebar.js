import React, { Component } from 'react'
import Search from './Search'


export class Sidebar extends Component {

  

  render() {
    return (
      <div id = 'sidebar' {...this.props}>
        <span id='sidebar-title'>Points of Interest</span>
        
        <Search/>
        <ul>
          

        </ul>
        
      </div>
    )
  }
}

export default Sidebar;