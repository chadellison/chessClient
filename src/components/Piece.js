import React, { Component } from 'react'
import '../styles/piece.css'
import { DragDropContainer } from 'react-drag-drop-container'
import { connect } from 'react-redux'
import { selectPieceAction } from '../actions/gameActions'

const PIECE_KEY = { 'pawn': 'pawn', 'knight': 'knight', 'bishop': 'bishop',
  'rook': 'tower', 'queen': 'queen', 'king': 'king'
}

class Piece extends Component {
  pieceStyle = () => {
    let pieceSize = this.props.analytics.analyticsActive ? '2.5vw' : '3.5vw'
    return {
      marginTop: '25%',
      fontSize: pieceSize,
      verticalAlign: 'middle',
      transition: 'all 1s',
    }
  }
  renderPiece = () => {
    return (
      <DragDropContainer
        targetKey='dropSquare'
        dragData={{piece: this.props.piece}}
        returnToBase={true}
        onDragStart={() => this.props.dispatch(selectPieceAction(this.props.piece))}>
        <i
          id={this.props.piece.positionIndex}
          style={this.pieceStyle()}
          className={
            `glyphicon glyphicon-${PIECE_KEY[this.props.piece.pieceType]}
              piece piece-${this.props.piece.color}`
          }
        />
      </DragDropContainer>
    )
  }
  render() {return this.renderPiece()}
}

const mapStateToProps = ({game, analytics}) => {
  return {game, analytics}
}

export default connect(mapStateToProps)(Piece)
