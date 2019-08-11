import React, { Component } from 'react'
import '../styles/board.css'
import { connect } from 'react-redux'
import Square from './Square'
import AnalyticsLineChart from './AnalyticsLineChart'
import { push } from 'react-router-redux'
import { updateGamePayload } from '../actions/gameActions'
import { updateChatChannelAction } from '../actions/chatActions'
import { createGameSocketAction } from '../actions/socketActions'
import { handleModalAction } from '../actions/modalActions'
import { rows, columns } from '../helpers/boardLogic'
import { WEBSOCKET_HOST } from '../config/endpoints.js'
import moveAudio from '../audio/moveAudio.wav'
import { mapPiecesToBoard, isLastMove } from '../helpers/boardLogic'
import Cable from 'actioncable'

class Board extends Component {
  constructor() {
    super()
    this.moveAudio = new Audio(moveAudio)
  }

  componentDidMount() {
    let gameId = parseInt(this.props.routing.location.pathname.split('/')[2], 10)
    let currentGame = this.props.activeGames.filter((game) => game.id === gameId)[0]
    if (gameId && (!currentGame || !this.userAllowed(currentGame))) {
      this.props.dispatch(push('/'))
    }

    if (currentGame) {
      this.props.dispatch(updateGamePayload(currentGame))
      this.props.dispatch(updateChatChannelAction('ChatChannel'))
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.game.id !== this.props.game.id) {
      this.createGameSocket()
    }
  }

  componentWillUnmount() {
    if (this.props.sockets.gameSocket) {
      console.log('Unsubscribed from game ' + this.props.game.id)
      this.props.sockets.gameSocket.unsubscribe()
    }
  }

  createGameSocket = () => {
    let cable = Cable.createConsumer(WEBSOCKET_HOST)

    let gameSocket = cable.subscriptions.create(
      { channel: 'GameChannel', game_id: this.props.game.id },
      { connected: () => {},
        received: (data) => {
          const {currentTurn, whitePlayer, blackPlayer} = data.attributes
          const playerId = currentTurn === 'white' ? whitePlayer.id : blackPlayer.id
          if (this.props.user.id === playerId || data.attributes.gameType === 'machine vs machine') {
            this.moveAudio.play()
          }
          this.props.dispatch(updateGamePayload(data))
          if (data.attributes.outcome) {
            this.props.dispatch(handleModalAction({gameOver: true}))
          }
        },
        update: function(gameData) {
          this.perform('update', gameData)
        }
      }
    )
    this.props.dispatch(createGameSocketAction(gameSocket))
  }

  sendMoveToServer = (gameData) => {
    this.props.sockets.gameSocket.update(gameData)
  }

  userAllowed(currentGame) {
    let whitePlayerId = currentGame.attributes.whitePlayer.id
    let blackPlayerId = currentGame.attributes.blackPlayer.id
    let userId = this.props.user.id

    if (userId && ([whitePlayerId, blackPlayerId].includes(userId) ||
      currentGame.attributes.gameType === 'machine vs machine')) {
        return true
    }
  }

  renderBoard = () => {
    let {game} = this.props
    let gamePieces = mapPiecesToBoard(game.previousSetup, game)
    let userId = this.props.user.id
    let blackPlayerId = this.props.game.attributes.blackPlayer.id

    return rows(userId, blackPlayerId).map((row, rowIndex) => {
      let eachRow = columns(userId, blackPlayerId).map((column, columnIndex) => {
        return (
          <Square key={`square${rowIndex + columnIndex + 1}`}
            id={column + row}
            value={rowIndex + columnIndex + 1}
            piece={gamePieces[column + row]}
            sendMoveToServer={this.sendMoveToServer}
            isLastMove={isLastMove(column + row, this.props.game.attributes.moves)}
          />
        )
      })
      return <div key={`row${rowIndex}`} className='row justify-content-center'>{eachRow}</div>
    })
  }

  handleCancelPreviousSetup = () => {
    if (this.props.game.previousSetup) {
      this.props.dispatch(updateGamePayload({previousSetup: null}))
    }
  }

  render() {
    return(
      <div onClick={this.handleCancelPreviousSetup}
        className="board col-lg-6 col-md-12">
        {this.renderBoard()}
        <AnalyticsLineChart lineChartData={this.props.analytics.lineChartData} />
      </div>
    )
  }
}

const mapStateToProps = ({routing, game, modals, user, activeGames, sockets, analytics}) => {
  return {routing, game, modals, user, activeGames, sockets, analytics}
}

export default connect(mapStateToProps)(Board)
