import React, { Component } from 'react'
import Sidebar from './Sidebar'
import { slide as Menu } from 'react-burger-menu'

export default class HamburgerMenu extends Component {
  render() {
    return (
      <div>          
        
        <Sidebar {...this.props} handleListClick={this.handleListClick} tabIndex="0"/>
        
        
        
      </div>
    )
  }
}
