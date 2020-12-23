import React, { Component } from 'react'
import '../styles/sideBar.css'
import Chat from './Chat'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Credentials from './Credentials'
import Analytics from './Analytics'
import { resetBoardAction } from '../actions/boardActions'
import { updateSelectedMoveAction } from '../actions/moveLogActions'
import { handleModalAction } from '../actions/modalActions'
import { resetGameAction, joinGameAction } from '../actions/gameActions'
import { analyticsAction, fetchAnalyticsDataAction } from '../actions/analyticsActions'

class SideBar extends Component {
  componentDidMount() {
    this.props.fetchAnalyticsDataAction(this.props.game.notation)
  }

  handleAllGamesButton = () => {
    if (this.props.user.token) {
      this.props.dispatch(push('/games'))
    } else {
      this.props.handleModalAction({login: true})
    }
  }

  movesWithCount = () => {
    return this.props.game.attributes.moves.map((move, index) => {
      return { value: move, move_count: index + 1 }
    })
  }

  handleAnalytics = () => {
    if (!this.props.analytics.active) {
      fetchAnalyticsDataAction(this.props.game.notation)
    }
    this.props.analyticsAction(!this.props.analytics.active)
  }

  allGamesText() {
    if(this.props.user.token && this.props.game.id) {
      return 'My Games'
    } else {
      return 'Play'
    }
  }

  resetGame = () => {
    this.props.resetGameAction();
    this.props.resetBoardAction();
    this.props.updateSelectedMoveAction(0);
  }

  resetButton() {
    return (
      <div className='navButton'
        onClick={this.resetGame}
        hidden={this.props.game.id !== 'default'}>
        <i className='glyphicon glyphicon-triangle-left navIcon'/>
        <span>Reset</span>
      </div>
    )
  }

  analyticsButton = () => {
    return (
      <div className='navButton' onClick={this.handleAnalytics}>
        <i className='glyphicon glyphicon-signal navIcon'/>
        <span>{this.analyticsText()}</span>
      </div>
    )
  }

  handleJoinGame = () => {
    this.props.joinGameAction(this.props.user.token)
  }

  analyticsText() {
    if (this.props.analytics.active) {
      return 'Hide Analytics'
    } else {
      return 'Analytics'
    }
  }

  sideBarContent() {
    if (this.props.routing.location.pathname === '/games') {
      return (
        <div>
          <div className='navButton' onClick={() => this.props.handleModalAction({createGame: true})}>
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
          {this.analyticsButton()}
          <hr/>
          {this.resetButton()}
        </div>
      )
    }
  }

  render() {
    if (this.props.analytics.active) {
      return (
        <div className="sideBar col-lg-3 col-md-12">
          <div className='navButton' onClick={this.handleAnalytics}>
            <i className='glyphicon glyphicon-signal navIcon'/>
            <span>{this.analyticsText()}</span>
          </div>
          <Analytics pieChartData={this.props.analytics.pieChartData}
            notation={this.props.game.notation}
            handleFetchAnalytics={() => this.props.fetchAnalyticsDataAction(this.props.game.notation)}
          />
        </div>
      )
    } else {
      return (
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
}

const mapStateToProps = ({routing, user, game, sideBar, analytics}) => {
  return {routing, user, game, sideBar, analytics}
}

const mapDispatchToProps = {
  fetchAnalyticsDataAction,
  analyticsAction,
  resetGameAction,
  joinGameAction,
  handleModalAction,
  updateSelectedMoveAction,
  resetBoardAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
