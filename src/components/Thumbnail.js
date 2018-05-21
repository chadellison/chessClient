import React, { Component } from 'react'
import '../styles/thumbnail.css'
import MiniSquare from './MiniSquare'

export default class Thumbnail extends Component {
  mapPiecesToBoard = () => {
    let gamePieces = {}
    this.props.game.attributes.pieces.forEach((piece) => {
      gamePieces[piece.data.attributes.position] = piece.data.attributes
    })
    return gamePieces
  }

  renderBoard = () => {
    let rows = ['8', '7', '6', '5', '4', '3', '2', '1']
    let columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    let gamePieces = this.mapPiecesToBoard()

    let gameId = this.props.game.id

    return rows.map((row, rowIndex) => {
      let eachRow = columns.map((column, columnIndex) => {
        return (
          <MiniSquare key={`miniSquare${rowIndex + columnIndex + gameId}`}
            value={rowIndex + columnIndex + 1}
            piece={gamePieces[column + row]}
          />
        )
      })
      return <div key={`row${rowIndex + gameId}`} className='row justify-content-center'>{eachRow}</div>
    })
  }

  render() {
    return(
      <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'>
        <div className='justify-content-center'>
          <div id={this.props.game.id} className='thumbNailBoard'
            onClick={() => console.log('thumbnail click')}>
              {this.renderBoard()}
          </div>
        </div>
      </div>
    )
  }
}
