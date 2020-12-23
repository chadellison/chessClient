import React, { Component } from 'react'
import '../styles/chat.css'
import { connect } from 'react-redux'
// import { WEBSOCKET_HOST } from '../config/endpoints.js'
import socketWrapper from '../socketWrapper'
// import Cable from 'actioncable'
import {clearChatAction, addChatAction, updateChatFieldAction, clearAllChatsAction} from '../actions/chatActions'
// import {createChatSocketAction} from '../actions/socketActions'

class Chat extends Component {
  componentDidMount() {
    socketWrapper.createChatSocket(
      this.props.game.id,
      this.props.chat.channel,
      (chatData) => this.props.addChatAction(chatData)
    );
  }

  componentDidUpdate(oldProps) {
    if (oldProps.game.id !== this.props.game.id) {
      console.log('Unsubscribed from game chat')
      socketWrapper.chatSocket.unsubscribe()
      this.props.clearAllChatsAction()
      socketWrapper.createChatSocket(
        this.props.game.id,
        this.props.chat.channel,
        (chatData) => this.props.addChatAction(chatData)
      );
    }
  }

  // createChatSocket() {
  //   let cable = Cable.createConsumer(WEBSOCKET_HOST)
  //   let gameId = this.props.game.id
  //   let chatSocket = cable.subscriptions.create({ channel: this.props.chat.channel, game_id: gameId },
  //   {
  //     connected: () => {},
  //     received: (data) => this.props.dispatch(addChatAction(data)),
  //     create: function(chatContent) {
  //       this.perform('create', {
  //         content: chatContent,
  //         game_id: gameId
  //       })
  //     }
  //   })
  //   this.props.dispatch(createChatSocketAction(chatSocket))
  // }

  handleSendEvent = (e) => {
    e.preventDefault()

    if (this.props.chat.currentChatMessage) {
      let message = this.sender() + this.props.chat.currentChatMessage
      socketWrapper.chatSocket.create(message)
      this.props.clearChatAction('')
    }
  }

  // updateCurrentChatMessage = (e) => {
  //   this.props.updateChatFieldAction(e.target.value)
  // }

  sender() {
    if (this.props.user.id) {
      return `${this.props.user.firstName} ${this.props.user.lastName}: `
    } else {
      return ''
    }
  }

  renderChatLog = () => {
    return this.props.chat.chatLogs.map((message, index) => {
      return (
        <div key={`chat-${index}`} className='chat'>
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
            onChange={ (e) => this.props.updateChatFieldAction(e.target.value) }
            type='text'
            placeholder=''
            className='chat-input' />
          <input type='submit' className='submitButton'/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({chat, game, user}) => {
  return {chat, game, user}
}

const mapDispatchToProps = {
  clearChatAction,
  addChatAction,
  updateChatFieldAction,
  clearAllChatsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
