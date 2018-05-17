import React, { Component } from 'react'
import '../styles/piece.css'

const PIECE_KEY = { 'pawn': 'pawn', 'knight': 'knight', 'bishop': 'bishop',
  'rook': 'tower', 'queen': 'queen', 'king': 'king'
}

export default class Piece extends Component {
  render() {
    return (
      <i
        id={this.props.piece.positionIndex}
        className={
          `glyphicon glyphicon-${PIECE_KEY[this.props.piece.pieceType]}
            piece piece-${this.props.piece.color}`
        }
      />
    )
  }
}
