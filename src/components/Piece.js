import React, { Component } from 'react'
import '../styles/piece.css'
import { DragDropContainer } from 'react-drag-drop-container'
import { connect } from 'react-redux'
import {selectPieceAction} from '../actions/gameActions'

const PIECE_KEY = { 'pawn': 'pawn', 'knight': 'knight', 'bishop': 'bishop',
  'rook': 'tower', 'queen': 'queen', 'king': 'king'
}

class Piece extends Component {
  render() {
    return (
      <DragDropContainer
        targetKey='dropSquare'
        dragData={{piece: this.props.piece}}
        returnToBase={true}
        onDragStart={() => this.props.dispatch(selectPieceAction(this.props.piece))}>
        <i
          id={this.props.piece.positionIndex}
          className={
            `glyphicon glyphicon-${PIECE_KEY[this.props.piece.pieceType]}
              piece piece-${this.props.piece.color}`
          }
        />
      </DragDropContainer>

    )
  }
}

const mapStateToProps = ({game}) => {
  return {game}
}

export default connect(mapStateToProps)(Piece)
