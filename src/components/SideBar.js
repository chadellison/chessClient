import React, { Component } from 'react'
import '../styles/sideBar.css'
import Chat from './Chat'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Credentials from './Credentials'
import Analytics from './Analytics'
import { NavTitle } from './NavTitle'
import SideBarContent from './SideBarContent'
import { handleModalAction } from '../actions/modalActions'
import { updateGamePayload } from '../actions/gameActions'
import { mapPiecesToBoard } from '../helpers/boardLogic'
import { analyticsAction, fetchAnalyticsDataAction } from '../actions/analyticsActions'

class SideBar extends Component {
  componentDidMount() {
    this.handleFetchAnalytics()
  }

  handleAllGamesClick = () => {
    if (this.props.user.token) {
      this.props.dispatch(push('/games'))
    } else {
      this.props.dispatch(handleModalAction({login: true}))
    }
  }

  handleViewAllGamesClick = (pathname) => {
    if (pathname === '/allGames') {
      this.props.dispatch(push('/'))
    } else {
      this.props.dispatch(push('/allGames'))
    }
  }


  movesWithCount = () => {
    return this.props.game.attributes.moves.map((move, index) => {
      return { value: move, move_count: index + 1 }
    })
  }

  handleFetchAnalytics = () => {
    let {game} = this.props
    let gameTurnCode = game.attributes.moves.length % 2 === 0 ? 'w' : 'b'
    this.props.dispatch(fetchAnalyticsDataAction(game.pieces, gameTurnCode, this.movesWithCount()))
  }

  handleAnalytics = () => {
    if (!this.props.analytics.active) {
      this.handleFetchAnalytics()
    }
    this.props.dispatch(analyticsAction(!this.props.analytics.active))
  }

  handlePreviousBoard = (e) => {
    let endIndex = parseInt(e.target.id, 10) + 1
    let previousSetup = this.props.game.attributes.moves.slice(0, endIndex)
    this.props.dispatch(updateGamePayload({previousSetup: previousSetup}))

    let gamePieces = Object.values(mapPiecesToBoard(previousSetup, this.props.game))
    if (this.props.analytics.active) {
      let gameTurnCode = previousSetup.length % 2 === 0 ? 'w' : 'b'
      this.props.dispatch(fetchAnalyticsDataAction(gamePieces, gameTurnCode, this.movesWithCount()))
    }
  }

  render() {
    if (this.props.analytics.active) {
      return (
        <div className="sideBar col-lg-3 col-md-12">
          <div className='navButton' onClick={this.handleAnalytics}>
            <i className='glyphicon glyphicon-signal navIcon'/>
            <span>{this.props.analytics.active ? 'Hide Analytics' : 'Analytics'}</span>
          </div>
          <Analytics pieChartData={this.props.analytics.pieChartData}
            notation={this.props.game.attributes.notation}
            handleFetchAnalytics={this.handleFetchAnalytics}
          />
        </div>
      )
    } else {
      return (
        <div className='sideBar col-lg-3 col-md-12'>
          <Credentials />
          <div className='sideBarBackground'>
            <NavTitle />
            <hr/>
            <SideBarContent
              handleAllGamesClick={this.handleAllGamesClick}
              handleAnalytics={this.handleAnalytics}
              pathname={this.props.routing.location.pathname}
              handleViewAllGamesClick={this.handleViewAllGamesClick}
            />
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

export default connect(mapStateToProps)(SideBar)
