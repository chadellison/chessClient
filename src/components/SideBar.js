import React, { Component } from 'react'
import '../styles/sideBar.css'
import Chat from './Chat'

export default class SideBar extends Component {
  render() {
    return(
      <div className='col-lg-3 sideBar'>
        <Chat />
      </div>
    )
  }
}
