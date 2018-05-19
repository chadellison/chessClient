import React, { Component } from 'react'
import '../styles/sideBar.css'
import Chat from './Chat'

export default class SideBar extends Component {
  render() {
    return(
      <div className='sideBar col-lg-3 col-md-12'>
        <div className='sideBarBackground'>
          <h3 className='sideBarTitle'>Chess Machine</h3>
          <div className='navButton'>
            <i className='glyphicon glyphicon-knight navIcon'/>
            <span className='navText'>Play</span>
          </div>
          <hr/>
          <div className='navButton'>
            <i className='glyphicon glyphicon-tasks navIcon'/>
            <span>Move Log</span>
          </div>
          <hr/>
          <div className='navButton'>
            <i className='glyphicon glyphicon-signal navIcon'/>
            <span>Analytics</span>
          </div>
          <hr/>
          <div className='navButton'>
            <i className='glyphicon glyphicon-triangle-left navIcon'/>
            <span>Reset</span>
          </div>
          <hr/>
        </div>
        <Chat />
      </div>
    )
  }
}
