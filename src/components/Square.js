import React, { Component } from 'react'
import '../styles/square.css'
import Piece from './Piece'
import { DropTarget } from 'react-drag-drop-container'
import moveAudio from '../audio/moveAudio.wav'
import { connect } from 'react-redux'
import {loadPiecesAction, updateTurnAction} from '../actions/gameActions'

class Square extends Component {
  constructor() {
    super()
    this.moveAudio = new Audio(moveAudio)
  }

  findColor() {
    return this.props.value % 2 === 0 ? 'white' : 'black'
  }

  renderPiece() {
    return this.props.piece ? <Piece piece={this.props.piece} /> : ''
  }

  handleMove = () => {
    if(this.isValid()) {
      this.props.dispatch(loadPiecesAction(this.updateBoard(this.props.game.selected, this.props.id)))
      this.props.dispatch(updateTurnAction(this.nextTurn()))
      this.moveAudio.play()
    }
  }

  nextTurn = () => {
    return this.props.game.currentTurn === 'white' ? 'black' : 'white'
  }

  isValid = () => {
    // fetch valid moves for piece
    // does move include valid moves
    return this.props.game.currentTurn === this.props.game.selected.color
  }

  updateBoard = (selectedPiece, newPosition) => {
    return this.props.game.pieces.filter((piece) => {
      return piece.position !== newPosition
    }).map((piece) => {
      if(piece.positionIndex === selectedPiece.positionIndex) {
        piece.position = newPosition
      }
      return piece
    })
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
