import React, { Component } from 'react'
import '../styles/piece.css'
import { DragDropContainer } from 'react-drag-drop-container'

const PIECE_KEY = { 'pawn': 'pawn', 'knight': 'knight', 'bishop': 'bishop',
  'rook': 'tower', 'queen': 'queen', 'king': 'king'
}

export default class Piece extends Component {
  handleSelected = (piece) => {
    console.log('start move')
  }

  render() {
    return (
      <DragDropContainer
        targetKey='dropSquare'
        dragData={{piece: this.props.piece}}
        returnToBase={true}
        onDragStart={() => this.handleSelected(this.props.piece)}>
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
