import React, { Component } from 'react'
import '../styles/square.css'
import Piece from './Piece'
import { DropTarget } from 'react-drag-drop-container'
import moveAudio from '../audio/moveAudio.wav'
import { connect } from 'react-redux'
import { updateGamePayload, updateTurnAction, selectPieceAction } from '../actions/gameActions'
import { handleModalAction } from '../actions/modalActions'
import MoveLogic from '../helpers/moveLogic'
import { nextTurn, updateBoard, updateAttributes } from '../helpers/boardLogic'

class Square extends Component {
  constructor() {
    super()
    this.moveAudio = new Audio(moveAudio)
    this.moveLogic = new MoveLogic()
  }

  findSquareColor() {
    return this.props.value % 2 === 0 ? 'black' : 'white'
  }

  renderPiece() {
    return this.props.piece ? <Piece piece={this.props.piece} /> : ''
  }

  handleMove = () => {
    if(this.isValid(this.props.id)) {
      this.move()
    }
  }

  move = () => {
    if (this.isCrossedPawn()) {
      this.props.dispatch(handleModalAction({promotePawn: true}))
      let crossedPawn = {...this.props.game.selected, crossedPawnPosition: this.props.id}
      this.props.dispatch(selectPieceAction(crossedPawn))
    } else {
      let attributes = updateAttributes(this.props.game, this.props.id)
      this.props.dispatch(updateGamePayload({pieces: updateBoard(this.props.game, this.props.id), attributes: attributes}))
      this.props.dispatch(updateTurnAction(nextTurn(this.props.game.attributes.currentTurn)))
      this.handleActiveGame()
    }
  }

  handleActiveGame() {
    if(this.props.game.id) {
      let gameData = {
        game_id: this.props.game.id,
        position_index: this.props.game.selected.positionIndex,
        new_position: this.props.id
      }
      this.props.sendMoveToServer(gameData)
    } else {
      this.moveAudio.play()
    }
  }

  isCrossedPawn() {
    return this.props.game.selected.pieceType === 'pawn' &&
      (this.props.id[1] === '1' || this.props.id[1] === '8')
  }

  playerColor() {
    if (this.props.user.id && this.props.game.id) {
      if (this.props.user.id === this.props.game.attributes.whitePlayer.id) {
        return 'white'
      } else {
        return 'black'
      }
    }
  }

  notValidForPlayer() {
    if (this.props.game.id) {
      let gameTurn = this.props.game.attributes.currentTurn
      if (this.props.game.attributes.status !== 'active' || this.playerColor() !== gameTurn) {
        return true
      }
    }
  }

  isValid = (nextMove) => {
    if (this.notValidForPlayer()) {
      return false
    }

    let piece = JSON.parse(JSON.stringify(this.props.game.selected))
    let pieces = JSON.parse(JSON.stringify(this.props.game.pieces))

    return this.props.game.attributes.currentTurn === this.props.game.selected.color &&
      this.moveLogic.isValidMove(piece, nextMove, pieces)
  }

  lastMoveClass() {
    if (this.props.isLastMove) {
      return ' isLastMove'
    } else {
      return ''
    }
  }

  squareStyle = () => {
    let dimension = this.props.analytics.analyticsActive ? '3.7vw' : '5.7vw'
    return {
      width: dimension,
      height: dimension,
      transition: 'width 1s, height 1s, transform 1s',
      transformOrigin: '50% 50%',
      animation: 'scale .6s',
    };
  }

  renderSquare = () => {
    if (window.innerWidth < 1000) {
      return (
        <div className={`${this.findSquareColor()}${this.lastMoveClass()}`}
          style={this.squareStyle()}
          id={this.props.id}
          onClick={this.handleMove}>
            {this.renderPiece()}
        </div>
      )
    } else {
      return (
        <DropTarget targetKey='dropSquare' dropData={{id: this.props.id}} onHit={this.handleMove}>
          <div className={`${this.findSquareColor()}${this.lastMoveClass()}`} id={this.props.id}
            style={this.squareStyle()}>
            {this.renderPiece()}
          </div>
        </DropTarget>
      )
    }
  }

  render() {return this.renderSquare()}
}

const mapStateToProps = ({game, user, analytics}) => {
  return {game, user, analytics}
}

export default connect(mapStateToProps)(Square)
