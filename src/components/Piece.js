import React, { Component } from 'react'
import { DragDropContainer } from 'react-drag-drop-container'
import { connect } from 'react-redux'
import { selectPieceAction } from '../actions/gameActions'

const PIECE_KEY = { 'pawn': 'pawn', 'knight': 'knight', 'bishop': 'bishop',
  'rook': 'tower', 'queen': 'queen', 'king': 'king'
}

const pieceStyle = (props) => {
  const pieceSize = props.analytics.active ? '2.5vw' : '3.5vw'
  const color = props.piece.color === 'black' ? '#262638' : '#e3e3ed'
  return {
    marginTop: '25%',
    fontSize: pieceSize,
    verticalAlign: 'middle',
    transition: 'all 1s',
    color: color
  }
}

class Piece extends Component {
  renderPiece = () => {
    const {piece} = this.props
    return (
      <DragDropContainer
        targetKey='dropSquare'
        dragData={{piece: piece}}
        returnToBase={true}
        onDragStart={() => this.props.dispatch(selectPieceAction(piece))}>
        <i
          id={piece.positionIndex}
          style={pieceStyle(this.props)}
          className={`glyphicon glyphicon-${PIECE_KEY[piece.pieceType]}`}
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
