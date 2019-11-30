import React, { Component } from 'react'
import '../styles/thumbnail.css'
import { MiniSquare } from './MiniSquare'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { rows, columns, findGravater, mapPiecesToBoard } from '../helpers/boardLogic'

class Thumbnail extends Component {
  renderBoard = () => {
    let gamePieces = mapPiecesToBoard(null, this.props.thumbnailGame)

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
    let game = this.props.thumbnailGame
    if (game.attributes.status === 'active') {
      return (
        <div className='playerVsPlayer'>
          <img src={findGravater(game.attributes.whitePlayer, game)}
            className='thumbnailGravatar' alt='gravatar'/>
              VS
          <img src={findGravater(game.attributes.blackPlayer, game)}
            className='thumbnailGravatar' alt='gravatar'/>
        </div>
      )
    } else {
      return (
        <div className='playerVsPlayer'>
          <img src={findGravater(this.props.user, game)}
            className='thumbnailGravatar' alt='gravatar'/>
        </div>
      )
    }
  }

  handleEnterGame = () => {
    this.props.dispatch(push(`/games/${this.props.thumbnailGame.id}`));
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
