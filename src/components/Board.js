import React, { Component } from 'react'
import '../styles/board.css'
import { connect } from 'react-redux'
import Square from './Square'
import { push } from 'react-router-redux'
import {updateGamePayload} from '../actions/gameActions'
import jsonPieces from '../json/pieces'
import PlayerInfo from './PlayerInfo'
import {rows, columns} from '../helpers/boardLogic'

class Board extends Component {
  componentWillMount() {
    let gameId = parseInt(this.props.routing.location.pathname.split('/')[2], 10)
    let currentGame = this.props.activeGames.filter((game) => game.id === gameId)[0]

    if(!currentGame || this.userNotAllowed(currentGame)) {
      this.props.dispatch(push('/'))
    }

    if(currentGame) {
      this.props.dispatch(updateGamePayload(currentGame))
    } else {
      this.props.dispatch(updateGamePayload({pieces: jsonPieces}))
    }
  }

  userNotAllowed(currentGame) {
    return ![currentGame.attributes.whitePlayer.id, currentGame.attributes.blackPlayer.id].includes(this.props.user.id) || !this.props.user.id
  }

  mapPiecesToBoard = () => {
    let gamePieces = {}
    this.props.game.pieces.forEach((piece) => {
      gamePieces[piece.position] = piece
    })
    return gamePieces
  }

  renderBoard = () => {
    let gamePieces = this.mapPiecesToBoard()
    let userId = this.props.user.id
    let blackPlayerId = this.props.game.attributes.blackPlayer.id

    return rows(userId, blackPlayerId).map((row, rowIndex) => {
      let eachRow = columns(userId, blackPlayerId).map((column, columnIndex) => {
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

  findOpponentColor() {
    return this.props.game.attributes.whitePlayer.id === this.props.user.id ? 'blackPlayer' : 'whitePlayer'
  }

  findColor() {
    return this.props.game.attributes.whitePlayer.id === this.props.user.id ? 'whitePlayer' : 'blackPlayer'
  }

  render() {
    return(
      <div className='col-lg-9 col-md-12 '>
        <PlayerInfo playerColor={this.findOpponentColor()} game={this.props.game} />
        <div className='board'>
          {this.renderBoard()}
        </div>
        <PlayerInfo playerColor={this.findColor()} game={this.props.game} />
      </div>
    )
  }
}

const mapStateToProps = ({routing, game, modals, user, activeGames}) => {
  return {routing, game, modals, user, activeGames}
}

export default connect(mapStateToProps)(Board)
