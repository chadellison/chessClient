import React, { Component } from 'react'
import '../styles/miniSquare.css'

const miniSquare = (squareColor) => {
  const color = squareColor % 2 === 0 ? '#cd853f' : '#8b4513'
  return {
    width: '2.3em',
    height: '2.3em',
    background: color
  }
}

const pieceStyle = (pieceColor) => {
  const color = pieceColor === 'black' ? '#262638' : '#e3e3ed'
  return {
    marginTop: '15%',
    fontSize: '1.3em',
    verticalAlign: 'middle',
    color: color,
  }
}

export default class MiniSquare extends Component {
  findPieceType() {
    if (this.props.piece.pieceType === 'rook') {
      return 'tower'
    } else {
      return this.props.piece.pieceType
    }
  }

  miniPiece() {
    if (this.props.piece) {
      return(
        <span className={`glyphicon glyphicon-${this.findPieceType()}`} style={pieceStyle(this.props.piece.color)}>
        </span>
      )
    } else {
      return null
    }
  }

  render() {
    return(
      <div style={miniSquare(this.props.value)}>
        {this.miniPiece()}
      </div>
    )
  }
}
