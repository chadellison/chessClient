import React, { Component } from 'react'
import '../styles/sideBar.css'
import Chat from './Chat'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Credentials from './Credentials'
import Analytics from './Analytics'
import { NavButton } from './NavButton'
import { handleModalAction } from '../actions/modalActions'
import { resetGameAction, joinGameAction, updateGamePayload } from '../actions/gameActions'
import { mapPiecesToBoard } from '../helpers/boardLogic'
import { analyticsAction, fetchAnalyticsDataAction } from '../actions/analyticsActions'

class SideBar extends Component {
  componentDidMount() {
    this.handleFetchAnalytics()
  }

  handleAllGamesButton = () => {
    if (this.props.user.token) {
      this.props.dispatch(push('/games'))
    } else {
      this.props.dispatch(handleModalAction({login: true}))
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

  allGamesText() {
    if(this.props.user.token && this.props.game.id) {
      return 'My Games'
    } else {
      return 'Play'
    }
  }

  handleJoinGame = () => {
    this.props.dispatch(joinGameAction(this.props.user.token))
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

  analyticsText() {
    if (this.props.analytics.active) {
      return 'Hide Analytics'
    } else {
      return 'Analytics'
    }
  }

  isGamesPath = () => {
    return this.props.routing.location.pathname === '/games'
  }

  sideBarContent() {
    return (
      <div>
        <NavButton onClick={() => this.props.dispatch(handleModalAction({createGame: true}))}
          icon={'plus'}
          content={'Create Game'}
          hidden={!this.isGamesPath()}
        />
        <NavButton onClick={this.handleJoinGame}
          icon={'search'}
          content={'Find Game'}
          hidden={!this.isGamesPath()}
        />
        <NavButton onClick={this.handleAllGamesButton}
          icon={'knight'}
          content={this.allGamesText()}
          hidden={this.isGamesPath()}
        />
        <NavButton onClick={() => console.log('watch all games')}
          icon={'facetime-video'}
          content={'View Games'}
          hidden={false}
        />
        <NavButton onClick={this.handleAnalytics}
          icon={'signal'}
          content={this.analyticsText()}
          hidden={this.isGamesPath()}
        />
        <NavButton onClick={() => this.props.dispatch(resetGameAction())}
          hidden={this.isGamesPath()}
          icon={'triangle-left'}
          content={'Reset'}
        />
      </div>
    )
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

export default connect(mapStateToProps)(SideBar)
