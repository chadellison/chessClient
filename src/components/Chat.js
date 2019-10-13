import React, { Component } from 'react'
import '../styles/chat.css'
import { connect } from 'react-redux'
import { WEBSOCKET_HOST } from '../config/endpoints.js'
import Cable from 'actioncable'
import {clearChatAction, addChatAction, updateChatFieldAction, clearAllChatsAction} from '../actions/chatActions'
import {createChatSocketAction} from '../actions/socketActions'

class Chat extends Component {
  componentDidMount() {
    this.createChatSocket()
  }

  componentDidUpdate(oldProps) {
    if (oldProps.game.id !== this.props.game.id) {
      console.log('Unsubscribed from game chat')
      oldProps.sockets.chatSocket.unsubscribe()
      this.props.dispatch(clearAllChatsAction())
      this.createChatSocket()
    }
  }

  createChatSocket() {
    let cable = Cable.createConsumer(WEBSOCKET_HOST)
    let gameId = this.props.game.id
    let chatSocket = cable.subscriptions.create({ channel: this.props.chat.channel, game_id: gameId },
    {
      connected: () => {},
      received: (data) => this.props.dispatch(addChatAction(data)),
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent,
          game_id: gameId
        })
      }
    })
    this.props.dispatch(createChatSocketAction(chatSocket))
  }

  handleSendEvent = (e) => {
    e.preventDefault()

    if (this.props.chat.currentChatMessage) {
      let message = this.sender() + this.props.chat.currentChatMessage
      this.props.sockets.chatSocket.create(message)
      this.props.dispatch(clearChatAction(''))
    }
  }

  updateCurrentChatMessage = (e) => {
    this.props.dispatch(updateChatFieldAction(e.target.value))
  }

  sender() {
    if (this.props.user.id) {
      return `${this.props.user.firstName} ${this.props.user.lastName}: `
    } else {
      return ''
    }
  }

  renderChatLog = () => {
    return this.props.chat.chatLogs.map((message) => {
      return (
        <div key={`chat_${message.id}`} className='chat'>
          <span className='chat-message'>{message.content}</span>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='chatroom'>
        <h3 className='chatTitle'>Message</h3>
        <div className='chats'>
          { this.renderChatLog() }
        </div>
        <form className='inputForm' onSubmit={(e) => this.handleSendEvent(e)}>
          <input
            value={ this.props.chat.currentChatMessage }
            onChange={ (e) => this.updateCurrentChatMessage(e) }
            type='text'
            placeholder=''
            className='chat-input' />
          <input type='submit' className='submitButton'/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({chat, sockets, game, user}) => {
  return {chat, sockets, game, user}
}

export default connect(mapStateToProps)(Chat)
