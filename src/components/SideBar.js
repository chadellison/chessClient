import React, { Component } from 'react'
import '../styles/sideBar.css'
import Chat from './Chat'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Credentials from './Credentials'
import {loginModalAction} from '../actions/modalActions'
import jsonPieces from '../json/pieces'
import {updateGamePayload} from '../actions/gameActions'

class SideBar extends Component {
  handlePlayButton = () => {
    if(this.props.user.token) {
      this.props.dispatch(push('/games'))
    } else {
      this.props.dispatch(loginModalAction(true))
    }
  }

  handleResetButton = () => {
    let payload = {
      pieces: jsonPieces.map((piece) => piece.data.attributes),
      currentTurn: 'white'
    }
    this.props.dispatch(updateGamePayload(payload))
  }

  sideBarContent() {
    if(this.props.routing.location.pathname === '/games') {
      return (
        <div>
          <div className='navButton' onClick={() => console.log('create game')}>
            <i className='glyphicon glyphicon-plus navIcon'/>
            <span className='navText'>Create Game</span>
          </div>
          <hr/>
          <div className='navButton' onClick={() => console.log('join game')}>
            <i className='glyphicon glyphicon-search navIcon'/>
            <span className='navText'>Find Game</span>
          </div>
          <hr/>
        </div>
      )
    } else {
      return (
        <div>
          <div className='navButton' onClick={() => this.handlePlayButton()}>
            <i className='glyphicon glyphicon-knight navIcon'/>
            <span className='navText'>Play</span>
          </div>
          <hr/>
          <div className='navButton' onClick={() => console.log('move log')}>
            <i className='glyphicon glyphicon-tasks navIcon'/>
            <span>Move Log</span>
          </div>
          <hr/>
          <div className='navButton' onClick={() => console.log('analytics')}>
            <i className='glyphicon glyphicon-signal navIcon'/>
            <span>Analytics</span>
          </div>
          <hr/>
          <div className='navButton'
            onClick={this.handleResetButton}>
            <i className='glyphicon glyphicon-triangle-left navIcon'/>
            <span>Reset</span>
          </div>
        </div>
      )
    }
  }

  render() {
    return(
      <div className='sideBar col-lg-3 col-md-12'>
        <Credentials />
        <div className='sideBarBackground'>
          <h3 className='sideBarTitle' onClick={() => this.props.dispatch(push('/'))}>
            Chess Machine
          </h3>
          <hr/>
          {this.sideBarContent()}
          <hr/>
        </div>
        <Chat />
      </div>
    )
  }
}

const mapStateToProps = ({routing, user}) => {
  return {routing, user}
}

export default connect(mapStateToProps)(SideBar)
