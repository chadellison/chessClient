import React, { Component } from 'react'
import '../styles/thumbnail.css'
import MiniSquare from './MiniSquare'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {rows, columns, findGravater} from '../helpers/boardLogic'

class Thumbnail extends Component {
  mapPiecesToBoard = () => {
    let gamePieces = {}
    this.props.thumbnailGame.pieces.forEach((piece) => {
      gamePieces[piece.position] = piece
    })
    return gamePieces
  }

  renderBoard = () => {
    let gamePieces = this.mapPiecesToBoard()

    let gameId = this.props.thumbnailGame.id
    let userId = this.props.user.id
    let blackPlayerId = this.props.thumbnailGame.attributes.blackPlayer.id

    return rows(userId, blackPlayerId).map((row, rowIndex) => {
      let eachRow = columns(userId, blackPlayerId).map((column, columnIndex) => {
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
    if (this.props.thumbnailGame.attributes.status === 'active') {
      return <h3 className='statusTitle'>In Progress</h3>
    } else {
      return <h3 className='statusTitle'>Awaiting Player</h3>
    }
  }

  renderPlayers() {
    if (this.props.thumbnailGame.attributes.status === 'active') {
      return (
        <div className='playerVsPlayer'>
          <img src={findGravater(this.props.thumbnailGame.attributes.whitePlayer)}
            className='thumbnailGravatar' alt='gravatar'/>
              VS
          <img src={findGravater(this.props.thumbnailGame.attributes.blackPlayer)}
            className='thumbnailGravatar' alt='gravatar'/>
        </div>
      )
    } else {
      return (
        <div className='playerVsPlayer'>
          <img src={findGravater(this.props.user)}
            className='thumbnailGravatar' alt='gravatar'/>
        </div>
      )
    }
  }

  handleEnterGame = () => {
    this.props.dispatch(push(`/games/${this.props.thumbnailGame.id}`))
  }

  render() {
    return(
      <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 thumbnailCard'>
        <div className='justify-content-center'>
          <div id={this.props.thumbnailGame.id} className='thumbNailBoard'>
            {this.statusText()}
            {this.renderPlayers()}
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

const mapStateToProps = ({user}) => {
  return {user}
}

export default connect(mapStateToProps)(Thumbnail)
