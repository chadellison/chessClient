import React from 'react'
import '../styles/miniSquare.css'

const miniSquareStyles = (squareColor) => {
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

const findPieceType = (pieceType) => {
  if (pieceType === 'rook') {
    return 'tower'
  } else {
    return pieceType
  }
}
const miniPiece = (piece) => {
  if (piece) {
    return(
      <span className={`glyphicon glyphicon-${findPieceType(piece.pieceType)}`} style={pieceStyle(piece.color)}>
      </span>
    )
  } else {
    return null
  }
}

export const MiniSquare = ({piece, value}) => {
  return(
    <div style={miniSquareStyles(value)}>
      {miniPiece(piece)}
    </div>
  )
}
