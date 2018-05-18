import React, { Component } from 'react'
import '../styles/board.css'
import { connect } from 'react-redux'
import Square from './Square'
import {loadPiecesAction} from '../actions/gameActions'
import pieces from '../json/pieces'

class Board extends Component {
  componentWillMount() {
    this.props.dispatch(loadPiecesAction(pieces))
  }

  mapPiecesToBoard = () => {
    let gamePieces = {}
    this.props.game.pieces.forEach((piece) => {
      gamePieces[piece.position] = piece
    })
    return gamePieces
  }

  renderBoard = () => {
    let rows = ['8', '7', '6', '5', '4', '3', '2', '1']
    let columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    let gamePieces = this.mapPiecesToBoard()

    return rows.map((row, rowIndex) => {
      let eachRow = columns.map((column, columnIndex) => {
        return (
          <Square key={`square${rowIndex + columnIndex + 1}`}
            id={column + row}
            value={rowIndex + columnIndex + 1}
            piece={gamePieces[column + row]}
          />
        )
      })
      return <div key={`row${rowIndex}`} className='boardRow row justify-content-center'>{eachRow}</div>
    })
  }

  render() {
    return(
      <div className='col-lg-9 col-md-12 board'>
        {this.renderBoard()}
      </div>
    )
  }
}

const mapStateToProps = ({game}) => {
  return {game}
}

export default connect(mapStateToProps)(Board)
