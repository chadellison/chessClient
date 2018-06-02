import React, { Component } from 'react'
import '../styles/square.css'
import Piece from './Piece'
import { DropTarget } from 'react-drag-drop-container'
import moveAudio from '../audio/moveAudio.wav'
import { connect } from 'react-redux'
import {updateGamePayload, updateTurnAction, selectPieceAction} from '../actions/gameActions'
import {handleModalAction} from '../actions/modalActions'
import MoveLogic from '../helpers/moveLogic'
import { nextTurn, updateBoard, updateGameNotation } from '../helpers/boardLogic'

class Square extends Component {
  constructor() {
    super()
    this.moveAudio = new Audio(moveAudio)
    this.moveLogic = new MoveLogic()
  }

  findSquareColor() {
    return this.props.value % 2 === 0 ? 'white' : 'black'
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
      let attributes = updateGameNotation(this.props.game, this.props.id)
      this.props.dispatch(updateGamePayload({pieces: updateBoard(this.props.game, this.props.id), attributes: attributes}))
      this.props.dispatch(updateTurnAction(nextTurn(this.props.game.attributes.currentTurn)))
      this.handleActiveGame()
    }
  }

  // updateGameNotation(game) {
  //   let attributes = JSON.parse(JSON.stringify(game.attributes))
  //
  //   if (!game.id) {
  //     let piece = JSON.parse(JSON.stringify(game.selected))
  //     let clonedGame = JSON.parse(JSON.stringify(game))
  //     attributes.notation = attributes.notation + this.moveLogic.createNotation(clonedGame, piece, this.props.id)
  //     return attributes
  //   } else {
  //     return attributes
  //   }
  // }

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

  render() {
    return (
      <DropTarget targetKey='dropSquare' dropData={{id: this.props.id}} onHit={this.handleMove}>
        <div className={`square ${this.findSquareColor()}`} id={this.props.id}>
          {this.renderPiece()}
        </div>
      </DropTarget>
    )
  }
}

const mapStateToProps = ({game, user}) => {
  return {game, user}
}

export default connect(mapStateToProps)(Square)
