import React, { Component } from 'react'
import '../styles/board.css'
import { connect } from 'react-redux'
import Square from './Square'
import { push } from 'react-router-redux'
import { updateGameAction } from '../actions/gameActions'
import { updateChatChannelAction } from '../actions/chatActions'
// import { createGameSocketAction } from '../actions/socketActions'
import { handleModalAction } from '../actions/modalActions'
import { updateSelectedMoveAction } from '../actions/moveLogActions'
import { updateBoardAction } from '../actions/boardActions'
import { rows, columns } from '../helpers/boardLogic'
// import { WEBSOCKET_HOST } from '../config/endpoints.js'
import moveAudio from '../audio/moveAudio.wav'
import { mapPiecesToBoard, isLastMove } from '../helpers/boardLogic'
import socketWrapper from '../socketWrapper'
import { BOARD } from '../constants/board'
// import Cable from 'actioncable'

class Board extends Component {
  constructor() {
    super()
    this.moveAudio = new Audio(moveAudio)
  }

  componentDidMount() {
    // let gameId = parseInt(this.props.routing.location.pathname.split('/')[2], 10)
    // if gameId --> join current game
    // else
    socketWrapper.createGameSocket(
      this.props.game.id,
      (gameData) => this.handleGameDataResponse(gameData)
    )
    this.props.updateBoardAction(BOARD);
    // this.createGameSocket(this.props.game.id)
    // let currentGame = this.props.activeGames.filter((game) => game.id === gameId)[0]
    // if (gameId && (!currentGame || !this.userAllowed(currentGame))) {
    //   this.props.dispatch(push('/'))
    // }
    //
    // if (currentGame) {
    //   this.createGameSocket();
    //   this.props.dispatch(updateGamePayload(currentGame));
    //   this.props.dispatch(updateChatChannelAction('ChatChannel'));
    //   this.props.dispatch(this.props.dispatch(updateSelectedMoveAction(currentGame.attributes.moves.length)))
    // }
  }

  // componentDidUpdate(oldProps) {
  //   if (oldProps.game.id !== this.props.game.id) {
  //     this.createGameSocket(this.props.game.id)
  //   }
  // }

  componentWillUnmount() {
    if (socketWrapper.gameSocket, (gameData) => this.handleGameDataResponse(gameData)) {
      console.log('Unsubscribed from game ' + this.props.game.id)
      socketWrapper.gameSocket.unsubscribe()
    }
  }

  // createGameSocket = (gameId) => {
  //   let cable = Cable.createConsumer(WEBSOCKET_HOST)
  //
  //   let gameSocket = cable.subscriptions.create(
  //     { channel: 'GameChannel', game_id: gameId },
  //     { connected: () => {},
  //       received: this.handleGameDataResponse,
  //       update: function(gameData) {
  //         this.perform('update', gameData)
  //       }
  //     }
  //   )
  //   this.props.createGameSocketAction(gameSocket)
  // }

  handleGameDataResponse = (gameData) => {
    this.props.updateBoardAction(gameData.board);
    this.props.updateGameAction({...this.props.game, notation: gameData.notation});
    this.moveAudio.play()
  }

  // sendMoveToServer = (gameData) => {
  //   this.props.sockets.gameSocket.update(gameData)
  // }

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
    // let {game} = this.props
    // let gamePieces = mapPiecesToBoard(game.previousSetup, game)
    const userId = this.props.user.id
    const blackPlayerId = null;
    // const blackPlayerId = this.props.game.attributes.blackPlayer.id
    const { board } = this.props;
    let squareCount = 0

    return rows(userId, blackPlayerId).map((row, rowIndex) => {
      let eachRow = columns(userId, blackPlayerId).map((column, columnIndex) => {
        squareCount += 1
        return (
          <Square key={`square${rowIndex + columnIndex + 1}`}
            id={column + row}
            value={rowIndex + columnIndex + 1}
            color={(rowIndex + columnIndex + 1) % 2 === 0 ? '#8b4513' : '#cd853f'}
            piece={board[squareCount]}
            sendMoveToServer={(gameData) => socketWrapper.gameSocket.update(gameData)}
            isLastMove={false}
          />
        )
      })
      return <div key={`row${rowIndex}`} className='row justify-content-center'>{eachRow}</div>
    })
  }

  // handleCancelPreviousSetup = () => {
  //   if (this.props.game.previousSetup) {
  //     this.props.updateGamePayload({previousSetup: null});
  //     this.props.updateSelectedMoveAction(this.props.game.attributes.moves.length);
  //   }
  // }

  render() {
    return(
      <div onClick={this.handleCancelPreviousSetup}
        className="board col-lg-6 col-md-12">
        {this.renderBoard()}
      </div>
    )
  }
}

const mapStateToProps = ({routing, game, modals, user, activeGames, board}) => {
  return {routing, game, modals, user, activeGames, board}
}

const mapDispatchToProps = {
  updateBoardAction,
  updateGameAction,
  updateSelectedMoveAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
