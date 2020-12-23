import React, { Component } from 'react'
import '../styles/gameInfo.css'
import { connect } from 'react-redux'
import { MoveLog } from './MoveLog'
import { MoveControls } from './MoveControls'
import PlayerInfo from './PlayerInfo'
import { updateGameAction } from '../actions/gameActions'
import { updateSelectedMoveAction } from '../actions/moveLogActions'
// import { mapPiecesToBoard } from '../helpers/boardLogic'
import { fetchAnalyticsDataAction } from '../actions/analyticsActions'
import socketWrapper from '../socketWrapper'

class GameInfo extends Component {
  handlePreviousBoard = (index) => {
    const { game } = this.props;
    const previousSetup = game.previousSetup ? game.previousSetup : game.notation;
    const splitMoves = previousSetup.split(' ');
    if (this.props.moveLog.index !== index && index >= 0 && index < splitMoves.length - 1) {
      const newNotation = (splitMoves.slice(0, index + 1)).join(' ')
      this.props.fetchAnalyticsDataAction(newNotation)
      this.props.updateGameAction({...game, previousSetup})
      socketWrapper.gameSocket.update({game_id: game.id, notation: newNotation});
      this.props.updateSelectedMoveAction(index);
    }
  }

  // movesWithCount = () => {
  //   return this.props.game.attributes.moves.map((move, index) => {
  //     return { value: move, move_count: index + 1 }
  //   })
  // }

  // handleSelectedMove = (selectedMove) => {
  //   this.handlePreviousBoard(selectedMove)
  //   this.props.dispatch(updateSelectedMoveAction(selectedMove + 1))
  // }

  findOpponentColor() {
    return this.props.game.attributes.whitePlayer.id === this.props.user.id ? 'blackPlayer' : 'whitePlayer'
  }

  findColor() {
    return this.props.game.attributes.whitePlayer.id === this.props.user.id ? 'whitePlayer' : 'blackPlayer'
  }

  renderPlayerInfo(color) {
    // if (this.props.game.attributes.status) {
    //   return (
    //     <PlayerInfo
    //       playerColor={this.findColor()}
    //       game={this.props.game}
    //     />
    //   )
    // } else {
      return ''
    // }
  }

  renderOpponent() {
    // const {status} = this.props.game.attributes
    // if (status) {
    //   return (
    //     <PlayerInfo
    //       playerColor={this.findOpponentColor()}
    //       game={this.props.game}
    //     />
    //   )
    // } else {
      return ''
    // }
  }

  render() {
    const {previousSetup, notation} = this.props.game;
    const moveCount = previousSetup ? previousSetup.split(' ').length - 1 : notation.split(' ').length - 1
    return (
      <div hidden={this.props.routing.location.pathname === '/games'} className='gameInfo col-lg-3 col-md-12'>
        {this.renderOpponent()}
        <MoveLog
          game={this.props.game}
          handlePreviousBoard={this.handlePreviousBoard}
          selectedMove={this.props.moveLog.index}
        />
        <MoveControls
          handlePreviousBoard={this.handlePreviousBoard}
          selectedMove={this.props.moveLog.index}
          totalMoveCount={moveCount}
        />
        {this.renderPlayerInfo()}
      </div>
    )
  }
}

const mapStateToProps = ({routing, user, game, analytics, moveLog, sockets}) => {
  return {routing, user, game, analytics, moveLog, sockets}
}

const mapDispatchToProps = {
  updateGameAction,
  updateSelectedMoveAction,
  fetchAnalyticsDataAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameInfo)
