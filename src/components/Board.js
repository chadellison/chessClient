import React, { Component } from 'react'
import '../styles/board.css'
import { connect } from 'react-redux'
import Square from './Square'
import { push } from 'react-router-redux'
import {updateGamePayload} from '../actions/gameActions'
import jsonPieces from '../json/pieces'
import PlayerInfo from './PlayerInfo'

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
    return ![currentGame.attributes.whitePlayer, currentGame.attributes.blackPlayer].includes(this.props.user.id) || !this.props.user.id
  }

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
      <div className='col-lg-9 col-md-12 '>
        <PlayerInfo/>
        <div className='board'>
          {this.renderBoard()}
        </div>
        <PlayerInfo/>
      </div>
    )
  }
}

const mapStateToProps = ({routing, game, modals, user, activeGames}) => {
  return {routing, game, modals, user, activeGames}
}

export default connect(mapStateToProps)(Board)
