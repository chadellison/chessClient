import React, { Component } from 'react'
import '../styles/sideBar.css'
import Chat from './Chat'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Credentials from './Credentials'

class SideBar extends Component {
  render() {
    return(
      <div className='sideBar col-lg-3 col-md-12'>
        <Credentials />
        <div className='sideBarBackground'>
          <h3 className='sideBarTitle' onClick={() => this.props.dispatch(push('/'))}>
            Chess Machine
          </h3>
          <hr/>
          <div className='navButton' onClick={() => this.props.dispatch(push('/games'))}>
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

const mapStateToProps = ({}) => {
  return {}
}

export default connect(mapStateToProps)(SideBar)
