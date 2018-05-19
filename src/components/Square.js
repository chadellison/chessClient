import React, { Component } from 'react'
import '../styles/square.css'
import Piece from './Piece'
import { DropTarget } from 'react-drag-drop-container'
import moveAudio from '../audio/moveAudio.wav'
import { connect } from 'react-redux'
import {loadPiecesAction, updateTurnAction} from '../actions/gameActions'
import MoveLogic from '../helpers/moveLogic'

class Square extends Component {
  constructor() {
    super()
    this.moveAudio = new Audio(moveAudio)
    this.moveLogic = new MoveLogic()
  }

  findColor() {
    return this.props.value % 2 === 0 ? 'white' : 'black'
  }

  renderPiece() {
    return this.props.piece ? <Piece piece={this.props.piece} /> : ''
  }

  handleMove = () => {
    if(this.isValid(this.props.id)) {
      this.props.dispatch(loadPiecesAction(this.updateBoard(this.props.game.selected, this.props.id)))
      this.props.dispatch(updateTurnAction(this.nextTurn()))
      this.moveAudio.play()
    }
  }

  nextTurn = () => {
    return this.props.game.currentTurn === 'white' ? 'black' : 'white'
  }

  isValid = (nextMove) => {
    let piece = JSON.parse(JSON.stringify(this.props.game.selected))
    let pieces = JSON.parse(JSON.stringify(this.props.game.pieces))

    return this.props.game.currentTurn === this.props.game.selected.color &&
      this.moveLogic.isValidMove(piece, nextMove, pieces)
  }

  updatePiece = (piece, newPosition) => {
    if (this.pawnMovedTwo(piece, newPosition)) {
      piece = {...piece, movedTwo: true}
    }
    piece = {...piece, position: newPosition}
    piece.hasMoved = true
    return piece
  }

  pawnMovedTwo = (piece, newPosition) => {
    return (piece.pieceType === 'pawn' && Math.abs(parseInt(newPosition[1], 10) - parseInt(this.props.game.selected.position[1], 10)) === 2)
  }

  updateBoard = (selectedPiece, newPosition) => {
    let additionalBoardUpdates = { movedTwo: false, didEnPassant: false, didCastle: false }
    let pieces = JSON.parse(JSON.stringify(this.props.game.pieces))

    pieces = this.props.game.pieces.filter((piece) => {
      return piece.position !== newPosition
    }).map((piece) => {
      if (piece.positionIndex === selectedPiece.positionIndex) {
        piece = this.updatePiece(piece, newPosition)
        additionalBoardUpdates[piece.movedTwo]
        additionalBoardUpdates[piece.didEnPassant]
        additionalBoardUpdates[piece.didCastle]
      }
      return piece
    })

    return this.handleAdditionalBoardUpdates(additionalBoardUpdates, pieces, newPosition)
  }

  handleAdditionalBoardUpdates = (additionalBoardUpdates, pieces, newPosition) => {
    let updatedPieces = pieces

    if (!additionalBoardUpdates.movedTwo) {
      updatedPieces = pieces.map((gamePiece) => gamePiece.movedTwo = false)
    }
    if (additionalBoardUpdates.didEnPassant) {
      // remove taken pawn
    }
    if (additionalBoardUpdates.didCastle) {
      // update rook
    }
    return pieces
  }

  render() {
    return (
      <DropTarget targetKey='dropSquare' dropData={{id: this.props.id}} onHit={this.handleMove}>
        <div className={`square ${this.findColor()}`} id={this.props.id}>
          {this.renderPiece()}
        </div>
      </DropTarget>
    )
  }
}

const mapStateToProps = ({game}) => {
  return {game}
}

export default connect(mapStateToProps)(Square)
