import React, { Component } from 'react'
import '../styles/miniSquare.css'

export default class MiniSquare extends Component {
  findColor() {
    return this.props.value % 2 === 0 ? 'white' : 'black'
  }

  findPieceType() {
    if(this.props.piece.pieceType === 'rook') {
      return 'tower'
    } else {
      return this.props.piece.pieceType
    }
  }

  miniPiece() {
    if(this.props.piece) {
      return(
        <span className={`glyphicon glyphicon-${this.findPieceType()} miniPiece piece-${this.props.piece.color}`}>
        </span>
      )
    } else {
      return null
    }
  }

  render() {
    return(
      <div className={`miniSquare ${this.findColor()}`}>
        {this.miniPiece()}
      </div>
    )
  }
}
