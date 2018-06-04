import React, { Component } from 'react'
import '../styles/sideBar.css'
import Chat from './Chat'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Credentials from './Credentials'
import MoveLog from './MoveLog'
import Analytics from './Analytics'
import {handleModalAction} from '../actions/modalActions'
import {resetGameAction, joinGameAction} from '../actions/gameActions'
import {moveLogAction, analyticsAction, fetchChartDataAction} from '../actions/sideBarActions'

class SideBar extends Component {
  componentWillMount() {
    this.props.dispatch(fetchChartDataAction(this.props.game.attributes.notation))
  }

  handleAllGamesButton = () => {
    if(this.props.user.token) {
      this.props.dispatch(push('/games'))
    } else {
      this.props.dispatch(handleModalAction({login: true}))
    }
  }

  handleAnalytics = () => {
    if (!this.props.sideBar.analyticsActive) {
      console.log(this.props.game.attributes.notation, "8*******************************")
      this.props.dispatch(fetchChartDataAction(this.props.game.attributes.notation))
    }
    this.props.dispatch(analyticsAction(!this.props.sideBar.analyticsActive))
  }

  allGamesText() {
    if(this.props.user.token && this.props.game.id) {
      return 'My Games'
    } else {
      return 'Play'
    }
  }

  resetButton() {
    if(!this.props.game.id) {
      return (
        <div className='navButton'
          onClick={() => this.props.dispatch(resetGameAction())}>
          <i className='glyphicon glyphicon-triangle-left navIcon'/>
          <span>Reset</span>
        </div>
      )
    } else {
      return ''
    }
  }

  handleJoinGame = () => {
    this.props.dispatch(joinGameAction(this.props.user.token))
  }

  renderMoveLog() {
    if (this.props.sideBar.moveLogActive) {
      return <MoveLog game={this.props.game}/>
    }
  }

  moveLogText() {
    if (this.props.sideBar.moveLogActive) {
      return 'Hide Move Log'
    } else {
      return 'Move Log'
    }
  }

  renderAnalytics() {
    if (this.props.sideBar.analyticsActive) {
      return <Analytics chartData={this.props.sideBar.chartData} />
    }
  }

  analyticsText() {
    if (this.props.sideBar.analyticsActive) {
      return 'Hide Analytics'
    } else {
      return 'Analytics'
    }
  }

  sideBarContent() {
    if(this.props.routing.location.pathname === '/games') {
      return (
        <div>
          <div className='navButton' onClick={() => this.props.dispatch(handleModalAction({createGame: true}))}>
            <i className='glyphicon glyphicon-plus navIcon'/>
            <span className='navText'>Create Game</span>
          </div>
          <hr/>
          <div className='navButton' onClick={this.handleJoinGame}>
            <i className='glyphicon glyphicon-search navIcon'/>
            <span className='navText'>Find Game</span>
          </div>
          <hr/>
        </div>
      )
    } else {
      return (
        <div>
          <div className='navButton' onClick={() => this.handleAllGamesButton()}>
            <i className='glyphicon glyphicon-knight navIcon'/>
            <span className='navText'>{this.allGamesText()}</span>
          </div>
          <hr/>
          <div className='navButton' onClick={() => this.props.dispatch(moveLogAction(!this.props.sideBar.moveLogActive))}>
            <i className='glyphicon glyphicon-tasks navIcon'/>
            <span>{this.moveLogText()}</span>
          </div>
          {this.renderMoveLog()}
          <hr/>
          <div className='navButton' onClick={this.handleAnalytics}>
            <i className='glyphicon glyphicon-signal navIcon'/>
            <span>{this.analyticsText()}</span>
          </div>
          {this.renderAnalytics()}
          <hr/>
          {this.resetButton()}
        </div>
      )
    }
  }

  render() {
    return(
      <div className='sideBar col-lg-3 col-md-12'>
        <Credentials />
        <div className='sideBarBackground'>
          <h3 className='sideBarTitle'>
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

const mapStateToProps = ({routing, user, game, sideBar}) => {
  return {routing, user, game, sideBar}
}

export default connect(mapStateToProps)(SideBar)
