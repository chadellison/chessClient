import React from 'react'
import Piece from './Piece'
import { DropTarget } from 'react-drag-drop-container'
import { connect } from 'react-redux'
import { handleModalAction } from '../actions/modalActions'
import { updateBoardAction } from '../actions/boardActions'
import { updateGameAction } from '../actions/gameActions'
import { updateSelectedMoveAction } from '../actions/moveLogActions'
import { move } from '../helpers/gameLogic'

const squareStyle = (analytics, id, isLastMove, color) => {
  const isFocusSquare = analytics.focusSquare === id
  let dimension = analytics.active ? '3.7vw' : '5.7vw'
  let border = isLastMove ? '1px solid #ffa109' : 'none'
  let opacity = isLastMove ? '0.75' : '1'

  return {
    width: dimension,
    height: dimension,
    transition: 'width 1s, height 1s, transform 1s',
    transformOrigin: '50% 50%',
    animation: 'scale .6s',
    border: border,
    opacity: opacity,
    background: isFocusSquare ? '#ffbdde' : color
  }
}

const Square = ({analytics, game, board, handleModalAction, sendMoveToServer, id, isLastMove, color, piece, updateBoardAction, updateGameAction, updateSelectedMoveAction}) => {
  return (
    <DropTarget targetKey='dropSquare' dropData={{id: id}} onHit={() => move(board, game, handleModalAction, sendMoveToServer, id, updateBoardAction, updateGameAction, updateSelectedMoveAction)}>
      <div id={id} style={squareStyle(analytics, id, isLastMove, color)}>
        {piece && <Piece piece={piece} />}
      </div>
    </DropTarget>
  )
}

const mapStateToProps = ({game, user, analytics, board}) => {
  return {game, user, analytics, board}
}

const mapDispatchToProps = {
  handleModalAction,
  updateBoardAction,
  updateGameAction,
  updateSelectedMoveAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Square)
