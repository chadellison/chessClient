import React from 'react'
import { DragDropContainer } from 'react-drag-drop-container'
import { connect } from 'react-redux'
import { updateGameAction } from '../actions/gameActions'
import { updateSelectedMoveAction } from '../actions/moveLogActions'
import socketWrapper from '../socketWrapper'

const PIECE_KEY = { 'p': 'pawn', 'n': 'knight', 'b': 'bishop',
  'r': 'tower', 'q': 'queen', 'k': 'king'
}

const pieceStyle = (analytics, piece) => {
  const pieceSize = analytics.active ? '2.5vw' : '3.5vw'
  const isFocusPiece = analytics.focusPiece === piece.sqaure_index
  let color = piece.color === 'b' ? '#262638' : '#e3e3ed'
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

const handlePieceSelection = (piece, game, sockets, updateGameAction, updateSelectedMoveAction) => {
  if (game.previousSetup) {
    updateGameAction({...game, previousSetup: '', notation: game.previousSetup, selected: {}});
    updateSelectedMoveAction(game.previousSetup.split(' ').length - 2)
    socketWrapper.gameSocket.update({game_id: game.id, notation: game.previousSetup});
  } else {
    updateGameAction({...game, selected: piece});
  }
}

const Piece = ({analytics, updateGameAction, piece, game, sockets, updateSelectedMoveAction}) => {
  return (
    <DragDropContainer
      targetKey='dropSquare'
      dragData={{piece: piece}}
      returnToBase={true}
      onDragStart={() => handlePieceSelection(piece, game, sockets, updateGameAction, updateSelectedMoveAction)}>
      <i
        id={piece.square_index}
        style={pieceStyle(analytics, piece)}
        className={`glyphicon glyphicon-${PIECE_KEY[piece.piece_type.toLowerCase()]}`}
      />
    </DragDropContainer>
  )
}

const mapStateToProps = ({analytics, sockets, game}) => {
  return {analytics, sockets, game}
}

const mapDispatchToProps = {
  updateGameAction,
  updateSelectedMoveAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Piece)
