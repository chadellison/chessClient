import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/activeGames.css'
import Thumbnail from './Thumbnail'
import { Thumbnails } from './Thumbnails'
import { WEBSOCKET_HOST } from '../config/endpoints.js'
import Cable from 'actioncable'
import { updateActiveGamesAction, fetchAllGamesAction } from '../actions/activeGamesActions'
import { updateChatChannelAction } from '../actions/chatActions'
import { createAllGamesSocketAction } from '../actions/socketActions'

class AllActiveGames extends Component {
  componentDidMount() {
    this.props.dispatch(updateChatChannelAction('GroupChatChannel'))
    let allGamesSocket = this.createAllGamesSocket()
    this.props.dispatch(createAllGamesSocketAction(allGamesSocket))
    this.props.dispatch(fetchAllGamesAction())
  }

  componentWillUnmount() {
    this.props.sockets.allGamesSocket.unsubscribe()
  }

  createAllGamesSocket() {
    let cable = Cable.createConsumer(WEBSOCKET_HOST)
    let allGamesSocket = cable.subscriptions.create({ channel: 'AllGamesChannel'},
    {
      connected: () => {},
      received: (gameData) => {
        this.props.dispatch(updateActiveGamesAction(gameData))
      },
    })
    return allGamesSocket;
  }

  renderActiveGames = () => {
    return this.props.activeGames.map((game, index) => {
      return (
        <Thumbnail key={`thumbnail${index}`} thumbnailGame={game} />
      )
    })
  }

  render() {
    return <Thumbnails thumbnails={this.renderActiveGames()}/>
  }
}

const mapStateToProps = ({activeGames, sockets}) => {
  return {activeGames, sockets}
}

export default connect(mapStateToProps)(AllActiveGames)
