import React, { Component } from 'react'
import '../styles/home.css'
import Board from './Board'
import SideBar from './SideBar'

export default class Home extends Component {
  render() {
    return(
      <div className='container'>
        <div className='row'>
          <Board />
          <SideBar />
        </div>
      </div>
    )
  }
}
