import React from 'react'
import { DragDropContainer } from 'react-drag-drop-container'
import { connect } from 'react-redux'
import { selectPieceAction } from '../actions/gameActions'

const PIECE_KEY = { 'pawn': 'pawn', 'knight': 'knight', 'bishop': 'bishop',
  'rook': 'tower', 'queen': 'queen', 'king': 'king'
}

const pieceStyle = (analytics, piece) => {
  const pieceSize = analytics.active ? '2.5vw' : '3.5vw'
  const isFocusPiece = analytics.focusPiece === piece.positionIndex
  let color = piece.color === 'black' ? '#262638' : '#e3e3ed'
  if (isFocusPiece) {
    color = '#ffbdde'
  }
  return {
    marginTop: '25%',
    fontSize: pieceSize,
    verticalAlign: 'middle',
    transition: 'all 1s',
    color: color
  }
}

const Piece = ({game, analytics, selectPieceAction, piece}) => {
  return (
    <DragDropContainer
      targetKey='dropSquare'
      dragData={{piece: piece}}
      returnToBase={true}
      onDragStart={() => selectPieceAction(piece)}>
      <i
        id={piece.positionIndex}
        style={pieceStyle(analytics, piece)}
        className={`glyphicon glyphicon-${PIECE_KEY[piece.pieceType]}`}
      />
    </DragDropContainer>
  )
}

const mapStateToProps = ({game, analytics}) => {
  return {game, analytics}
}

const mapDispatchToProps = {
  selectPieceAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Piece)
