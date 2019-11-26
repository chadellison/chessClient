import React, { Component } from 'react'
import '../styles/gameInfo.css'
import { connect } from 'react-redux'
import {MoveLog} from './MoveLog'
import PlayerInfo from './PlayerInfo'
import { updateGamePayload } from '../actions/gameActions'
import { updateSelectedMoveAction } from '../actions/moveLogActions'
import { mapPiecesToBoard } from '../helpers/boardLogic'
import { fetchAnalyticsDataAction } from '../actions/analyticsActions'

class GameInfo extends Component {
  handlePreviousBoard = (id) => {
    let endIndex = parseInt(id, 10) + 1
    let previousSetup = this.props.game.attributes.moves.slice(0, endIndex)
    this.props.dispatch(updateGamePayload({previousSetup: previousSetup}))

    let gamePieces = Object.values(mapPiecesToBoard(previousSetup, this.props.game))
    if (this.props.analytics.active) {
      let gameTurnCode = previousSetup.length % 2 === 0 ? 'w' : 'b'
      this.props.dispatch(fetchAnalyticsDataAction(gamePieces, gameTurnCode, this.movesWithCount()))
    }
  }

  movesWithCount = () => {
    return this.props.game.attributes.moves.map((move, index) => {
      return { value: move, move_count: index + 1 }
    })
  }

  handleSelectedMove = (selectedMove) => {
    this.handlePreviousBoard(selectedMove)
    this.props.dispatch(updateSelectedMoveAction(selectedMove + 1))
  }

  findOpponentColor() {
    return this.props.game.attributes.whitePlayer.id === this.props.user.id ? 'blackPlayer' : 'whitePlayer'
  }

  findColor() {
    return this.props.game.attributes.whitePlayer.id === this.props.user.id ? 'whitePlayer' : 'blackPlayer'
  }

  renderPlayerInfo(color) {
    if (this.props.game.attributes.status) {
      return (
        <PlayerInfo
          playerColor={this.findColor()}
          game={this.props.game}
        />
      )
    } else {
      return ''
    }
  }

  renderOpponent() {
    const {status} = this.props.game.attributes
    if (status) {
      return (
        <PlayerInfo
          playerColor={this.findOpponentColor()}
          game={this.props.game}
        />
      )
    } else {
      return ''
    }
  }

  render() {
    return (
      <div hidden={this.props.routing.location.pathname === '/games'} className='gameInfo col-lg-3 col-md-12'>
        {this.renderOpponent()}
        <div className='gameInfoBackground'>
          <h3 className='moveLogTitle'>
            Move Log
          </h3>
          <MoveLog
            game={this.props.game}
            handleSelectedMove={this.handleSelectedMove}
            selectedMove={this.props.moveLog.selectedMove}
          />
          <hr/>
        </div>
        {this.renderPlayerInfo()}
      </div>
    )
  }
}

const mapStateToProps = ({routing, user, game, analytics, moveLog}) => {
  return {routing, user, game, analytics, moveLog}
}

export default connect(mapStateToProps)(GameInfo)
