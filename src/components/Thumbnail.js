import React, { Component } from 'react'
import '../styles/thumbnail.css'
import MiniSquare from './MiniSquare'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class Thumbnail extends Component {
  mapPiecesToBoard = () => {
    let gamePieces = {}
    this.props.game.pieces.forEach((piece) => {
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

  statusText() {
    if(this.props.game.attributes.status === 'active') {
      return <h3 className='statusTitle'>In Progress</h3>
    } else {
      return <h3 className='statusTitle'>Awaiting Player</h3>
    }
  }

  handleEnterGame = () => {
    this.props.dispatch(push(`/games/${this.props.game.id}`))
  }

  render() {
    return(
      <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 thumbnailCard'>
        <div className='justify-content-center'>
          <div id={this.props.game.id} className='thumbNailBoard'>
            {this.statusText()}
            {this.renderBoard()}
            <div className='enterGameButton'
              onClick={this.handleEnterGame}>
                Join
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({}) => {
  return {}
}

export default connect(mapStateToProps)(Thumbnail)
