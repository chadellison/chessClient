import React, { Component } from 'react'
import '../styles/sideBar.css'
import Chat from './Chat'

export default class SideBar extends Component {
  render() {
    return(
      <div className='sideBar col-lg-3 col-md-12'>
        <Chat />
      </div>
    )
  }
}
